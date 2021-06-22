import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Modal, Portal, Text, Button} from 'react-native-paper';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {FRIENDS} from '../constants';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import Color from '../constants/Color';
import {service} from '../services/service';

const CreateChatModal = ({visible, setVisible, setIsSwitchOn}) => {
  const navigation = useNavigation();
  const [selectedFriend, setSelectedFriend] = useState({});
  const [filteredFriends, setFilteredFriends] = useState([]);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    firestore()
      .collection('threads')
      .onSnapshot((querySnapshot) => {
        const threads = querySnapshot.docs.map((documentSnapshot) => {
          return {
            _id: documentSnapshot.id,
            // give defaults
            name: '',
            ...documentSnapshot.data(),
          };
        });

        const tempThreads = [];
        user.friends.forEach((friend) => {
          let alreadyExists = false;

          threads.forEach((thread) => {
            if (friend.name === thread.name) {
              alreadyExists = true;
            }
          });

          if (!alreadyExists) {
            tempThreads.push(friend);
          }
        });

        setFilteredFriends(tempThreads);
      });
  }, [navigation]);
  const handleBeginChat = () => {
    firestore()
      .collection('threads')
      .add({
        name: selectedFriend.name,
        private: true,
        createdBy: user._id,
        createdFor: selectedFriend._id,
        createdAt: firestore.FieldValue.serverTimestamp(),
        support: false,
      })
      .then(() => {
        setVisible(false);
        setIsSwitchOn(true);
      });
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={() => setVisible(false)}
        contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.heading}>Create a New Private Chat</Text>
          <SearchableDropdown
            selectedItems={selectedFriend}
            onItemSelect={(item) => {
              setSelectedFriend(item);
            }}
            containerStyle={{paddingVertical: 20}}
            onRemoveItem={(item, index) => {
              setSelectedFriend({});
            }}
            itemStyle={styles.dropdownItem}
            itemTextStyle={{color: '#222'}}
            itemsContainerStyle={{maxHeight: 120}}
            items={filteredFriends}
            resetValue={false}
            textInputProps={{
              placeholder: 'Select a Friend',
              underlineColorAndroid: 'transparent',
              style: {
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                borderRadius: 5,
              },
            }}
            listProps={{
              nestedScrollEnabled: true,
            }}
          />

          <Button
            mode="contained"
            disabled={filteredFriends.length > 0 ? false : true}
            color={Color.primary}
            style={styles.btn}
            onPress={handleBeginChat}>
            Begin Chat
          </Button>

          <Button
            style={styles.btn}
            color={Color.dark}
            onPress={() => setVisible(false)}>
            Cancel
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

export default CreateChatModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 0.88,
    borderRadius: 10,
    padding: 20,
    margin: 10,
  },
  heading: {
    marginTop: 10,
    fontSize: 26,
    letterSpacing: 1.2,
    fontWeight: 'bold',
  },

  dropdownItem: {
    padding: 10,
    marginTop: 2,
    backgroundColor: '#ddd',
    borderColor: '#bbb',
    borderWidth: 1,
    borderRadius: 5,
  },
  btn: {
    paddingVertical: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
});
