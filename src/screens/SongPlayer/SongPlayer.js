import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
} from 'react-native';
import Slider from 'react-native-slider';

import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import TrackPlayer from 'react-native-track-player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SoundCloudWaveform from 'react-native-soundcloud-waveform';

const SongPlayer = ({navigation, route}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [url, setUrl] = useState('');
  const [description, setDescription] = useState('');

  const [createdAt, setCreatedAt] = useState('');

  const title = 'Take On Me';
  const author = 'Aha - Rick Roll';

  const startPlayer = async (url) => {
    // Set up the player
    await TrackPlayer.setupPlayer();

    // Add a track to the queue
    const tempUrl =
      url !== ''
        ? url
        : 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3';

    await TrackPlayer.add({
      id: '1',
      url: tempUrl,
      type: 'default',
      title: description,
      album: description,
      artist: createdAt,
    });

    await TrackPlayer.play();
  };

  const slidingStarted = () => {
    setIsSeeking(true);
  };
  const slidingCompleted = async (value) => {
    await TrackPlayer.seekTo(0);
    setSliderValue(value);
    setIsSeeking(false);
  };

  const onButtonPressed = () => {
    if (!isPlaying) {
      startPlayer(url);

      setIsPlaying(true);
    } else {
      TrackPlayer.pause();
      setIsPlaying(false);
    }
  };

  const audioProgress = (value) => {
    setSliderValue(value);
  };

  useEffect(() => {
    const duration = TrackPlayer.getDuration();
    const position = TrackPlayer.getPosition();

    console.log(`${duration - position} seconds left.`);

    if (route.params) {
      setUrl(route.params.url);
      setDescription(route.params.description);

      setCreatedAt(route.params.createdAt);
    }
  });

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.background, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.musicContainer}>
              <Image
                style={styles.imgSongCover}
                source={{uri: 'https://via.placeholder.com/300'}}
              />

              <Text style={styles.title}>{title}</Text>
              <Text style={styles.author}>{author}</Text>

              <View style={styles.audioContainer}>
                <Slider
                  style={{width: '100%', height: 20, color: Color.primary}}
                  minimumValue={0}
                  maximumValue={1}
                  value={sliderValue}
                  trackStyle={styles.track}
                  thumbStyle={styles.thumb}
                  onSlidingStart={slidingStarted}
                  onValueChange={audioProgress}
                  onSlidingComplete={slidingCompleted}
                  minimumTrackTintColor="#A159E9"
                />
              </View>

              <View style={styles.musicBtns}>
                <Text style={styles.txtDuration}>0.00</Text>
                <FontAwesome
                  onPress={onButtonPressed}
                  style={styles.fontAudio}
                  name={'backward'}
                  size={25}
                />
                <FontAwesome
                  onPress={onButtonPressed}
                  style={styles.fontAudioPlay}
                  name={isPlaying ? 'pause' : 'play'}
                  color="white"
                  size={25}
                />

                <FontAwesome
                  onPress={onButtonPressed}
                  style={styles.fontAudio}
                  name={'forward'}
                  size={25}
                />

                <Text style={styles.txtDuration}>0.20</Text>
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default SongPlayer;

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

  musicContainer: {
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: '10%',
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: '5%',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },

  audioContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    // flex: 0.45,
    marginVertical: 10,
  },
  fontAudio: {
    display: 'flex',
    flexDirection: 'column',
    textAlignVertical: 'center',
    color: Color.whiteColor,
    marginHorizontal: 10,
  },

  fontAudioPlay: {
    display: 'flex',
    flexDirection: 'column',
    textAlignVertical: 'center',
    color: Color.whiteColor,
    marginHorizontal: 10,
    backgroundColor: Color.primary,
    padding: 20,
    borderRadius: 40,
  },

  track: {
    height: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.15,
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: '#f8a1d6',
    borderColor: '#a4126e',
    borderWidth: 5,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 2,
    shadowOpacity: 0.35,
  },
  musicBtns: {
    display: 'flex',
    flexDirection: 'row',
  },

  txtDuration: {
    color: '#d4d4d4',
    marginTop: 22,
    marginHorizontal: 20,
    fontSize: 16,
    fontWeight: 'bold',
  },

  imgSongCover: {
    width: 280,
    height: 300,
  },

  title: {
    color: 'white',
    fontSize: 25,
    marginTop: 40,
    fontWeight: 'bold',
  },

  author: {
    color: '#d4d4d4',
    fontSize: 15,
    marginTop: 10,
    fontWeight: '200',
  },
});
