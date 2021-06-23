import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Platform,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {Button, Searchbar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import PostItem from '../../components/PostItem';
import CreatePostModal from '../../components/CreatePostModal';
import {service} from '../../services/service';
import {deleteVibes, getVibes} from '../../store/actions/Vibe';
const Feed = ({vibes, getVibes, deleteVibes, navigation, route}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [postsList, setPostsList] = useState([]);
  const [openPostModal, setOpenPostModal] = useState(false);
  const [isDeleted, setisDeleted] = useState(false);
  const [isFav, setisFav] = useState(false);


  console.log(vibes[0]);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };
  const deleteVibe = (id) => {
    service
      .deleteVibe(id)
      .then((data) => {
        deleteVibes({vibeId: id});
        setisDeleted(!isDeleted);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    service
      .getVibes()
      .then((data) => {
        if (data.data.success) {
          getVibes(data.data.data);
          setPostsList(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setPostsList(vibes);
  }, [route, navigation, isDeleted]);

  const AllPostHandler = () => {
    service
      .getVibes()
      .then((data) => {
        if (data.data.success) {
          setisFav(false)
          getVibes(data.data.data);
          setPostsList(data.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const FavHandler = () => {
    service
    .getFav()
    .then((data) => {
      if (data.data.success) {
        setisFav(true);
        getVibes(data.data.data);
        setPostsList(data.data.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[Color.linearColor1, Color.linearColor2]}
        style={styles.Linear}>
        <ImageBackground
          source={require('../../assets/images/background_texture.png')}
          style={styles.image}>
          {postsList && postsList.length > 0 ? (
            <View style={styles.marginContainer}>
              <Searchbar
                style={{borderRadius: 20, marginVertical: 20}}
                placeholder="Search"
                onChangeText={onChangeSearch}
                value={searchQuery}
              />
              <View style={styles.actionButtons}>
                <Button
                  mode="contained"
                  color={Color.whiteColor}
                  onPress={() => setOpenPostModal(true)}>
                  Create New Post
                </Button>
                
              </View>
              <View style={styles.actionButtons}>
                <Button
                  mode="contained"
                  color={!isFav ? Color.bgLinear2 : Color.whiteColor}
                  onPress={AllPostHandler}>
                 All Post
                </Button>
                <Button mode="contained" color={isFav ? Color.bgLinear2 : Color.whiteColor} onPress={FavHandler} >Favorities</Button>
                
              </View>
              <FlatList
                style={styles.songsList}
                ItemSeparatorComponent={
                  Platform.OS !== 'android' &&
                  (({highlighted}) => (
                    <View
                      style={[styles.separator, highlighted && {marginLeft: 0}]}
                    />
                  ))
                }
                keyExtractor={(item) => item._id.toString()}
                data={postsList}
                renderItem={({item}) => (
                  <PostItem
                    title={item.title}
                    caption={item.caption}
                    createdAt={item.createdAt}
                    user={item.user}
                    vibeId={item._id}
                    likes={item.likes}
                    comments={item.comments}
                    format={item.format}
                    url={item.url}
                    deleteVibe={deleteVibe}
                    avatar={item.user.avatar}
                    resource_type={item.resource_type}
                    favorites={item.favorites}
                  />
                )}
              />
            </View>
          ) : (
            <View style={styles.actionButtons}>
              <Button
                mode="contained"
                color={Color.whiteColor}
                onPress={() => setOpenPostModal(true)}>
                Create New Post
              </Button>
            </View>
          )}
        </ImageBackground>
      </LinearGradient>

      {openPostModal && (
        <CreatePostModal
          visible={openPostModal}
          setVisible={setOpenPostModal}
        />
      )}
    </View>
  );
};

const mapStateToProps = (state) => ({
  vibes: state.vibe.vibes,
});

export default connect(mapStateToProps, {getVibes, deleteVibes})(Feed);

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
    flex: 1,
    marginTop: 20,
    marginHorizontal: '2%',
  },
  heading: {
    fontSize: 30,
    color: Color.whiteColor,
    margin: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
});
