import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Color from '../constants/Color';

import {useNavigation} from '@react-navigation/native';
const UserItem = ({name, createdAt, gender}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Home');
      }}
      style={styles.container}>
      <Image
        style={styles.img}
        source={{uri: 'https://via.placeholder.com/150'}}
      />
      <View style={styles.txtContainer}>
        <Text style={styles.txtTitle}>{name?.toUpperCase()}</Text>
        <Text style={styles.txtDetails}>{createdAt}</Text>
        <Text style={styles.txtDetails}>{gender}</Text>
      </View>

      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}>
        <View style={styles.btnContainer}>
          <Ionicons
            style={styles.icon}
            name="chevron-forward"
            size={30}
            color={Color.purple}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: Color.primary,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
  },

  img: {
    width: 50,
    height: 50,
    borderRadius: 30,
    borderColor: Color.background,
    borderWidth: 1,
  },
  txtContainer: {
    marginHorizontal: 10,
  },
  txtTitle: {
    color: Color.purple,

    fontWeight: 'bold',
    fontSize: 16,
  },
  txtDetails: {
    color: Color.background,
  },
  btnContainer: {flex: 1, flexDirection: 'row', alignItems: 'center'},

  icon: {
    marginHorizontal: 5,
  },
});
