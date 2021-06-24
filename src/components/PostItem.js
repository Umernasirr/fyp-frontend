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
import {updateFavUnFav, updateLikesUnlikes} from '../store/actions/Vibe';
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
  resource_type,
  favorites,
  updateFavUnFav,
}) => {
  const navigation = useNavigation();
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [liked, setLiked] = useState(false);
  const [favourited, setFavourited] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const currUser = useSelector((state) => state.auth.user);

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
    if (favorites) {
      favorites.map((fav) => {
        // tempLikeCount += 1;
        if (fav.user) {
          if (fav.user.toString() === currUser._id.toString()) {
            setFavourited(true);
          }
        }
      });
    }

    if (comments) {
      comments.forEach((comment) => (tempCommentCount += 1));
    }

    setLikesCount(tempLikeCount);
    setCommentCount(tempCommentCount);
  }, []);

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

  const updateFavHandler = () => {
    service
      .favUnfav(vibeId)
      .then((data) => {
        if (data.data.success) {
          setFavourited(!favourited);
          updateFavUnFav({vibeId, favorites: data.data.data});
        }
      })
      .catch((err) => console.log(err));
  };

  // TrackPlayer.addEventListener('remote-duck', () => {
  //   TrackPlayer.destroy();
  // });

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
                uri: avatar
                  ? avatar
                  : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
              }}
            />
            <Text style={styles.title}>{user.name} </Text>
          </TouchableOpacity>
          {currUser && currUser._id === user && user._id && (
            <TouchableOpacity onPress={() => deleteVibe(vibeId)}>
              <AntDesign name="delete" color={Color.whiteColor} size={24} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Text style={styles.caption}>{caption}</Text>

      {resource_type === 'image' && (
        <Image
          style={styles.img}
          source={{
            // FIX ME
            uri: url,
          }}
        />
      )}

      {resource_type === 'video' && (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SongPlayer', {
              description: '',
              createdAt: '',
              url,
              caption,
              user,
            });
          }}
          style={styles.audioContainer}>
          <Text style={styles.fontTxt}>Listen to Vibe </Text>

          <AntDesign
            style={styles.fontAudio}
            name={'playcircleo'}
            color="white"
            size={30}
          />
        </TouchableOpacity>
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

        <TouchableOpacity style={styles.icon} onPress={updateFavHandler}>
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

export default connect(null, {updateLikesUnlikes, updateFavUnFav})(PostItem);

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
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 10,
    // flex: 0.45,
    borderWidth: 3,
    borderRadius: 20,
    borderColor: Color.primary,
    margin: 5,
    marginTop: 10,
  },

  fontAudio: {
    color: Color.whiteColor,
    marginHorizontal: 10,
    padding: 10,
  },

  fontTxt: {
    fontSize: 20,
    color: Color.whiteColor,
  },
});
