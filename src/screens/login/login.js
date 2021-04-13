import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  ImageBackground,
} from 'react-native';
import {useDispatch} from 'react-redux';

import Color from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {service} from '../../services/service';
import {login} from '../../store/actions/Auth';

// import ErrorModal from '../../components/ErrorModal';

const Login = ({
  // user,
  // loading,
  // isAuthenticated,
  // error,
  // login,
  navigation,
  // clearError,
}) => {
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [emailErr, setemailErr] = useState(false);
  const [passwordErr, setpasswordErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(false);
  const disptach = useDispatch();
  // const loginHandler = () => {
  //   // alert('dssda');
  //   if (email === '' || email === ' ') {
  //     setemailErr(true);
  //   } else {
  //     setemailErr(false);
  //   }
  //   if (password === '' || password === ' ') {
  //     setpasswordErr(true);
  //   } else {
  //     setpasswordErr(false);
  //   }
  //   if (email !== '' && password !== '') {
  //     const body = JSON.stringify({
  //       email: email,
  //       password: password,
  //     });
  //     setLoading(true);
  //   }
  //   // if (email !== '' && password !== '') {
  //   //   navigation.navigate('Home');
  //   // }
  //   // alert('dasddsaasddasasddsa');
  // };
  const verificationHandler = () => {
    if (email && password) {
      return true;
    } else {
      return false;
    }
  };

  const loginHandler = () => {
    console.log(email, 'email');
    if (verificationHandler()) {
      service
        .login({email, password})
        .then((data) => {
          if (data.data.error) {
            alert(data.data.error);
          } else {
            console.log(data.data);
            disptach(login);
            navigation.navigate('Home');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // dispatch(login(true));
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

      <StatusBar backgroundColor={Color.linearColor1} />

      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image
              style={styles.imgMrcoupon}
              resizeMode="contain"
              source={require('../../assets/images/logo.png')}
            />

            <View style={styles.containerMargin}>
              <Text style={styles.txtLogin}>Login Now To Start!</Text>

              <Text style={styles.txtInput}>Your Email</Text>

              <View style={styles.inputBoxes}>
                <FontAwesome name="at" color="#bbb" size={20} />
                <TextInput
                  placeholderTextColor="#bbb"
                  placeholder="Email Address"
                  style={styles.inputStyle}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              {emailErr && <Text style={styles.errTxt}>Please type email</Text>}

              <Text style={styles.txtInput}>Your Password</Text>

              <View style={styles.inputBoxes}>
                <AntDesign name="lock" color="#bbb" size={20} />
                <TextInput
                  placeholderTextColor="#bbb"
                  placeholder="Password"
                  secureTextEntry={true}
                  style={styles.inputStyle}
                  value={password}
                  onChangeText={(text) => setpassword(text)}
                />
              </View>
              {passwordErr && (
                <Text style={styles.errTxt}>Please type Password</Text>
              )}
              {errors ? (
                <Text style={styles.errTxt}>Invalid email or password</Text>
              ) : null}

              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  style={{marginVertical: loading ? 10 : 0}}
                />
              ) : (
                <TouchableOpacity
                  style={styles.btnLogin}
                  onPress={loginHandler}>
                  <Text style={styles.btnLoginTxt}>LOGIN</Text>
                  <AntDesign
                    style={{marginTop: 0}}
                    name="arrowright"
                    color="white"
                    size={28}
                  />
                </TouchableOpacity>
              )}
              <Text style={styles.dontHave}>Don't have an account?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Signup')}
                style={styles.btnSignup}>
                <Text style={styles.txtSignup}>Signup</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}
                style={styles.btnSignup}>
                <Text style={styles.txtSignup}>Forget Password</Text>
              </TouchableOpacity>
              {/* <View style={styles.viewLine} />
          <Text style={styles.dontHave}>
            By creating an account, you agree to our
          </Text>
          <TouchableOpacity style={[styles.btnSignup, {marginBottom: 30}]}>
            <Text style={styles.txtSignup}>Terms and conditions</Text>
          </TouchableOpacity> */}
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

// const mapStateToProps = (state) => ({
//   loading: state.authReducer.loading,
//   isAuthenticated: state.authReducer.isAuthenticated,
//   user: state.authReducer.user,
//   error: state.authReducer.error,
// });

// export default connect(mapStateToProps, {login, clearError})(LoginScreen);
export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errTxt: {
    fontSize: 12,
    color: 'red',
    width: '95%',
    alignSelf: 'center',
    marginTop: 5,
  },

  txtInput: {
    color: 'white',
    marginTop: 30,
  },
  btnSignup: {
    marginTop: 3,
    alignSelf: 'center',
  },
  txtSignup: {
    color: '#fff',
    fontSize: 15,
    alignSelf: 'center',
    margin: 10,
  },
  dontHave: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.5)',
    alignSelf: 'center',
    marginTop: 5,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0,
    color: Color.whiteColor,
    borderColor: Color.primary,
    marginHorizontal: 10,
  },
  viewLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginVertical: 10,
    alignSelf: 'center',
  },
  inputBoxes: {
    width: '100%',
    height: 50,
    backgroundColor: Color.background,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 7,
    marginTop: 10,
    borderColor: Color.primary,
    borderWidth: 2,
  },
  txtLogin: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    marginRight: '20%',
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 1,
  },
  imgMrcoupon: {
    height: 100,
    width: 240,
    alignSelf: 'center',
    marginTop: 30,
  },
  Linear: {
    flex: 1,
  },
  containerMargin: {
    marginHorizontal: '10%',
  },

  btnLoginTxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  btnLogin: {
    padding: 15,

    backgroundColor: Color.primary,
    marginVertical: 20,
    borderRadius: 10,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginHorizontal: '20%',
    justifyContent: 'center',
  },
});
