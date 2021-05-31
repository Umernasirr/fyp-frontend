import React, {useState, useRef} from 'react';
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
import CountryPicker from 'react-native-country-picker-modal';
import PhoneInput from 'react-native-phone-input';
import {CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
// import {register, clearError} from '../../redux/actions/AuthActions';

import Color from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import GlobalButton from '../../components/GlobalButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import VerifyInputs from '../../components/VerifyInputs';
import {service} from '../../services/service';
import {register} from '../../store/actions/Auth';
// import ErrorModal from '../../components/ErrorModal';

const Signup = ({
  // register,
  // error,
  // isAuthenticated,
  // token,
  navigation,
  // loading,
  // clearError,
}) => {
  const [checkedEmail, setcheckedEmail] = useState('');
  const [checkedTerms, setcheckedTerms] = useState('');
  const [showVerification, setShowVerification] = useState(false);

  const [visible, setvisible] = useState(false);
  const [phone, setphone] = useState('');
  const [cca2, setcca2] = useState('PK');
  const [countryCode, setcountryCode] = useState('923');

  const [nameErr, setnameErr] = useState(false);
  const [emailErr, setemailErr] = useState(false);
  const [passwordErr, setpasswordErr] = useState(false);
  const [phoneNumberErr, setphoneNumberErr] = useState(false);
  const [loading, setLoading] = useState(false);

  const [verified, setVerified] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const dispatch = useDispatch();

  // counrt picker work
  const onPressFlag = () => {
    // setFormData({
    //   ...formData,
    //   phoneNumber: '',
    // });
    setvisible(true);
  };
  const phoneref = useRef();

  const handleSelectCountry = (country) => {
    // console.log(country);
    // console.log(phoneref.current.getISOCode('af'));
    // console.log(phoneref.current.selectCountry('af'));
    // phoneref.current.selectCountry(country.cca2.toLowerCase());
    setcca2(country.cca2);
    setcountryCode(country.callingCode[0]);
    if (countryCode !== country.callingCode[0]) {
      setFormData({
        ...formData,
        phoneNumber: '',
      });
    }
  };

  const CountryPickerref = useRef();

  // const handleErrorClose = () => {
  //   clearError();
  // };

  const {name, email, phoneNumber, password} = formData;

  const handleOnTextChange = (name, value) => {
    // console.log(value);
    setFormData({...formData, [name]: value});
  };

  // console.log(phoneNumber, 'phoneeeeeee');
  const verificationHandler = async (e) => {
    if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
      email === '' ||
      email === ' '
    ) {
      setemailErr(true);
      // return false;
    } else {
      setemailErr(false);
    }
    if (name === '' || name === ' ') {
      setnameErr(true);
    } else {
      setnameErr(false);
    }
    if (phoneNumber === '' || phoneNumber === ' ' || phoneNumber.length <= 7) {
      setphoneNumberErr(true);
    } else {
      setphoneNumberErr(false);
    }
    if (password === '' || password === ' ') {
      setpasswordErr(true);
    } else {
      setpasswordErr(false);
    }

    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) &&
      email !== '' &&
      email !== ' ' &&
      phoneNumber !== '' &&
      phoneNumber !== ' ' &&
      password !== '' &&
      password !== ' ' &&
      name !== ' ' &&
      name !== '' &&
      phoneNumber.length > 7
    ) {
      setVerified(true);
      return true;
    } else {
      return false;
    }
  };

  const signupHandler = () => {
    if (verificationHandler()) {
      const body = {
        email: email,
        password: password,
        gender: 'male',
        name: name,
      };

      // console.log(body);
      setLoading(true);
      service
        .register(body)
        .then((data) => {
          setLoading(false);
          dispatch(register(data.data));
          if (!data.data.success) {
            alert(data.data.error);
          } else {
            setShowVerification(true);
          }
        })
        .catch((err) => {
          setLoading(false);
          dispatch(register(data.data));
          console.log(err.response.data, 'error');
        });
    }
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
            <Text style={styles.txtSignup}>Register your Account</Text>

            <View style={styles.containerMargin}>
              {!showVerification ? (
                <View>
                  <View style={styles.inputBoxes}>
                    <AntDesign name="user" color="#bbb" size={20} />
                    <TextInput
                      placeholderTextColor="#bbb"
                      placeholder="Full Name"
                      value={name}
                      onChangeText={(text) => handleOnTextChange('name', text)}
                      onChange={() => {
                        if (name === '' || name === ' ') {
                          setnameErr(true);
                        } else {
                          setnameErr(false);
                        }
                      }}
                      onBlur={() => {
                        if (name === '' || name === ' ') {
                          setnameErr(true);
                        } else {
                          setnameErr(false);
                        }
                      }}
                      style={styles.inputStyle}
                    />
                  </View>
                  {nameErr && (
                    <Text style={styles.errTxt}>Full Name is required</Text>
                  )}

                  <View style={styles.inputBoxes}>
                    <FontAwesome name="at" color="#bbb" size={20} />
                    <TextInput
                      placeholderTextColor="#bbb"
                      placeholder="Email Address"
                      value={email}
                      onChangeText={(text) => handleOnTextChange('email', text)}
                      onChange={() => {
                        if (
                          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                            email,
                          ) ||
                          email === '' ||
                          email === ' '
                        ) {
                          setemailErr(true);
                        } else {
                          setemailErr(false);
                        }
                      }}
                      onBlur={() => {
                        if (
                          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                            email,
                          ) ||
                          email === '' ||
                          email === ' '
                        ) {
                          setemailErr(true);
                        } else {
                          setemailErr(false);
                        }
                      }}
                      style={styles.inputStyle}
                    />
                  </View>
                  {emailErr && (
                    <Text style={styles.errTxt}>Email Format is invalid</Text>
                  )}

                  <View style={styles.viewPhoneInput}>
                    <Entypo
                      name="phone"
                      size={17}
                      color="#BCBCBC"
                      style={{marginHorizontal: 12}}
                    />
                    <PhoneInput
                      ref={phoneref}
                      onPressFlag={onPressFlag}
                      value={`+${countryCode}`}
                      textProps={{
                        placeholder: 'Phone number',
                        placeholderTextColor: '#BCBCBC',
                        color: 'white',
                      }}
                      onChangePhoneNumber={(value) => {
                        handleOnTextChange('phoneNumber', value);
                        if (
                          phoneNumber === '' ||
                          phoneNumber === ' ' ||
                          phoneNumber.length <= 1
                        ) {
                          setphoneNumberErr(true);
                        } else {
                          setphoneNumberErr(false);
                        }
                      }}
                      initialCountry="ae"
                    />
                    <CountryPicker
                      ref={CountryPickerref}
                      onSelect={(value) => handleSelectCountry(value)}
                      translation="eng"
                      cca2={cca2}
                      withCallingCode={true}
                      withCloseButton={true}
                      visible={visible}
                      modalProps={visible}
                      onClose={() => setvisible(false)}
                      onOpen={() => setvisible(false)}
                      {...{
                        withFilter: true,
                        withFlag: true,
                        withCurrencyButton: true,
                        withCallingCodeButton: true,
                        withCountryNameButton: true,
                        withAlphaFilter: true,
                        withCallingCode: true,
                        allowZeroAfterCountryCode: false,
                      }}>
                      <View />
                    </CountryPicker>
                  </View>
                  {phoneNumberErr && (
                    <Text style={styles.errTxt}>Phone number is required</Text>
                  )}

                  <View style={styles.inputBoxes}>
                    <AntDesign name="lock" color="#bbb" size={20} />
                    <TextInput
                      secureTextEntry={true}
                      placeholderTextColor="#bbb"
                      placeholder="Password"
                      value={password}
                      onChangeText={(text) =>
                        handleOnTextChange('password', text)
                      }
                      onChange={() => {
                        if (password === '' || password === ' ') {
                          setpasswordErr(true);
                        } else {
                          setpasswordErr(false);
                        }
                      }}
                      onBlur={() => {
                        if (password === '' || password === ' ') {
                          setpasswordErr(true);
                        } else {
                          setpasswordErr(false);
                        }
                      }}
                      style={styles.inputStyle}
                    />
                  </View>
                  {passwordErr && (
                    <Text style={styles.errTxt}>Password is required</Text>
                  )}

                  <View style={styles.viewCheckbox}>
                    <CheckBox
                      containerStyle={{
                        padding: 0,
                        marginHorizontal: 0,
                      }}
                      size={22}
                      checked={checkedTerms}
                      onPress={() => setcheckedTerms(!checkedTerms)}
                      // title={sub.name}
                    />
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: '#fff',
                          marginHorizontal: 0,
                          marginVertical: 10,
                          fontSize: 12,
                        }}>
                        I have read and agree with terms and conditions
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    style={styles.btnSignup}
                    onPress={signupHandler}>
                    <Text style={styles.btnSignupTxt}>SIGN UP</Text>
                    <AntDesign
                      style={{marginTop: 0}}
                      name="arrowright"
                      color="white"
                      size={28}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.dontHave}>
                      Already have an account?
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <VerifyInputs
                  navigation={navigation}
                  callBackHandler={signupHandler}
                />
              )}
              {loading && (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  style={{marginVertical: loading ? 15 : 0}}
                />
              )}
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewCheckbox: {
    flexDirection: 'row',
    // backgroundColor: 'rgba(0,0,0,0.1)',
    marginTop: 8,
    alignItems: 'center',
    alignSelf: 'center',
    marginHorizontal: 10,
    width: '100%',
    // marginBottom: 0,
  },
  viewPhoneInput: {
    flexDirection: 'row',
    backgroundColor: Color.background,
    borderColor: Color.primary,
    borderWidth: 2,
    alignItems: 'center',
    width: '100%',
    height: 50,
    alignSelf: 'center',
    borderBottomColor: 'rgba(34, 34, 34, 0.3)',
    marginTop: 20,
    borderRadius: 6,
  },

  errTxt: {
    fontSize: 12,
    color: 'red',
    width: '80%',
    alignSelf: 'center',
    marginTop: 10,
  },

  dontHave: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    alignSelf: 'center',
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 15,
    color: Color.whiteColor,
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
    marginTop: 20,
    borderColor: Color.primary,
    borderWidth: 2,
  },
  // containerMargin: {
  //   marginHorizontal: '5%',
  // },

  txtSignup: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginHorizontal: 10,
    marginRight: '20%',
  },
  imgMrcoupon: {
    height: 100,
    width: 240,
    alignSelf: 'center',
    marginTop: 30,
  },
  Linear: {
    flex: 1,
    paddingHorizontal: '5%',
  },

  btnSignupTxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  btnSignup: {
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

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 1,
  },
});
