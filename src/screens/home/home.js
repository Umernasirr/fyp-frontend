import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Platform,
  FlatList,
} from 'react-native';
import {Searchbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import SongItem from '../../components/SongItem';
import {Songs} from '../../constants/index';
const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [songList, setSongList] = useState(Songs);
  const onChangeSearch = (query) => {
    setSearchQuery(query);

    const tempSongs = Songs.filter((song) => {
      return song.title
        .toLowerCase()
        .trim()
        .includes(query.toLowerCase().trim());
    });

    setSongList(tempSongs);
  };

  return (
    <View style={styles.container}>
      {/* {error !== '' && (
        <ErrorModal
          errorVisible={true}
          error={error}
          handleErrorClose={handleErrorClose}
        />
      )} */}

      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.marginContainer}>
              <Text style={styles.txtHeading}>Dashboard</Text>
              <Searchbar
                style={{borderRadius: 20}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
            </View>

            <View style={styles.songsContainer}>
              <Text style={styles.txtSubheading}>Latest Releases</Text>

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
                data={songList}
                renderItem={({item}) => (
                  <SongItem title={item.title} author={item.author} />
                )}
              />
            </View>

            {/*  */}
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default Home;

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

  txtHeading: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    marginVertical: 20,
  },

  txtSubheading: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    marginHorizontal: 30,
    fontWeight: '600',
  },
  marginContainer: {
    marginTop: 40,
    marginHorizontal: '10%',
  },
  songsContainer: {
    marginVertical: 10,
    marginHorizontal: '0%',
  },
});
