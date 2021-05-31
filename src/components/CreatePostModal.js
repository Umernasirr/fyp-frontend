import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  Portal,
  Modal,
  TextInput,
  Button,
  Menu,
  Divider,
} from 'react-native-paper';
import Color from '../constants/Color';
import {launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';

const CreatePostModal = ({visible, setVisible}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [songSelected, setSongSelected] = useState('');
  const [title, setTitle] = useState('');

  const [caption, setCaption] = useState('');

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const hideModal = () => setVisible(false);

  const handleImagePicker = () => {
    launchImageLibrary({}, (data) => {
      console.log(data);

      setImage(data.assets[0].uri);
    });
  };

  const handleCreatePost = () => {};

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
        style={styles.modal}>
        <Text style={styles.heading}>Create Post: </Text>

        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          label="Title"
          placeholder="Enter a Title"
          mode="outlined"
        />

        <TextInput
          value={caption}
          onChangeText={(text) => setCaption(text)}
          label="Caption"
          placeholde="Describe your Post"
          mode="outlined"
        />

        {image && <Image source={{uri: image}} style={styles.img} />}

        <Button
          style={styles.button}
          color={Color.primary}
          onPress={handleImagePicker}>
          Choose an Image
        </Button>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={<Button onPress={openMenu}>Show menu</Button>}>
            <Menu.Item
              onPress={() => {
                setSongSelected('Item 1');
                setMenuVisible(false);
              }}
              title="Item 1"
            />
            <Divider />
            <Menu.Item
              onPress={() => {
                setSongSelected('Item 2');
                setMenuVisible(false);
              }}
              title="Item 2"
            />
          </Menu>
        </View>

        {songSelected !== '' && (
          <View style={styles.songContainer}>
            <Feather name="music" size={24} color={Color.primary} />
            <Text style={styles.songTxt}>{songSelected}</Text>
          </View>
        )}

        <Button
          mode="contained"
          style={styles.button}
          onPress={handleCreatePost}>
          Create Post
        </Button>
      </Modal>
    </Portal>
  );
};

export default CreatePostModal;

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: Color.whiteColor,
    justifyContent: 'flex-start',
    padding: 20,
  },
  songContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: Color.light,
    borderWidth: 2,
    borderRadius: 5,
  },
  modal: {
    position: 'absolute',
    top: 200,
  },
  heading: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },

  img: {
    width: 40,
    height: 40,
  },
  button: {
    margin: 20,
  },

  songTxt: {
    marginHorizontal: 10,
  },
});
