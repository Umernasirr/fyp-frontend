import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
const NotificationSettings = ({navigation}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.marginContainer}>
              <Text style={styles.heading}>Notification Settings</Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default NotificationSettings;

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
    marginTop: 20,
  },
  heading: {
    fontSize: 30,
    color: Color.whiteColor,
    margin: 10,
  },
});
