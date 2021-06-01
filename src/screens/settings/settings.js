import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {Button, Divider} from 'react-native-paper';
import {connect} from 'react-redux';
import Color from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {reset} from '../../store/actions/Auth';
import {useDispatch} from 'react-redux';
const Settings = ({navigation, user}) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(reset(navigation));
    // navigation.navigate('Login');
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
            <View style={styles.containerMargin}>
              <View style={styles.topRow}>
                <View>
                  <Image
                    source={require('../../assets/images/person.png')}
                    style={styles.profileImage}
                  />
                </View>
                <Text style={styles.profileTxt}>{user && user.name}</Text>
                <Button color={Color.primary}>Change Photo</Button>
              </View>

              <View style={styles.card}>
                <TouchableOpacity
                  style={styles.cardItem}
                  onPress={() => navigation.navigate('AccountSettings')}>
                  <Text>Account Settings</Text>
                </TouchableOpacity>

                <Divider />
                <TouchableOpacity
                  style={styles.cardItem}
                  onPress={() => navigation.navigate('NotificationSettings')}>
                  <Text>Notification Settings</Text>
                </TouchableOpacity>
                <Divider />

                <TouchableOpacity
                  style={styles.cardItem}
                  onPress={() => navigation.navigate('Help')}>
                  <Text>Help and Support</Text>
                </TouchableOpacity>
                <Divider />

                <TouchableOpacity
                  style={styles.cardItem}
                  onPress={() => navigation.navigate('About')}>
                  <Text>About Us</Text>
                </TouchableOpacity>
                <Divider />
              </View>
            </View>

            <TouchableOpacity style={styles.btnLogin}>
              <Text style={styles.btnLoginTxt} onPress={handleLogout}>
                LOGOUT
              </Text>
              <AntDesign
                style={{marginTop: 0}}
                name="arrowright"
                color="white"
                size={28}
              />
            </TouchableOpacity>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  containerMargin: {
    flex: 1,
    marginHorizontal: '5%',
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
    justifyContent: 'center',
  },

  Linear: {
    flex: 1,
    backgroundColor: 'red',
  },

  topRow: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 20,
    marginTop: 20,
  },

  profileImage: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 50,
  },

  profileTxt: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    letterSpacing: 1.1,
  },

  cardTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  cardTxt: {
    color: Color.primary,
  },
  cardBtn: {
    backgroundColor: 'gray',
    color: 'black',
  },
  card: {
    alignSelf: 'stretch',
    alignItems: 'baseline',
    backgroundColor: 'white',
    paddingVertical: 10,

    borderRadius: 10,
    marginVertical: 10,
    flex: 1,
  },

  btnLoginTxt: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    marginRight: 10,
  },
  btnLogin: {
    padding: 10,
    backgroundColor: Color.primary,
    marginVertical: 20,
    borderRadius: 10,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: '25%',
    justifyContent: 'center',
  },
  cardItem: {
    padding: 20,
  },
});
