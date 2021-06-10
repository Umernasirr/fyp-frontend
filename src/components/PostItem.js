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
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import CommentModal from './CommentModal';
import {service} from '../services/service';
import {updateLikesUnlikes} from '../store/actions/Vibe';

const PostItem = ({
  caption,
  createdAt,
  user,
  vibeId,
  likes,
  updateLikesUnlikes,
}) => {
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [liked, setLiked] = useState(null);
  const [favourited, setFavourited] = useState(false);
  const [comment, setComment] = useState('');

  useEffect(() => {
    console.log(likes, 'likes');
    // if(likes)
    if (likes) {
      likes.map((like) => {
        console.log(user._id, 'uses');
        if (like.user.toString() === user._id.toString()) {
          console.log('let see');
          setLiked(true);
        }
      });
    }
  }, []);

  const handleKeyDown = (e) => {
    Keyboard.dismiss();

    setComment('');
  };

  const updateLikes = () => {
    service
      .likeUnlike(vibeId)
      .then((data) => {
        if (data.data.success) {
          console.log(data.data);
          setLiked(!liked);
          updateLikesUnlikes({vibeId, likes: data.data.data});
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image
          style={styles.imgUser}
          source={{uri: 'https://via.placeholder.com/150'}}
        />
        <View style={styles.topContainer}>
          <Text style={styles.title}>{user.name} </Text>
          <Text style={styles.title}>Add Friend </Text>
        </View>
      </View>
      <Text style={styles.caption}>{caption}</Text>
      <Image
        style={styles.img}
        source={{uri: 'https://via.placeholder.com/300'}}
      />

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.icon} onPress={updateLikes}>
          <AntDesign
            name={liked ? 'like1' : 'like2'}
            color={liked ? Color.primary : Color.whiteColor}
            size={24}
          />
          <Text style={styles.iconTxt}>Like</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.icon}
          onPress={() => setShowCommentModal(true)}>
          <AntDesign name="message1" color={Color.whiteColor} size={24} />
          <Text style={styles.iconTxt}>Comments</Text>
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

      <View>
        <TextInput
          placeholder="Add a Comment"
          style={styles.input}
          value={comment}
          onChangeText={setComment}
          onSubmitEditing={handleKeyDown}
        />
      </View>

      <CommentModal
        visible={showCommentModal}
        setVisible={setShowCommentModal}
      />
    </View>
  );
};

export default connect(null, {updateLikesUnlikes})(PostItem);

const styles = StyleSheet.create({
  container: {
    height: 500,
    margin: 10,
    borderRadius: 24,
    padding: 24,
    backgroundColor: Color.dark,
  },
  title: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 5,
  },

  caption: {color: 'white', margin: 5, marginTop: 10},
  top: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgUser: {width: 40, height: 40, borderRadius: 20},
  img: {
    width: '90%',
    height: '45%',
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

  input: {
    backgroundColor: Color.whiteColor,
    padding: 10,
    borderRadius: 20,
  },
});
