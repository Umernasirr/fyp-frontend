import React, {useState, useEffect} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Platform,
} from 'react-native';
import {Portal, Modal} from 'react-native-paper';
import Color from '../constants/Color';
import CommentItem from './CommentItem';
import {connect} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {service} from '../services/service';
import {addComment, deleteCommentHandler} from '../store/actions/Vibe';
const CommentModal = ({
  visible,
  setVisible,
  comments,
  vibeId,
  addComment,
  deleteCommentHandler,
  handleChangeCommentCount,
}) => {
  const [comment, setComment] = useState('');
  const [vibeComments, setvibeComments] = useState([]);

  useEffect(() => {
    setvibeComments(comments);
  }, [comments]);

  const handleKeyDown = (e) => {
    // TODO: HANDLE ADD COMMENT

    setComment('');
  };
  const deleteComment = (data) => {
    deleteCommentHandler({comments: data, vibeId: vibeId});
    setvibeComments(data);
    handleChangeCommentCount(-1);
  };

  const addCommentHandler = () => {
    if (comment && comment.length > 0) {
      service
        .addComment({text: comment}, vibeId)
        .then((data) => {
          addComment({postId: vibeId, comments: data.data.data});
          setvibeComments(data.data.data);
          setComment('');
          handleChangeCommentCount(1);
        })
        .catch((err) => console.log(err));
    } else {
      alert('please type in comment');
    }
  };

  const hideModal = () => setVisible(false);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
        style={styles.modal}>
        <Text>Comments: </Text>

        <View style={{maxHeight: '80%'}}>
          <FlatList
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[styles.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            keyExtractor={(item) => item._id.toString()}
            data={vibeComments}
            renderItem={({item}) => {
              return (
                <CommentItem
                  id={item._id}
                  text={item.text}
                  name={item.name}
                  liked={item.liked}
                  likes={item.likes}
                  createdAt={item.date}
                  vibeId={vibeId}
                  setvibeComments={deleteComment}
                />
              );
            }}
          />
        </View>
        <View style={styles.commentRow}>
          <TextInput
            placeholder="Add a Comment"
            style={styles.input}
            value={comment}
            onChangeText={setComment}
            onSubmitEditing={handleKeyDown}
          />
          <AntDesign
            onPress={addCommentHandler}
            name="message1"
            color={Color.primary}
            size={24}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default connect(null, {addComment, deleteCommentHandler})(CommentModal);

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    justifyContent: 'flex-start',
    padding: 20,
  },
  modal: {
    position: 'absolute',
    top: 200,
  },
  commentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
