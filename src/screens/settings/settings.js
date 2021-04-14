import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import {connect} from 'react-redux';
import Color from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

import AntDesign from 'react-native-vector-icons/AntDesign';
import {reset} from '../../store/actions/Auth';
import {useDispatch} from 'react-redux';
const Settings = ({navigation, user}) => {
  const dispatch = useDispatch();
  console.log(user, 'user');
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
              </View>

              <View style={styles.card}>
                <View style={styles.cardContainer}>
                  <Text style={styles.cardTitle}>Display Name</Text>
                  <View>
                    <Text style={styles.cardTxt}>{user && user.name}</Text>
                  </View>
                </View>

                <View style={styles.cardContainer}>
                  <Text style={styles.cardTitle}>Email Address</Text>
                  <View>
                    <Text style={styles.cardTxt}>{user && user.email}</Text>
                  </View>
                </View>

                <View style={styles.cardContainer}>
                  <Text style={styles.cardTitle}>Gender</Text>
                  <View>
                    <Text style={styles.cardTxt}>{user && user.gender}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.card}>
                <View style={styles.cardContainer}>
                  <Text style={styles.cardTitle}>Lorem Ipsum</Text>
                  <View>
                    <Text style={styles.cardTxt}>Dolar</Text>
                  </View>
                </View>
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
    flexDirection: 'row',
    marginVertical: 20,
    marginTop: 40,
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
    fontSize: 25,
    fontWeight: 'bold',
    margin: 10,
    marginHorizontal: 20,
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
    padding: 20,

    borderRadius: 10,
    marginVertical: 10,
  },

  cardContainer: {
    marginVertical: 15,
    marginHorizontal: 10,
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
});
