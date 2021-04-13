import {StyleSheet} from 'react-native';
import Theme from '../../helper/theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    maxWidth: 315,
    width: 315,
    backgroundColor: Theme.colors.secondary,
    borderRadius: 15,
    padding: 20,
    // alignItems: 'center',
    overflow: 'hidden',
  },
  loader:{
    marginTop:20
  },
  content: {
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 57,
    height: 57,
    marginTop: 10,
    marginBottom: 20,
  },
  logoIcon: {
    width: 101,
    height: 44,
    marginTop: 10,
    marginBottom: 20,
  },
  text: {
    textAlign: 'center',
    color: Theme.colors.dark,
    fontSize: 18,
    fontFamily: Theme.font.regular,
  },
  text2: {
    textAlign: 'center',
    color: Theme.colors.primary,
    fontSize: 18,
    fontFamily: Theme.font.bold,
  },
  buttonContainerStyle: {
    flexDirection: 'column',
    width: '100%',
  },
  buttons: {
    flexDirection: 'row',
    marginTop: 10,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  buttonStyle: {
    flex: 0,
    height: 45,
    backgroundColor: Theme.colors.primary,
    width: '100%',
    borderRadius: 42 / 2,
    marginTop: 10,
  },
  buttonTextStyle: {
    color: Theme.colors.secondary,
    fontSize: 14,
    fontFamily: Theme.font.regular,
  },
  buttonText: {
    color: Theme.colors.primary,
    fontSize: 20,
    fontFamily: Theme.font.regular,
  },
});
