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
        console.log(data.data.users);
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
          <ScrollView showsVerticalScrollIndicator={false}>
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
              {userList && userList.length > 0 ? (
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
                  data={userList}
                  renderItem={({item}) => {
                    console.log(item);

                    return (
                      <UserItem
                        name={item.name}
                        createdAt={item.createdAt.slice(0, 10)}
                        gender={item.gender}
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
    marginHorizontal: '2%',
  },
});
