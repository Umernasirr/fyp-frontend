import React, {useState, useEffect, useCallback} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {GiftedChat} from 'react-native-gifted-chat';
import {useSelector} from 'react-redux';
const chat = () => {
  const [messages, setMessages] = useState([]);
  const chatsRef = firestore().collection('chats');

  const user = useSelector((state) => state.auth.user);

  console.log(user);
  const appendMessages = useCallback(
    (msgs) => {
      if (msgs.length > 0) {
        console.log(msgs);
        console.log('----');
        setMessages((previousMessages) => {
          return GiftedChat.append(previousMessages, msgs[0]);
        });
      }
    },
    [messages],
  );

  const handleAddMessage = async (messages = []) => {
    const writes = messages.map((m) => chatsRef.add(m));
    await Promise.all(writes);
  };

  useEffect(() => {
    const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
      const firestoreMessages = querySnapshot
        .docChanges()
        .filter(({type}) => type === 'added')
        .map(({doc}) => {
          const msg = {...doc.data()};
          return {...msg, createdAt: msg.createdAt.toDate()};
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(firestoreMessages);
    });

    return () => unsubscribe();
  }, []);

  return (
    <GiftedChat
      renderUsernameOnMessage={true}
      messages={messages}
      onSend={(messages) => {
        handleAddMessage(messages);
      }}
      user={{
        _id: user._id,
        name: user.name,
      }}
    />
  );
};

export default chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
