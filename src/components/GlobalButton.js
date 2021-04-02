import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Color from '../constants/Color';
import LinearGradient from 'react-native-linear-gradient';

const SettingButton = (props) => {
  return (
    <TouchableOpacity
      onPress={props.navigationProps}
      style={[
        styles.container,
        {
          width: props.btnWidth ? props.btnWidth : '90%',
          marginTop: props.top ? props.top : null,
        },
      ]}>
      <LinearGradient
        colors={[Color.linearColor2, Color.linearColor1]}
        style={styles.Linear}>
        <Text style={{fontSize: 15, color: Color.whiteColor}}>
          {props.buttonText}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SettingButton;

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '90%',
    borderRadius: 7,
    marginBottom: 25,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  Linear: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
  },
});
