import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Color from '../constants/Color';
import {service} from '../services/service';
import {emailVerification} from '../store/actions/Auth';

const VerifyInputs = ({
  navigation,
  callBackHandler,
  type,
  email,
  showUpdatePasswordComponent,
}) => {
  const CELL_COUNT = 4;

  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const dispatch = useDispatch();

  const resendCodeHandler = () => {
    if (type === 'resetpassword') {
      service
        .resendForgetPasswordVerificationCode({email})
        .then((data) => {
          console.log(data.data, 'dsds');

          if (!data.data.error) {
            alert('Verification Code sent Successfully');
          } else {
            alert(data.data.error);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      service.resendEmailVerificationCode().then((data) => {
        if (data.data.error) {
          alert(data.data.error);
        } else {
          console.log(data.data);
          alert('Verification Code sent successfully');
        }
      });
    }
  };
  const validationHandler = () => {
    if (value.length === 4) {
      return true;
    } else {
      return false;
    }
  };

  const verificationHandler = () => {
    // callBackHandler();
    // console.log(type, ' type');
    if (validationHandler()) {
      if (type === 'resetpassword') {
        service
          .verifyForgetPasswordVerificationCode({
            resetPasswordCode: value,
            email,
          })
          .then((data) => {
            if (data.data.error) {
              alert(data.data.error);
            } else {
              showUpdatePasswordComponent();
              console.log(data.data);
            }
          })
          .catch((err) => console.log(err));
        console.log('resetpass');
      } else {
        service
          .verifyEmail({emailVerificationCode: value})
          .then((data) => {
            console.log(data.data);
            if (data.data.error) {
              alert(data.data.error);
            } else {
              console.log(data.data);
              dispatch(emailVerification);
              navigation.navigate('Login');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      alert('Please type verification code of 4 digits');
    }
  };

  return (
    <View style={styles.root}>
      <Text style={styles.title}>
        Please enter the verification code sent to your email
      </Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />

      <TouchableOpacity style={styles.btnForgot} onPress={verificationHandler}>
        <Text style={styles.btnForgotTxt}>Verify Account</Text>
        <AntDesign
          style={{marginTop: 0}}
          name="arrowright"
          color="white"
          size={28}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.btnAgain} onPress={resendCodeHandler}>
        <Text style={styles.btnForgotTxt}>Resend Code</Text>
        <AntDesign
          style={{marginTop: 0}}
          name="arrowright"
          color="white"
          size={28}
        />
      </TouchableOpacity>
    </View>
  );
};

export default VerifyInputs;

const styles = StyleSheet.create({
  root: {padding: 10},
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: 'white',
    marginVertical: 20,
  },
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 40,
    borderWidth: 2,
    borderColor: Color.primary,
    textAlign: 'center',
    color: 'white',
    fontSize: 30,
    paddingTop: 5,
  },
  focusCell: {
    borderColor: 'white',
  },

  btnForgotTxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  btnForgot: {
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

  btnAgain: {
    padding: 15,

    borderRadius: 10,
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    marginHorizontal: '10%',
    justifyContent: 'center',
  },
});
