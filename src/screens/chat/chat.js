import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat, Send} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
import {IconButton} from 'react-native-paper';

import Color from '../../constants/Color';
const Chat = ({route}) => {
  const [messages, setMessages] = useState([]);
  const user = useSelector((state) => state.auth.user);

  const thread = route.params.thread;

  async function handleSend(messages) {
    const text = messages[0].text;

    firestore()
      .collection('threads')
      .doc(thread._id)
      .collection('messages')
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: user._id,
          email: user.email,
          name: user.name,
        },
      });

    await firestore()
      .collection('THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime(),
          },
        },
        {merge: true},
      );
  }

  useEffect(() => {
    const messagesListener = firestore()
      .collection('threads')
      .doc(thread._id)
      .collection('messages')
      .orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const messages = querySnapshot.docs.map((doc) => {
          const firebaseData = doc.data();

          const data = {
            _id: doc.id,
            text: '',
            createdAt: new Date().getTime(),
            ...firebaseData,
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email,
            };
          }

          return data;
        });

        setMessages(messages);
      });

    return () => messagesListener();
  }, []);

  return (
    <View style={styles.container}>
      <Header title={thread.name} />
      <GiftedChat
        renderUsernameOnMessage
        showUserAvatar
        alwaysShowSend
        scrollToBottom
        renderSend={renderSend}
        scrollToBottomComponent={scrollToBottomComponent}
        renderLoading={renderLoading}
        messages={messages}
        onSend={handleSend}
        user={{
          _id: user._id,
          name: user.name,
        }}
      />
    </View>
  );
};

const Header = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTxt}>{title}</Text>
    </View>
  );
};

const renderSend = (props) => {
  return (
    <Send {...props}>
      <View style={styles.sendingContainer}>
        <IconButton icon="send-circle" size={32} color={Color.primary} />
      </View>
    </Send>
  );
};

const scrollToBottomComponent = () => {
  return (
    <View style={styles.bottomComponentContainer}>
      <IconButton icon="chevron-double-down" size={36} color={Color.primary} />
    </View>
  );
};

const renderLoading = () => {
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={Color.primary} />
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: Color.light,
    opacity: 0.7,
    elevation: 2,
  },
  headerTxt: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Color.dark,
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
