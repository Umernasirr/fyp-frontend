import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Color from '../constants/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Header = ({navigation, title, back = true}) => {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        {back && <AntDesign name="arrowleft" color="white" size={30} />}
        <Text style={styles.title}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Color.primary,
    height: 60,
  },

  header: {
    marginHorizontal: 10,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: 'white',
    fontSize: 26,
    padding: 20,
    fontWeight: 'bold',
  },
});
