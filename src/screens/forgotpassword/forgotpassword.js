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

import Color from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VerifyInputs from '../../components/VerifyInputs';

import {service} from '../../services/service';

const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [pass1, setPass1] = useState('');
  const [pass2, setPass2] = useState('');
  const [loading, setLoading] = useState('');
  const [validation, setValidation] = useState(true);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const [showPass1, setShowPass1] = useState(false);
  const [showPass2, setShowPass2] = useState(false);

  const handleVerification = () => {
    setShowPasswordFields(true);
  };

  const handleValidation = () => {
    if (email) {
      setEmailErr(false);
      return true;
    } else {
      setEmailErr(true);
      return false;
    }
  };

  const handlePasswordValidation = () => {
    if (pass1 !== pass2) {
      alert('password and confirm password dont match');
      return false;
    } else if (pass1.length < 7) {
      alert('password length should be greater than 6');
      return false;
    } else {
      return true;
    }
  };
  const resetPasswordHandler = () => {
    if (handlePasswordValidation()) {
      service
        .updatePasswordAfterVerificationCode({email, newPassword: pass1})
        .then((data) => {
          if (data.data.error) {
            // console.log(data)
            alert(data.data.error);
          } else {
            alert('Password updated  successfully. Please Log in your account');
            navigation.navigate('Login');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const showUpdatePasswordComponent = () => {
    setValidation(true);
    setShowPasswordFields(true);
  };

  const sendVerificationCodeHandler = () => {
    if (handleValidation()) {
      service
        .sendForgetPasswordVerificationCode({email})
        .then((data) => {
          if (data.data.success) {
            setValidation(false);
            console.log(data.data);
          } else {
            alert(data.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
            <Image
              style={styles.imgMrcoupon}
              resizeMode="contain"
              source={require('../../assets/images/logo.png')}
            />

            <View style={styles.containerMargin}>
              <Text style={styles.txtLogin}>Reset Your Password</Text>

              {!showPasswordFields ? (
                validation ? (
                  <View>
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
                    {emailErr && (
                      <Text style={styles.errTxt}>Please type email</Text>
                    )}

                    {loading ? (
                      <ActivityIndicator
                        size="large"
                        color="#fff"
                        style={{marginVertical: loading ? 10 : 0}}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.btnLogin}
                        onPress={sendVerificationCodeHandler}>
                        <Text style={styles.btnLoginTxt}>
                          Send Verification Code
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Text style={styles.dontHave}>
                      Remembered your Password?
                    </Text>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('Signup')}
                      style={styles.btnSignup}>
                      <Text style={styles.txtSignup}>Go Back to Login</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <VerifyInputs
                    email={email}
                    type={'resetpassword'}
                    callBackHandler={handleVerification}
                    showUpdatePasswordComponent={showUpdatePasswordComponent}
                  />
                )
              ) : (
                showPasswordFields && (
                  <View>
                    <Text style={styles.txtInput}>Your New Password</Text>

                    <View style={styles.inputBoxes}>
                      <TouchableOpacity
                        onPress={() => setShowPass1(!showPass1)}>
                        <FontAwesome
                          name={showPass1 ? 'eye' : 'eye-slash'}
                          color="#bbb"
                          size={20}
                        />
                      </TouchableOpacity>
                      <TextInput
                        secureTextEntry={showPass1}
                        placeholderTextColor="#bbb"
                        placeholder="Password"
                        style={styles.inputStyle}
                        value={pass1}
                        onChangeText={(text) => setPass1(text)}
                      />
                    </View>
                    {emailErr && (
                      <Text style={styles.errTxt}>
                        Please type correct password
                      </Text>
                    )}

                    <Text style={styles.txtInput}>Confirm New Password</Text>

                    <View style={styles.inputBoxes}>
                      <TouchableOpacity
                        onPress={() => setShowPass2(!showPass2)}>
                        <FontAwesome
                          name={showPass2 ? 'eye' : 'eye-slash'}
                          color="#bbb"
                          size={20}
                        />
                      </TouchableOpacity>
                      <TextInput
                        secureTextEntry={showPass2}
                        placeholderTextColor="#bbb"
                        placeholder="Confirm Password"
                        style={styles.inputStyle}
                        value={pass2}
                        onChangeText={(text) => setPass2(text)}
                      />
                    </View>
                    {emailErr && (
                      <Text style={styles.errTxt}>
                        Please type correct password
                      </Text>
                    )}

                    <TouchableOpacity
                      style={styles.btnLogin}
                      onPress={resetPasswordHandler}>
                      <Text style={styles.btnLoginTxt}>Reset Password</Text>
                    </TouchableOpacity>
                  </View>
                )
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default ResetPassword;

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
    marginTop: 40,
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
    marginVertical: 30,
    borderRadius: 10,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
});
