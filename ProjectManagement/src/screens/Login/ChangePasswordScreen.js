import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';
import ResetPass from '../../business/ResetPassBusiness';
export default class ChangePasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {username: '', url: '', loading: false};
  }
  onGoBack = () => {
    this.props.navigation.goBack();
  };

  changeText(value, type) {
    if (type === 'username') {
      this.setState({username: value});
    } else {
      this.setState({url: value});
    }
  }

  // call API reset pass
  resetPassword = async () => {
    if (this.state.username === '' || this.state.url === '') {
      alert('Please input username and url');
      return;
    }
    this.setState({
      loading: true,
    });

    const resetPass = new ResetPass();
    const test = await resetPass
      .resetPass({username: this.state.username})
      .then(res => {
        if (res.data.result.error) {
          console.log(res.data.result.error);
          alert('Invalid username');
        } else {
          alert('Your pasword is reset');
        }
      });

    this.setState({
      loading: false,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center', flex: 5}}>
          <AnimatedLoader
            visible={this.state.loading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../../Components/Json/loading.json')}
            animationStyle={styles.lottie}
            speed={0.25}
            loop
          />

          <Text style={{fontSize: 30, margin: 30}}> Reset Password </Text>
          <View style={styles.InputField}>
            <Icon.Button
              name="globe"
              backgroundColor=""
              color="grey"
              style={{marginTop: 7, marginLeft: 15}}
            />
            <TextInput
              name="url"
              style={styles.TextInput}
              placeholder="URL"
              onChangeText={value => this.changeText(value, 'url')}
              defaultValue="https://"
            />
          </View>
          <View style={styles.InputField}>
            <Icon.Button
              name="user-circle"
              backgroundColor=""
              color="grey"
              style={{marginTop: 7, marginLeft: 15}}
            />
            <TextInput
              name="url"
              style={styles.TextInput}
              placeholder="Input username or Email"
              onChangeText={value => this.changeText(value, 'username')}
            />
          </View>

          {/* Login Button  */}
          <TouchableOpacity
            style={styles.BtnChangePass}
            onPress={this.resetPassword}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 20}}>
              Reset Password
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  InputField: {
    marginTop: 15,
    marginHorizontal: 30,
    borderColor: 'black',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
  },
  TextInput: {
    borderColor: 'black',
    borderRadius: 15,
    flex: 1,
    paddingRight: 50,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  BtnChangePass: {
    backgroundColor: 'blue',
    marginTop: 30,
    marginHorizontal: 30,
    borderRadius: 15,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    width: '83%',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
});
