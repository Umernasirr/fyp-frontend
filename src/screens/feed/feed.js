import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {Button, Searchbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {POSTS} from '../../constants/';
import Color from '../../constants/Color';
import PostItem from '../../components/PostItem';
import CreatePostModal from '../../components/CreatePostModal';
const feed = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postsList, setPostsList] = useState([]);
  const [openPostModal, setOpenPostModal] = useState(false);
  const onChangeSearch = (query) => {
    setSearchQuery(query);

    //   const tempSongs = allSongs.filter((song) => {
    //     return song.description
    //       .toLowerCase()
    //       .trim()
    //       .includes(query.toLowerCase().trim());
    //   });

    //   setSongList(tempSongs);
  };

  useEffect(() => {
    setPostsList(POSTS);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          {postsList && postsList.length > 0 ? (
            <View style={styles.marginContainer}>
              <Searchbar
                style={{borderRadius: 20, marginVertical: 20}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
              <View style={styles.actionButtons}>
                <Button
                  mode="contained"
                  color={Color.whiteColor}
                  onPress={() => setOpenPostModal(true)}>
                  Create New Post
                </Button>
                <Button color={Color.whiteColor}>TODO Something</Button>
              </View>
              <FlatList
                style={styles.songsList}
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({highlighted}) => (
                    <View
                      style={[styles.separator, highlighted && {marginLeft: 0}]}
                    />
                  ))
                }
                keyExtractor={(item) => item.id.toString()}
                data={postsList}
                renderItem={({item}) => (
                  <PostItem
                    title={item.title}
                    caption={item.caption}
                    createdAt={item.createdAt}
                    user={item.user}
                  />
                )}
              />
            </View>
          ) : null}
        </ImageBackground>
      </LinearGradient>

      {openPostModal && (
        <CreatePostModal
          visible={openPostModal}
          setVisible={setOpenPostModal}
        />
      )}
    </View>
  );
};

export default feed;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 0.9,
  },
  Linear: {
    flex: 1,
  },
  marginContainer: {
    marginTop: 100,
    marginHorizontal: '2%',
  },
  heading: {
    fontSize: 30,
    color: Color.whiteColor,
    margin: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
});