import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import Color from '../constants/Color';
import {connect, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import TrackPlayer from 'react-native-track-player';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommentModal from './CommentModal';
import {service} from '../services/service';
import {updateLikesUnlikes} from '../store/actions/Vibe';
import Slider from 'react-native-slider';
import {useNavigation} from '@react-navigation/native';
const PostItem = ({
  caption,
  createdAt,
  user,
  vibeId,
  likes,
  updateLikesUnlikes,
  comments,
  format,
  url,
  deleteVibe,
  avatar,
}) => {
  const navigation = useNavigation();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [comment, setComment] = useState('');
  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const {position, duration} = useTrackPlayerProgress(250);
  const [sliderValue, setSliderValue] = useState(0);
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const currUser = useSelector((state) => state.auth.user);

  const onButtonPressed = () => {
    console.log("url is", url)
    startPlayer(url)
    if (!isPlaying) {
      TrackPlayer.play();
      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  const startPlayer = async (url) => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    const tempUrl =
      url !== ''
        ? url
        : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

    await TrackPlayer.add({
      id: '1',
      url: tempUrl,
      type: 'default',

      artist: createdAt,
    });

    await TrackPlayer.play();
  };

  const slidingStarted = () => {
    setIsSeeking(true);
  };
  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(0);
    setSliderValue(value);
    setIsSeeking(false);
  };

  useEffect(() => {
    let tempLikeCount = 0;
    let tempCommentCount = 0;
    if (likes) {
      likes.map((like) => {
        tempLikeCount += 1;
      
        if (like.user.toString() === currUser._id.toString()) {
          setLiked(true);
        }
      });
    }

    if (comments) {
      comments.forEach((comment) => (tempCommentCount += 1));
    }

    setLikesCount(tempLikeCount);
    setCommentCount(tempCommentCount);
  }, []);

  const handleKeyDown = (e) => {
    Keyboard.dismiss();
    setComment('');
  };

  const handleChangeCommentCount = (value) => {
    setCommentCount(commentCount + value);
  };

  const updateLikes = () => {
    service
      .likeUnlike(vibeId)
      .then((data) => {
        if (data.data.success) {
          setLiked(!liked);
          updateLikesUnlikes({vibeId, likes: data.data.data});
        }
        if (!liked) {
          setLikesCount(likesCount + 1);
        } else {
          setLikesCount(likesCount - 1);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.topContainer}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('UserList', {
                screen: 'UserDetails',
                params: {user},
              })
            }
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={styles.imgUser}
              source={{
                uri: avatar ? avatar : 'https://via.placeholder.com/150',
              }}
            />
            <Text style={styles.title}>{user.name} </Text>
          </TouchableOpacity>
          {currUser._id === user._id && (
            <TouchableOpacity onPress={() => deleteVibe(vibeId)}>
              <AntDesign name="delete" color={Color.whiteColor} size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.caption}>{caption}</Text>

      {format === 'jpeg' ||
        format === 'jpg' ||
        (format === 'png' && (
          <Image
            style={styles.img}
            source={{
              // FIX ME
              uri: avatar
            }}
          />
        ))}

      {format === 'mp3' && (
        <View style={styles.musicPlayer}>
          <View style={styles.audioContainer}>
            <FontAwesome
              onPress={onButtonPressed}
              style={styles.fontAudio}
              name={isPlaying ? 'pause' : 'play'}
              color="white"
              size={20}
            />
            <Slider
              style={{width: '90%', height: 20}}
              minimumValue={0}
              maximumValue={1}
              value={sliderValue}
              minimumTrackTintColor="#A159E9"
              maximumTrackTintColor="gray"
              onSlidingStart={slidingStarted}
              onSlidingComplete={slidingCompleted}
              thumbTintColor="white"
            />
          </View>
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.icon} onPress={updateLikes}>
          <AntDesign
            name={liked ? 'like2' : 'like2'}
            color={liked ? Color.primary : Color.whiteColor}
            size={24}
          />
          <Text style={styles.iconTxt}>{likesCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowCommentModal(true)}>
          <AntDesign name="message1" color={Color.whiteColor} size={24} />
          <Text style={styles.iconTxt}>{commentCount}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => setFavourited(!favourited)}>
          <AntDesign
            name={favourited ? 'heart' : 'hearto'}
            color={favourited ? Color.primary : Color.whiteColor}
            size={24}
          />
          <Text style={styles.iconTxt}>Favourite</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => setShowCommentModal(true)}
        style={styles.commentRow}>
        <TextInput
          placeholder="Add a Comment"
          style={styles.input}
          editable={false}
        />
      </TouchableOpacity>

      <CommentModal
        visible={showCommentModal}
        setVisible={setShowCommentModal}
        comments={comments}
        vibeId={vibeId}
        handleChangeCommentCount={handleChangeCommentCount}
      />
    </View>
  );
};

export default connect(null, {updateLikesUnlikes})(PostItem);

const styles = StyleSheet.create({
  container: {
    margin: 10,
    borderRadius: 24,
    padding: 24,
    backgroundColor: Color.dark,
    borderWidth: 1,
    borderColor: Color.whiteColor,
  },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 6,
  },

  caption: {color: 'white', margin: 5, marginTop: 10},
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgUser: {width: 40, height: 40, borderRadius: 20},
  img: {
    width: '95%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderColor: Color.primary,
    borderWidth: 2,
  },
  topContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  icon: {
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  iconTxt: {
    fontSize: 10,
    paddingVertical: 10,
    color: Color.whiteColor,
  },

  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },

  input: {
    backgroundColor: Color.whiteColor,
    padding: 10,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
  },
  txtSubmit: {
    color: Color.whiteColor,
    fontSize: 12,
  },
  submit: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  musicPlayer: {
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  audioContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    // flex: 0.45,
    marginVertical: 10,
    borderColor: Color.primary,
    borderWidth: 2,
    borderRadius: 10,
  },

  fontAudio: {
    display: 'flex',
    flexDirection: 'column',
    textAlignVertical: 'center',
    color: Color.whiteColor,
    marginHorizontal: 10,
  },
});
