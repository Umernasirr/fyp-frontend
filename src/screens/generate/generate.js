import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  ImageBackground,
} from 'react-native';
import Slider from 'react-native-slider';

import TrackPlayer from 'react-native-track-player';
import axios from 'axios';

import Color from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';
// import ErrorModal from '../../components/ErrorModal';
const trackPlayerInit = async (url) => {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add({
    id: '1',
    url: url,
    type: 'default',
    title: 'My Title',
    album: 'My Album',
    artist: 'AI Generated Music',
  });

  return true;
};
const Generate = ({navigation}) => {
  const [lyrics, setLyrics] = useState('');
  const [isTrackPlayerInit, setIsTrackPlayerInit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const {position, duration} = useTrackPlayerProgress(250);
  const [musicData, setMusicData] = useState([]);
  const [songDuration, setSongDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSliderValue(position / duration);
    }
  }, [position, duration]);

  const onButtonPressed = () => {
    if (!isPlaying) {
      TrackPlayer.play();
      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };
  //this function is called when the user starts to slide the seekbar
  const slidingStarted = () => {
    setIsSeeking(true);
  };
  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(0);
    setSliderValue(value);
    setIsSeeking(false);
  };
  const lyricsHandler = () => {
    setLoading(true);

    const body = JSON.stringify({
      // user_id: await AsyncStorage.getItem('user_id'),
      // category_id: 6,
      // // sub_cateogory_id: 2,
      // // subCategory: 2,
      // post_id: id,
      // favorite: '1',
      lyrics: lyrics,
    });
    axios({
      method: 'POST',
      url: 'http://192.168.18.49:3000/api/v1/song/get-song-by-lyrics',
      data: body,
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (response) => {
        const startPlayer = async () => {
          let isInit = await trackPlayerInit(response.data.data);
          setIsTrackPlayerInit(isInit);
        };
        startPlayer();

        setLyrics('');
        setSongDuration(response.data.duration + '');
        setLoading(false);
      })
      .catch(function (response) {
        alert('Music will only be generated with english words');
        setLoading(!loading);
      });
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

      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* <Image
            style={styles.imgMrcoupon}
            resizeMode="contain"
            source={require('../../assets/images/logo2.png')}
          /> */}

            <View style={styles.containerMargin}>
              <Text style={styles.txtLogin}>
                Generate A <Text style={{color: Color.primary}}>Song</Text>
              </Text>
              <View style={styles.inputBox}>
                <FontAwesome name="music" color="#bbb" size={20} />
                <TextInput
                  placeholderTextColor="#bbb"
                  placeholder="Please type your lyrics"
                  multiline={true}
                  style={styles.inputStyle}
                  // numberOfLines={4}
                  value={lyrics}
                  onChangeText={(text) => setLyrics(text)}
                />
              </View>

              {loading ? (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  style={{marginVertical: loading ? 20 : 0}}
                />
              ) : (
                <TouchableOpacity
                  style={styles.btnGenerate}
                  onPress={lyricsHandler}
                  disabled={lyrics.length <= 0 ? true : false}>
                  <Text style={styles.btnGenerateTxt}>Generate Music</Text>
                </TouchableOpacity>
              )}
              <View style={styles.audioContainer}>
                <FontAwesome
                  onPress={onButtonPressed}
                  style={styles.fontAudio}
                  name={isPlaying ? 'pause' : 'play'}
                  color="white"
                  size={20}
                />
                <Slider
                  style={{width: '90%', height: 20, color: Color.primary}}
                  minimumValue={0}
                  maximumValue={1}
                  value={sliderValue}
                  minimumTrackTintColor="#A159E9"
                  maximumTrackTintColor="gray"
                  onSlidingStart={slidingStarted}
                  onSlidingComplete={slidingCompleted}
                  thumbTintColor="white"
                />
              </View>
              {/* )} */}

              <View style={styles.viewLine} />

              {duration > 0 ? (
                <Text style={styles.dontHave}>
                  Song Duration is: {Math.round(songDuration)} seconds
                </Text>
              ) : (
                <Text style={styles.dontHave}>
                  Please Input English lyrics to generate Music
                </Text>
              )}

              <Text style={styles.dontHave}>
                Thank you for using our AI Model for Music Generation
              </Text>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default Generate;
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
  btnSignup: {
    marginTop: 3,
    alignSelf: 'center',
  },
  txtSignup: {
    color: '#fff',
    fontSize: 15,
    alignSelf: 'center',
  },
  dontHave: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 1)',
    alignSelf: 'center',
    textAlign: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  inputStyle: {
    flex: 1,
    paddingVertical: 0,
    paddingHorizontal: 15,
    color: Color.fontBlack,
    height: 100,
    display: 'flex',
    alignContent: 'flex-start',
    alignItems: 'flex-start',
    // textAlign: 'fl e'
    justifyContent: 'flex-start',
  },
  viewLine: {
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginTop: 20,
    alignSelf: 'center',
  },
  inputBox: {
    width: '100%',
    // height: 50,
    backgroundColor: Color.whiteColor,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 7,
    marginTop: 20,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
  },
  txtLogin: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    margin: 10,
    marginTop: 40,
    textAlign: 'center',
  },
  imgMrcoupon: {
    height: 50,
    width: 240,
    alignSelf: 'center',
    marginTop: 80,
  },
  Linear: {
    flex: 1,
  },

  containerMargin: {
    marginHorizontal: '4%',
  },
  audioContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 20,
    // flex: 0.45,
    marginVertical: 10,
    borderColor: Color.primary,
    borderWidth: 2,
    borderRadius: 10,
  },
  fontAudio: {
    display: 'flex',
    flexDirection: 'column',
    textAlignVertical: 'center',
    color: Color.whiteColor,
    marginHorizontal: 10,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    opacity: 1,
  },

  btnGenerateTxt: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    marginRight: 10,
  },
  btnGenerate: {
    padding: 20,

    backgroundColor: Color.primary,
    marginVertical: 20,
    marginTop: 40,
    marginHorizontal: 40,
    borderRadius: 20,
  },
});
