import React, {useState, useEffect} from 'react';
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
import {service} from '../../services/service';
import {ActivityIndicator} from 'react-native';
const Home = ({navigation, route}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [songList, setSongList] = useState([]);
  const [allSongs, setAllSongList] = useState([]);
  const [title, setTitle] = useState('');
  const onChangeSearch = (query) => {
    setSearchQuery(query);

    const tempSongs = allSongs.filter((song) => {
      return song.description
        .toLowerCase()
        .trim()
        .includes(query.toLowerCase().trim());
    });

    setSongList(tempSongs);
  };

  const getSongs = () => {
    service.getSongs().then((data) => {
      if (data.data.error) {
        alert(data.data.error);
      } else {
        setSongList(data.data.data);
        setAllSongList(data.data.data);
      }
    });
  };

  useEffect(() => {
    getSongs();

    // Return the function to unsubscribe from the event so it gets removed on unmount
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.marginContainer}>
              <Text style={styles.txtHeading}>{title}</Text>
              <Searchbar
                style={{borderRadius: 20}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
            </View>

            <View style={styles.songsContainer}>
              <Text style={styles.txtSubheading}>Latest Releases</Text>

              {songList && songList.length > 0 ? (
                <FlatList
                  style={styles.songsList}
                  ItemSeparatorComponent={
                    Platform.OS !== 'android' &&
                    (({highlighted}) => (
                      <View
                        style={[
                          styles.separator,
                          highlighted && {marginLeft: 0},
                        ]}
                      />
                    ))
                  }
                  data={songList}
                  renderItem={({item}) => {
                    const desc =
                      item.description && item.description.length > 20
                        ? item.description.slice(0, 20) + '...'
                        : item.description;

                    return (
                      <SongItem
                        description={item.description?.slice(0, 20)}
                        createdAt={item.createdAt?.slice(0, 10)}
                        url={item.url}
                      />
                    );
                  }}
                />
              ) : (
                <ActivityIndicator size={25} color="#FFF" />
              )}
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
