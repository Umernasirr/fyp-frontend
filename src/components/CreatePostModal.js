import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {Portal, Modal, TextInput, Button} from 'react-native-paper';
import Color from '../constants/Color';
import {launchImageLibrary} from 'react-native-image-picker';
import {connect} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import Feather from 'react-native-vector-icons/Feather';

import {service} from '../services/service';
import {createVibe} from '../store/actions/Vibe';
import {useNavigation} from '@react-navigation/native';
const CreatePostModal = ({visible, setVisible, createVibe}) => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [image, setImage] = useState({});
  const [imageSelected, setImageSelected] = useState(false);
  const [songSelected, setSongSelected] = useState('');
  const [mediaSelected, setMediaSelected] = useState(null);
  const [caption, setCaption] = useState('');

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);

  const hideModal = () => setVisible(false);

  const handleImagePicker = () => {
    launchImageLibrary({}, (data) => {
      setImage(data.assets[0]);
    });
  };

  const handleDocumentPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.audio, DocumentPicker.types.images],
      });

      setMediaSelected(res);
      setSongSelected(res.name);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };

  const handleCreatePost = () => {
    let mediaData = {uri: mediaSelected ? mediaSelected.uri : ''};
    const formdata = new FormData();
    formdata.append('caption', caption);

    if (mediaSelected) {
      formdata.append('media', {
        uri: mediaData.uri,
        name: mediaSelected.name,
        type: mediaSelected.type,
      });
    }

    service
      .createVibe(formdata)
      .then((data) => {
        console.log(data.data);
        if (data.data.success) {
          createVibe(data.data.data);
          hideModal();
          navigation.navigate('Feed');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
        style={styles.modal}>
        <Text style={styles.heading}>Create Post: </Text>

        <TextInput
          value={caption}
          onChangeText={(text) => setCaption(text)}
          label="Caption"
          placeholde="Describe your Post"
          mode="outlined"
        />
        {image && (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image source={{uri: image.uri}} style={styles.img} />
            <Text>{image.fileName.slice(0, 30)} </Text>
          </View>
        )}
        <View style={{marginTop: 20}} />
        <Button
          style={styles.button}
          color={Color.primary}
          onPress={handleImagePicker}>
          Choose an Image
        </Button>

        <Button style={styles.button}>Or</Button>
        <Button
          disabled={image ? true : false}
          style={styles.button}
          color={Color.primary}
          onPress={handleDocumentPicker}>
          Pick a Song
        </Button>
        {/* <View
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
      */}
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

export default connect(null, {createVibe})(CreatePostModal);

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
    top: 100,
  },
  heading: {
    fontSize: 20,
    marginVertical: 10,
    textAlign: 'center',
  },

  img: {
    flex: 1,
    width: 100,
    margin: 10,
  },
  button: {
    padding: 10,
    margin: 10,
  },

  songTxt: {
    marginHorizontal: 10,
    color: Color.dark,
  },
});
