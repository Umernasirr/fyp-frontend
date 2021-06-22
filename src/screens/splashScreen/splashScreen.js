import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';

import Feather from 'react-native-vector-icons/Feather';
export default class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.springValue = new Animated.Value(0.7);
  }
  
  componentDidMount() {
    
    this.spring();
    setTimeout(() => {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Login'}],
        }),
      );
    }, 3000);
  }
  spring() {
    Animated.spring(this.springValue, {
      toValue: 1,
      friction: 1,
      useNativeDriver: true
    }).start();
  }

  render() {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={[Color.background, Color.linearColor2]}
          style={styles.Linear}>
          <StatusBar hidden={true} />
          <ImageBackground
            source={require('../../assets/images/background_texture.png')}
            style={styles.image}>
            {/* <Animated.View style={{transform: [{scale: this.springValue}]}}> */}

            <Text style={styles.txtHeading}>
              M
              <Feather name="play-circle" color={Color.primary} size={48} />
              <Feather name="play-circle" color={Color.primary} size={48} />
              SIK
            </Text>
            <Image
              style={{width: 300, height: 300}}
              // '../../as'
              source={require('../../assets/images/logo.png')}
              resizeMode="contain"
            />

            {/* </Animated.View> */}
            {/* </ImageBackground> */}
          </ImageBackground>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Linear: {
    flex: 1,
  },

  txtHeading: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 50,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 1,
    alignItems: 'center',
  },
});
