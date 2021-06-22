import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Text,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import {List, Button, Searchbar, Switch} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Color from '../../constants/Color';
import {useSelector} from 'react-redux';
import CreateChatModal from '../../components/CreateChatModal';
import LinearGradient from 'react-native-linear-gradient';

export default function Room({navigation}) {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [query, setQuery] = useState('');
  0;
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const user = useSelector((state) => state.auth.user);

  const handleButtonPress = () => {
    if (roomName.length > 0) {
      const newRoom = {
        name: roomName,
        private: false,
        support: false,
        createdBy: user._id,
        createdAt: firestore.FieldValue.serverTimestamp(),
      };
      firestore().collection('threads').add(newRoom);
    }
  };

  const handleQueryChange = (text) => {
    setQuery(text);

    const tempThreads = threads.filter((thread) =>
      thread.name.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredThreads(tempThreads);
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

        if (isSwitchOn) {
          const tempThreads = threads.filter(
            (thread) =>
              thread.private &&
              (thread.createdBy === user._id || thread.createdFor === user._id),
          );
          setFilteredThreads(tempThreads);
        } else {
          const tempThreads = threads.filter(
            (thread) => !thread.private && !thread.support,
          );
          setFilteredThreads(tempThreads);
        }

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, [loading, isSwitchOn]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <View style={styles.topContainer}>
            <Searchbar
              placeholder="Search"
              onChangeText={handleQueryChange}
              value={query}
              style={styles.topContainerInput}
            />
            <View style={styles.toggleBtn}>
              <Button
                color={Color.whiteColor}
                style={styles.btn}
                onPress={() => setShowCreateChatModal(true)}>
                Create a Private Chat
              </Button>

              <View style={styles.topRightContainer}>
                <Switch
                  color={Color.purple}
                  value={isSwitchOn}
                  onValueChange={onToggleSwitch}
                />
                <Text style={styles.txtPrivate}>Private Chats</Text>
              </View>
            </View>
          </View>

          {threads.length > 0 && (
            <View style={{height: '50%'}}>
              <FlatList
                data={filteredThreads}
                keyExtractor={(item) => item._id}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Chat', {thread: item})}>
                    <List.Item
                      title={item.name}
                      titleStyle={styles.listTitle}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View style={styles.chatBtn}>
            <View style={styles.containerBg}>
              <TextInput
                underlineColor={Color.primary}
                underlineColorAndroid={Color.primary}
                value={roomName}
                onChangeText={setRoomName}
                style={styles.inputText}
              />
              <Button
                color={Color.whiteColor}
                style={styles.btn}
                onPress={handleButtonPress}>
                Create Global Group
              </Button>
            </View>
          </View>

          {showCreateChatModal && (
            <CreateChatModal
              visible={showCreateChatModal}
              setVisible={setShowCreateChatModal}
              setIsSwitchOn={setIsSwitchOn}
            />
          )}
        </ImageBackground>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
  },

  Linear: {
    flex: 1,
    backgroundColor: 'red',
  },

  containerBg: {
    padding: 20,
    borderRadius: 10,
    margin: 10,
  },

  chatBtn: {
    justifyContent: 'center',
    marginVertical: 20,
  },
  noChatTxt: {
    marginVertical: 10,
    fontSize: 16,
  },
  btn: {
    borderRadius: 10,
    margin: 5,
  },

  listTitle: {
    padding: 20,
    backgroundColor: Color.whiteColor,
    fontSize: 18,
    borderRadius: 10,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainerInput: {
    marginTop: 40,
  },
  txtPrivate: {
    color: Color.dark,
    fontSize: 14,
  },
  toggleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  topRightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  inputText: {
    color: Color.whiteColor,
  },
});
