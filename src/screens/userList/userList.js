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
import UserItem from '../../components/UserItem';
import {Songs} from '../../constants/index';
import {service} from '../../services/service';
import {ActivityIndicator} from 'react-native';
const Home = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [userList, setUserList] = useState([]);
  const [allUser, setAllUserList] = useState([]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);

    const tempUsers = allUser.filter((song) => {
      return (
        song.name &&
        song.name.toLowerCase().trim().includes(query.toLowerCase().trim())
      );
    });

    setUserList(tempUsers);
  };

  const getUsers = () => {
    service.getUsers().then((data) => {
      if (data.data.error) {
        alert(data.data.error);
      } else {
        setUserList(data.data.users);
        setAllUserList(data.data.users);
      }
    });
  };

  useEffect(() => {
    getUsers();
  }, []);

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
          {userList && userList.length > 0 ? (
            <View>
              <View style={styles.marginContainer}>
                <Text style={styles.txtHeading}>Meet New People</Text>
                <Searchbar
                  style={{borderRadius: 20}}
                  placeholder="Search"
                  onChangeText={onChangeSearch}
                  value={searchQuery}
                />
              </View>

              <View style={styles.songsContainer}>
                <FlatList
                  style={styles.userList}
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
                  keyExtractor={(item) => item._id.toString()}
                  data={userList}
                  renderItem={({item}) => (
                    <UserItem
                      name={item.name}
                      createdAt={item.createdAt.slice(0, 10)}
                      gender={item.gender}
                    />
                  )}
                />
              </View>
            </View>
          ) : (
            <ActivityIndicator size={25} color="#FFF" />
          )}
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
    textAlign: 'center',
  },

  txtSubheading: {
    color: 'white',
    fontSize: 20,
    marginTop: 20,
    marginHorizontal: 30,
    fontWeight: '600',
  },
  marginContainer: {
    marginTop: 120,
    marginHorizontal: '2%',
  },
  songsContainer: {
    marginVertical: 10,
    marginHorizontal: '2%',
  },
});
