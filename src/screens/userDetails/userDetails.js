import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import {service} from '../../services/service';
import {connect, useSelector} from 'react-redux';
import PostItem from '../../components/PostItem';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {updateUser} from '../../store/actions/Auth';

import {deleteVibes, getVibes} from '../../store/actions/Vibe';
import {Button} from 'react-native-paper';

const UserDetails = ({
  navigation,
  vibes,
  getVibes,
  deleteVibes,
  updateUser,
  route,
}) => {
  const [postsList, setPostsList] = useState([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const user = useSelector((state) => state.auth.user);
  const [postsCount, setPostsCount] = useState(0);
  const [isFriends, setisFriends] = useState(false);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const handleRefresh = () => {
    setIsRefreshing(true);
    handleUpdate();
    setIsRefreshing(false);
  };

  const deleteVibe = (id) => {
    service
      .deleteVibe(id)
      .then((data) => {
        deleteVibes({vibeId: id});
        setisDeleted(!isDeleted);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    if (route.params) {
      setName(route.params.user.name);
      setDesc(route.params.user.description);
      // setDesc(route.params.user.desc);
      service
        .getMe()
        .then((data) => {
          // updateUser()
          if (data.data.success) {
            updateUser(data.data.user);
          }
        })
        .catch((err) => console.log(err));
    }
    if (user && route.params && user.friends) {
      user.friends.map((friend) => {
        if (
          friend &&
          friend._id.toString() === route.params.user._id.toString()
        ) {
          setisFriends(true);
        }
      });
    }

    // Get Posts
    service
      .getVibes()
      .then((data) => {
        if (data.data.success) {
          getVibes(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err, 'err imp');
      });

    // Filtering vibes to be only user's
    const tempVibes = vibes.filter(
      (vibe) => vibe.user._id === route.params.user._id,
    );
    setPostsCount(tempVibes.length);
    setPostsList(tempVibes);
  };

  useEffect(() => {
    handleUpdate();
  }, [route]);
  const sendRequestHandler = () => {
    service
      .sendRequest({requestTo: route.params.user._id, requestBy: user._id})
      .then((data) => {
        if (data.data.error) {
          alert('Request is already sent to this user');
        } else {
          alert('request is sent successfully!');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.itemContainer}>
              <View style={styles.itemRow}>
                <View style={styles.itemCol}>
                  <Image
                    style={styles.imgUser}
                    source={{
                      uri:
                        user && user.avatar
                          ? user.avatar
                          : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
                    }}
                  />

                  <Text style={styles.txtUser}>{name}</Text>
                </View>

                <View style={styles.itemCol}>
                  <Text style={styles.txtNumber}>{postsCount}</Text>
                  <Text style={styles.txtNormal}>Posts</Text>
                </View>

                <View style={styles.itemCol}>
                  <Text style={styles.txtNumber}>
                    {(route.params &&
                      route.params.user &&
                      route.params.user.friends &&
                      route.params.user.friends.length) ||
                      1}
                  </Text>
                  <Text style={styles.txtNormal}>Friends</Text>
                </View>

                <View style={styles.itemCol}>
                  <Text style={styles.txtNumber}>
                    {user && user.favourites ? user.favourites.length : 0}
                  </Text>
                  <Text style={styles.txtNormal}>Favourites</Text>
                </View>
              </View>
              <View style={styles.itemRowBtm}>
                <Text style={{marginRight: 40}}>{desc}</Text>
                {user && user._id !== route.params.user._id && (
                  <TouchableOpacity
                    onPress={sendRequestHandler}
                    style={styles.itemRowBtmRight}>
                    <Ionicons
                      color={Color.primary}
                      name={
                        isFriends
                          ? 'person-remove-outline'
                          : 'add-circle-outline'
                      }
                      size={30}
                    />
                    <Text style={{fontSize: 12}}>
                      {isFriends ? 'Remove from friend' : 'Add Friend'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View style={styles.divider} />
            {postsList && postsList.length > 0 ? (
              <View>
                <FlatList
                  style={styles.songsList}
                  onRefresh={handleRefresh}
                  refreshing={isRefreshing}
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
                  data={postsList}
                  renderItem={({item}) => (
                    <PostItem
                      title={item.title}
                      caption={item.caption}
                      createdAt={item.createdAt}
                      user={item.user}
                      vibeId={item._id}
                      likes={item.likes}
                      comments={item.comments}
                      format={item.format}
                      avatar={item.user.avatar}
                      deleteVibe={deleteVibe}
                    />
                  )}
                />
              </View>
            ) : (
              <View style={styles.itemCol}>
                <Text style={styles.txtNoPosts}>No Posts By This User...</Text>
              </View>
            )}

            <View>
              <Button
                mode="contained"
                style={{margin: 10}}
                onPress={() => navigation.navigate('UserListMain')}
                color={Color.primary}>
                All Users
              </Button>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

const mapStateToProps = (state) => ({
  vibes: state.vibe.vibes,
  user: state.auth.user,
});

export default connect(mapStateToProps, {getVibes, deleteVibes, updateUser})(
  UserDetails,
);

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
  itemContainer: {
    marginTop: '10%',
    backgroundColor: Color.whiteColor,
    padding: 20,
    flexDirection: 'column',
  },
  itemRow: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },

  itemRowBtm: {
    flexDirection: 'row',
    marginTop: 10,
    flex: 1,
    marginRight: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemCol: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  imgUser: {width: 50, height: 50, borderRadius: 30},
  txtUser: {
    fontSize: 16,
    marginTop: 10,
    fontWeight: 'bold',
  },
  txtNormal: {
    fontSize: 16,
  },
  txtNumber: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  txtNoPosts: {color: Color.whiteColor, fontSize: 16, margin: 20},
  divider: {
    backgroundColor: 'white',
    opacity: 0.7,
    margin: 20,
    marginBottom: 10,
    padding: 2,
    borderRadius: 20,
  },
  itemRowBtmRight: {
    alignItems: 'center',
  },
});
