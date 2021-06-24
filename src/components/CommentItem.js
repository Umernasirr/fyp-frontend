import React, {useState} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Color from '../constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {service} from '../services/service';

const CommentItem = ({
  id,
  text,
  name,
  liked,
  likes,
  createdAt,
  vibeId,
  setvibeComments,
}) => {
  // const onHeartClick = () => {
  //   setIsLiked(!isLiked);
  // };
  const onCommentDelete = () => {
    service
      .deleteComment(vibeId, id)
      .then((data) => {
        setvibeComments(data.data.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.commentContainer}>
      <Image
        style={styles.imgUser}
        source={{
          uri:
            'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
        }}
      />

      <View style={styles.textContainer}>
        <View>
          <Text>{text}</Text>
          <Text style={styles.userName}>
            {name} - {createdAt.slice(0, 10)}
          </Text>
        </View>
        <TouchableOpacity onPress={onCommentDelete}>
          <AntDesign name="delete" color={Color.primary} size={24} />
          <Text> {likes}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 10,
    borderTopColor: Color.light,
    borderBottomColor: Color.light,
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imgUser: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 12,
    color: Color.purple,
  },
});
