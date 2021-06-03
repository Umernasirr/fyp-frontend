import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  TextInput,
} from 'react-native';
import {List, Divider, Button} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Color from '../../constants/Color';

export default function HomeScreen({navigation}) {
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState('');

  const handleButtonPress = () => {
    if (roomName.length > 0) {
      firestore()
        .collection('threads')
        .add({
          name: roomName,
        })
        .then(() => {
          navigation.navigate('Room');
        });
    }
  };

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('threads')
      // .orderBy('latestMessage.createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data(),
          };
        });

        setThreads(threads);

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      {threads.length > 0 && (
        <FlatList
          data={threads}
          keyExtractor={(item) => item._id}
          ItemSeparatorComponent={() => <Divider />}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat', {thread: item})}>
              <List.Item
                style={styles.listItem}
                title={item.name}
                description="Item description"
                titleNumberOfLines={1}
                titleStyle={styles.listTitle}
                descriptionStyle={styles.listDescription}
                descriptionNumberOfLines={1}
              />
            </TouchableOpacity>
          )}
        />
      )}

      <View style={styles.chatBtn}>
        <View style={styles.containerBg}>
          <TextInput
            underlineColor={Color.primary}
            underlineColorAndroid={Color.primary}
            value={roomName}
            onChangeText={setRoomName}
          />
          <Button
            color={Color.purple}
            style={styles.btn}
            onPress={handleButtonPress}>
            Create a New Chat
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  containerBg: {
    backgroundColor: Color.whiteColor,
    padding: 20,
    borderColor: Color.primary,
    borderWidth: 2,
    borderRadius: 10,
  },

  chatBtn: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: '6%',
  },
  noChatTxt: {
    marginVertical: 10,
    fontSize: 16,
  },
  btn: {
    borderRadius: 10,
  },

  listDescription: {
    padding: 10,
    fontSize: 16,

    backgroundColor: Color.light,
  },
  listTitle: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: Color.light,
    fontSize: 22,
  },
});
