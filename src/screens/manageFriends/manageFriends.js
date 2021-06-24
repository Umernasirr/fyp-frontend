import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {service} from '../../services/service';
import {deleteRequests, getRequests} from '../../store/actions/Request';
import {updateUser} from '../../store/actions/Auth';
const ManageFriends = ({
  navigation,
  requests,
  getRequests,
  deleteRequests,
  user,
  updateUser,
}) => {
  const [requestsToShow, setrequestsToShow] = useState(requests);
  const [friendsToShow, setFriendsToShow] = useState([]);
  const [isDeletedFriend, setIsDeletedFriend] = useState(false);

  useEffect(() => {
    service
      .getRequests()
      .then((data) => {
        if (!data.data.success) {
          service.getRequests().then((data) => {
            setrequestsToShow(data.data.data);
          });
        }
        if (data.data.success) {
          setrequestsToShow(data.data.data);
          getRequests(data.data.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    service
      .getFriendsByID(user._id)
      .then((data) => {
        setFriendsToShow(data.data.data.friends);
      })
      .catch((err) => console.log(err));
  }, [requestsToShow, isDeletedFriend]);

  const deleteFriendHandler = (id) => {
    service
      .deleteFriend(id)
      .then((data) => {
        if (data.data.success) {
          updateUser(data.data.data);
          setIsDeletedFriend(!isDeletedFriend);
        }
      })
      .catch((err) => console.log(err));
  };

  const addFriendHandler = (id) => {
    service
      .acceptRequest({requestId: id})
      .then((data) => {
        if (data.data.success) {
          deleteRequests({requestId: id});

          setrequestsToShow((prev) =>
            prev.filter((request) => {
              if (request._id.toString() !== id.toString()) {
                return request;
              }
            }),
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const removeFriendHandler = (id) => {
    service
      .deleteRequest({requestId: id})
      .then((data) => {
        if (data.data.success) {
          deleteRequests({requestId: id});
          setrequestsToShow((prev) =>
            prev.filter((request) => {
              if (request._id.toString() !== id.toString()) {
                return request;
              }
            }),
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <View style={styles.marginContainer}>
            <View>
              <View style={styles.dividerContainer}>
                <Text style={styles.dividerTxt}>New Friend Requests</Text>
              </View>
              <View style={styles.divider} />
              <View>
                {requestsToShow && requestsToShow.length > 0 && (
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
                    keyExtractor={(item) => item._id.toString()}
                    data={requestsToShow}
                    renderItem={({item}) => (
                      <View style={styles.friendsList}>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('UserList', {
                              screen: 'UserDetails',
                              params: {user: item},
                            })
                          }
                          style={styles.friendsLeft}>
                          <Image
                            style={styles.imgUser}
                            source={{
                              uri: item.avatar
                                ? item.avater
                                : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
                            }}
                          />
                          <Text>{item.requestBy.name}</Text>
                        </TouchableOpacity>

                        <View style={styles.friendsRight}>
                          <TouchableOpacity
                            onPress={() => addFriendHandler(item._id)}>
                            <Ionicons
                              name="add-circle-outline"
                              color={Color.primary}
                              size={28}
                            />
                          </TouchableOpacity>

                          <View style={{margin: 10}} />
                          <TouchableOpacity
                            onPress={() => removeFriendHandler(item._id)}>
                            <Ionicons
                              name="remove-circle-outline"
                              color={Color.primary}
                              size={28}
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                    )}
                  />
                )}
              </View>
            </View>
            <View style={styles.dividerContainer}>
              <Text style={styles.dividerTxt}>Manage Friends</Text>
            </View>

            <View style={styles.divider} />
            <View style={{maxHeight: '50%'}}>
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
                keyExtractor={(item) => item._id.toString()}
                data={friendsToShow}
                renderItem={({item}) => (
                  <View style={styles.friendsList}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('UserList', {
                          screen: 'UserDetails',
                          params: {user: item},
                        })
                      }
                      style={styles.friendsLeft}>
                      <Image
                        style={styles.imgUser}
                        source={{
                          uri: item.avatar
                            ? item.avatar
                            : 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
                        }}
                      />

                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => deleteFriendHandler(item._id)}
                      style={styles.friendsRight}>
                      <AntDesign
                        name="delete"
                        color={Color.primary}
                        size={24}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </View>
          </View>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

const mapStateToProps = (state) => ({
  requests: state.request.requests,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getRequests,
  deleteRequests,
  updateUser,
})(ManageFriends);

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
    flex: 1,
    marginHorizontal: '4%',
  },

  divider: {
    backgroundColor: 'white',
    opacity: 0.7,
    marginVertical: 20,
    padding: 2,
    borderRadius: 20,
  },

  dividerContainer: {
    marginTop: 40,
    alignItems: 'center',
  },

  dividerTxt: {
    color: Color.whiteColor,
    fontSize: 20,
  },
  friendsList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.whiteColor,
    padding: 20,
  },

  friendsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  friendsRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',

    flexDirection: 'row',
  },

  imgUser: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
});
