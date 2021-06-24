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
import {useSelector, connect} from 'react-redux';
import {service} from '../../services/service';
import {updateUser} from '../../store/actions/Auth';

const AccountSettings = ({navigation, updateUser}) => {
  const user = useSelector((state) => state.auth.user);

  const [fullName, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [desc, setDesc] = useState(user.description || '');

  const [password, setPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleUpdateHandler = () => {
    const user1 = {...user, name: fullName, description: desc};

    service
      .updateUser(user1)
      .then((data) => {
        if (data.data.success) {
          alert('data updated successfully');
          updateUser(data.data.data);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleSaveChanges = () => {
    //   Handle Save Changes
    if (confirmPassword !== password) {
      alert('Password and confirm password dont match');
    } else if (confirmPassword.length < 7) {
      alert('please type in password');
    } else {
      service
        .updatePassword({currentPassword, newPassword: password})
        .then((data) => {
          if (data.data.success) {
            alert('Password changed successfully');
            setCurrentPassword('');
            setPassword('');
            setConfirmPassword('');
          } else {
            alert(data.data.error);
          }
        })
        .catch((err) => console.log(err));
    }
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
                  <Text>Description:</Text>
                  <TextInput
                    style={styles.input}
                    value={desc}
                    onChangeText={setDesc}
                  />
                </View>

                <View style={styles.cardItem}>
                  <Text>Email:</Text>
                  <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    editable={false}
                  />
                </View>
              </View>

              <Button
                onPress={handleUpdateHandler}
                color={Color.primary}
                style={styles.btn}>
                Save Changes
              </Button>

              <View style={styles.card}>
                <View style={styles.cardItem}>
                  <Text>Current Password:</Text>
                  <TextInput
                    secureTextEntry
                    placeholder="Enter Password"
                    style={styles.input}
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
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
                style={styles.btn}>
                Reset Password
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

export default connect(null, {updateUser})(AccountSettings);

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
    fontSize: 26,
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
    marginHorizontal: 40,
    marginVertical: 10,
    borderRadius: 10,
  },
});
