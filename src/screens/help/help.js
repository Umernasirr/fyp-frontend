import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import {useSelector} from 'react-redux';

const Help = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);
  const handleSupportPress = (params) => {
    const newChat = {
      name: `Support#${Math.round(Math.random() * 1000)}`,
      private: true,
      support: true,
      createdBy: user,
    };

    firestore()
      .collection('threads')
      .add(newChat)
      .then((item) => {
        navigation.navigate('Chat', {
          screen: 'Chat',
          params: {
            thread: newChat,
          },
        });
      });
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
            <View style={styles.marginContainer}>
              <Text style={styles.heading}>Help and Support</Text>

              <Text style={styles.subHeading}>
                Need help with our Moosic App? Our technical support team will
                answer your common support queries and resources. Do check us
                out!
              </Text>

              <Button
                onPress={handleSupportPress}
                color={Color.primary}
                mode="contained"
                style={styles.btn}>
                Start Chat with Agent
              </Button>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default Help;

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
  subHeading: {
    backgroundColor: Color.whiteColor,
    padding: 30,
    fontSize: 16,
    marginVertical: 20,
    borderRadius: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 10,
    margin: 20,
  },
});
