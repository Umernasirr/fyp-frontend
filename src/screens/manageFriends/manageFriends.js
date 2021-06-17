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
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {FRIENDS, PENDING} from '../../constants/index';
import {service} from '../../services/service';
import {Store} from '../../services/store';
import {deleteRequests, getRequests} from '../../store/actions/Request';
const ManageFriends = ({
  navigation,
  requests,
  getRequests,
  deleteRequests,
  user,
}) => {
  const [requestsToShow, setrequestsToShow] = useState(requests);
  const [friendsToShow, setFriendsToShow] = useState([]);
  useEffect(() => {
    service
      .getRequests()
      .then((data) => {
        if (!data.data.success) {
          service.getRequests().then((data) => {
            // console.log(data.data.data, 'sencons ');
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
  }, [requestsToShow]);
  const addFriendHandler = (id) => {
    console.log(id);
    service
      .acceptRequest({requestId: id})
      .then((data) => {
        if (data.data.success) {
          deleteRequests({requestId: id});

          setrequestsToShow((prev) =>
            prev.filter((request) => {
              if (request._id.toString() !== id.toString()) {
                console.log(true);
                return request;
              }
            }),
          );
        }
      })
      .catch((err) => console.log(err));
  };
  const removeFriendHandler = (id) => {
    console.log(id);

    service
      .deleteRequest({requestId: id})
      .then((data) => {
        console.log(data.data);
        if (data.data.success) {
          deleteRequests({requestId: id});
          setrequestsToShow((prev) =>
            prev.filter((request) => {
              if (request._id.toString() !== id.toString()) {
                console.log(true);
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
                        <View style={styles.friendsLeft}>
                          <Image
                            style={styles.imgUser}
                            source={{uri: 'https://via.placeholder.com/150'}}
                          />
                          <Text>{item.requestBy.name}</Text>
                        </View>

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
                    <View style={styles.friendsLeft}>
                      <Image
                        style={styles.imgUser}
                        source={{uri: 'https://via.placeholder.com/150'}}
                      />

                      <Text>{item.name}</Text>
                    </View>
                    <TouchableOpacity style={styles.friendsRight}>
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

export default connect(mapStateToProps, {getRequests, deleteRequests})(
  ManageFriends,
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
