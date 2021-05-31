import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Portal, Modal} from 'react-native-paper';
import {COMMENTS} from '../constants';
import Color from '../constants/Color';
import CommentItem from './CommentItem';
const CommentModal = ({visible, setVisible}) => {
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
        style={styles.modal}>
        <Text>Comments: </Text>

        <View>
          <FlatList
            style={styles.userList}
            ItemSeparatorComponent={
              Platform.OS !== 'android' &&
              (({highlighted}) => (
                <View
                  style={[styles.separator, highlighted && {marginLeft: 0}]}
                />
              ))
            }
            data={COMMENTS}
            renderItem={({item}) => {
              console.log(item);

              return (
                <CommentItem
                  id={item.id}
                  text={item.text}
                  user={item.user}
                  liked={item.liked}
                  likes={item.likes}
                  createdAt={item.createdAt}
                />
              );
            }}
          />
        </View>
      </Modal>
    </Portal>
  );
};

export default CommentModal;

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
});
