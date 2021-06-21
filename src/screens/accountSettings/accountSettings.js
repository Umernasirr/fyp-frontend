import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../../constants/Color';
import {useSelector} from 'react-redux';

const AccountSettings = ({navigation}) => {
  const user = useSelector((state) => state.auth.user);

  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSaveChanges = () => {
    //   Handle Save Changes
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
              <Text style={styles.heading}>Account Settings</Text>

              <View style={styles.card}>
                <View style={styles.cardItem}>
                  <Text>Full Name:</Text>
                  <TextInput
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>

                <View style={styles.cardItem}>
                  <Text>Email:</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                  />
                </View>

                <View style={styles.cardItem}>
                  <Text>Password:</Text>
                  <TextInput
                    secureTextEntry
                    placeholder="Enter Password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                  />
                </View>

                <View style={styles.cardItem}>
                  <Text>Confirm Password:</Text>
                  <TextInput
                    secureTextEntry
                    placeholder="Confirm Password"
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                </View>
              </View>
              <Button
                onPress={handleSaveChanges}
                color={Color.primary}
                mode="contained"
                style={styles.btn}>
                Save Changes
              </Button>

              <Button
                onPress={() => navigation.goBack()}
                color={Color.whiteColor}>
                Cancel
              </Button>
            </View>
          </ScrollView>
        </ImageBackground>
      </LinearGradient>
    </View>
  );
};

export default AccountSettings;

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
  card: {
    alignSelf: 'stretch',
    backgroundColor: Color.whiteColor,
    borderRadius: 10,
    marginVertical: 10,
  },

  cardItem: {
    padding: 10,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginLeft: 20,
    borderRadius: 10,
    backgroundColor: Color.bgLinear1,
  },
  btn: {
    padding: 15,
    margin: 20,
    borderRadius: 10,
  },
});
