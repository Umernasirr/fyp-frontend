import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {FRIENDS, PENDING} from '../../constants/index';
const ManageFriends = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <View style={styles.marginContainer}>
            <View style={styles.dividerContainer}>
              <Text style={styles.dividerTxt}>New Friend Requests</Text>
            </View>
            <View style={styles.divider} />
            <View style={{maxHeight: '30%'}}>
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
                data={PENDING}
                renderItem={({item}) => (
                  <View style={styles.friendsList}>
                    <View style={styles.friendsLeft}>
                      <Text>{item.name}</Text>
                    </View>

                    <View style={styles.friendsRight}>
                      <TouchableOpacity>
                        <Ionicons
                          name="add-circle-outline"
                          color={Color.primary}
                          size={28}
                        />
                      </TouchableOpacity>

                      <View style={{margin: 10}} />
                      <TouchableOpacity>
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
                keyExtractor={(item) => item.id.toString()}
                data={FRIENDS}
                renderItem={({item}) => (
                  <View style={styles.friendsList}>
                    <View style={styles.friendsLeft}>
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

export default ManageFriends;

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
    flex: 1,
    marginTop: 10,
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
    alignItems: 'flex-start',
    flex: 1,
  },
  friendsRight: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',

    flexDirection: 'row',
  },
});
