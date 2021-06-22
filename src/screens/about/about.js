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
const About = ({navigation}) => {
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
              <Text style={styles.heading}>Where Music Lives</Text>

              <View style={styles.txtContainer}>
                <Text style={styles.txt}>
                  Moosic lets you play the music you just have to hear,
                  instantly. Jump in and explore over 73 million tracks (and
                  counting), and discover artists and tracks you'll love with
                  personalized recommendations from the Moosic Editors. Moosic
                  works across all your devices, both online and offline, with
                  no listening limits. It's music at your fingertips for waking
                  up, getting going, chilling out, living life.
                </Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default About;

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
  txt: {fontSize: 18, fontWeight: '100'},
  txtContainer: {
    backgroundColor: Color.whiteColor,
    padding: 30,
    margin: 20,
    borderRadius: 10,
  },
});
