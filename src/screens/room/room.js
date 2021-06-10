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
  ScrollView,
} from 'react-native';
import {List, Button, Searchbar, Switch} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import Color from '../../constants/Color';
import {useSelector} from 'react-redux';
import CreateChatModal from '../../components/CreateChatModal';
import LinearGradient from 'react-native-linear-gradient';

export default function HomeScreen({navigation}) {
  const [threads, setThreads] = useState([]);
  const [filteredThreads, setFilteredThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [roomName, setRoomName] = useState('');
  const [query, setQuery] = useState('');
  const [showCreateChatModal, setShowCreateChatModal] = useState(false);
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

  const user = useSelector((state) => state.auth.user);

  const handleButtonPress = () => {
    if (roomName.length > 0) {
      firestore()
        .collection('threads')
        .add({
          name: roomName,
          private: false,
          createdBy: user,
        })
        .then(() => {
          navigation.navigate('Room');
        });
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

        // Check if user exists and
        // Check if Private Chat
        if (isSwitchOn) {
          const tempThreads = threads.filter(
            (thread) => thread.private && thread.createdBy._id === user._id,
          );
          setFilteredThreads(tempThreads);
        } else {
          const tempThreads = threads.filter((thread) => !thread.private);
          setFilteredThreads(tempThreads);
        }

        if (loading) {
          setLoading(false);
        }
      });

    /**
     * unsubscribe listener
     */
    return () => unsubscribe();
  }, [loading, isSwitchOn]);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
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
              <View style={{minHeight: '60%'}}>
                <FlatList
                  data={filteredThreads}
                  keyExtractor={(item) => item._id}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('Chat', {thread: item})
                      }>
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
                />
                <Button
                  color={Color.primary}
                  style={styles.btn}
                  onPress={handleButtonPress}>
                  Create a New Chat
                </Button>
              </View>
            </View>

            {showCreateChatModal && (
              <CreateChatModal
                visible={showCreateChatModal}
                setVisible={setShowCreateChatModal}
              />
            )}
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
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
    justifyContent: 'center',
  },

  Linear: {
    flex: 1,
    backgroundColor: 'red',
  },

  containerBg: {
    padding: 20,
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

  listTitle: {
    padding: 20,
    backgroundColor: Color.whiteColor,
    fontSize: 20,
    borderRadius: 10,
  },
  topContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainerInput: {
    margin: 10,
  },
  txtPrivate: {
    color: Color.dark,
    fontSize: 14,
  },
  toggleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topRightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    borderRadius: 10,
    paddingHorizontal: 20,
  },
});
