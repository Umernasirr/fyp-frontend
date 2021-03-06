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
import {useTrackPlayerProgress} from 'react-native-track-player/lib/hooks';

const SongPlayer = ({navigation, route}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSeeking, setIsSeeking] = useState(false);
  const [seek, setSeek] = useState(0);
  const [url, setUrl] = useState('');
  const [caption, setCaption] = useState('');
  const [isInit, setIsInit] = useState(false);
  const {position, duration} = useTrackPlayerProgress();

  const [user, setUser] = useState({});

  const startPlayer = async (url) => {
    // Set up the player

    if (!isInit) {
      console.log('Initiating Track Player');
      console.log(url);
      await TrackPlayer.setupPlayer();

      // Add a track to the queue
      const tempUrl =
        url !== ''
          ? url
          : 'http://res.cloudinary.com/dkmctcivw/video/upload/v1624572861/jpyds8zwgzmrgrdh0emr.wav';

      await TrackPlayer.add({
        id: '1',
        url: tempUrl,
        type: 'default',
        title: caption,
        artist: user.name,
      });
      setIsInit(true);
    }
    await TrackPlayer.play();
  };

  const slidingCompleted = async (value) => {
    TrackPlayer.seekTo(value);
    setSeek(value);

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
    TrackPlayer.pause();
    setIsSeeking(true);
    setSeek(value);
  };

  useEffect(() => {
    if (route.params) {
      setUrl(route.params.url);
      setCaption(route.params.caption);
      setUser(route.params.user);
      // setCreatedAt(route.params.createdAt);
    }
  }, []);

  useEffect(() => {
    if (!isSeeking && position && duration) {
      setSeek(position);
    }
  }, [position, duration]);

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
                source={{
                  uri:
                    'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
                }}
              />

              <Text style={styles.title}>{user.name}</Text>
              <Text style={styles.author}>{caption}</Text>

              <View style={styles.audioContainer}>
                <Slider
                  style={{width: '100%', height: 20}}
                  minimumValue={0}
                  maximumValue={duration}
                  value={seek}
                  trackStyle={styles.track}
                  thumbStyle={styles.thumb}
                  onValueChange={audioProgress}
                  onSlidingComplete={slidingCompleted}
                  minimumTrackTintColor="#A159E9"
                />
              </View>

              <View style={styles.musicBtns}>
                <Text style={styles.txtDuration}>{position.toFixed(2)}</Text>
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

                <Text style={styles.txtDuration}>{duration.toFixed(2)}</Text>
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
    borderWidth: 3,
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
