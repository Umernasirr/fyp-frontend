import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Color from '../constants/Color';

import {useNavigation} from '@react-navigation/native';
const SongItem = ({title, author}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SongPlayer');
      }}
      style={styles.container}>
      <Image
        style={styles.img}
        source={{uri: 'https://via.placeholder.com/150'}}
      />
      <View style={styles.txtContainer}>
        <Text style={styles.txtTitle}>{title}</Text>
        <Text style={styles.txtAuthor}>{author}</Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}>
        <View style={styles.btnContainer}>
          <Feather
            style={styles.icon}
            name="heart"
            size={25}
            color={Color.primary}
          />
          <Feather
            style={styles.icon}
            name="play-circle"
            size={26}
            color={Color.whiteColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SongItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.primary,
    borderWidth: 1,
  },

  img: {width: 50, height: 50, borderRadius: 30},
  txtContainer: {
    marginHorizontal: 10,
  },
  txtTitle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  txtAuthor: {
    color: '#e4e4e4e4',
  },
  btnContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},

  icon: {
    marginHorizontal: 5,
  },
});
