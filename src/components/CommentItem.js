import React, {useState} from 'react';
import {StyleSheet, Image, View, Text, TouchableOpacity} from 'react-native';
import Color from '../constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useLinkBuilder} from '@react-navigation/native';

const CommentItem = ({id, text, user, liked, likes, createdAt}) => {
  const [isLiked, setIsLiked] = useState(liked);
  const onHeartClick = () => {
    setIsLiked(!isLiked);
  };
  return (
    <View style={styles.commentContainer}>
      <Image
        style={styles.imgUser}
        source={{uri: 'https://via.placeholder.com/150'}}
      />

      <View style={styles.textContainer}>
        <View>
          <Text>{text}</Text>
          <Text style={styles.userName}>
            {user.name} - {createdAt}
          </Text>
        </View>
        <TouchableOpacity style={styles.likeContainer} onPress={onHeartClick}>
          <AntDesign
            name={isLiked ? 'heart' : 'hearto'}
            color={Color.primary}
            size={24}
          />
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
  },
  likeContainer: {alignItems: 'center'},
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
