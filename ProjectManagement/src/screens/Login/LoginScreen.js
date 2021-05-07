/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Image,
  Modal,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { withGlobalContext } from '../../GlobalContextProvider';
import { LoginERP } from '../../redux/action/authenticateAction/AuthenticateAction';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import { userProfile, userDemo, dataStatus } from '../../utility/config';
import {changeLanguage} from '../../redux/action/changeLanguage/ChangeLanguageAction'
import AuthenticateBusiness from '../../business/AuthenticateBusiness';
import AppText from '../../utility/AppText';

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      username:"",
      password: "",
      modalVisible: false,
      listAccount: []
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      androidClientId:
        '448328856317-tljc1acbdm9c5eq9qffp0dcv6qijknam.apps.googleusercontent.com', 
    });
    this.onGetListUser().then(list => {
      this.setState({listAccount: list});
    });

    this.props.changeLanguage('vi');
  }
  componentDidUpdate(prevProps) {
    if (this.props.user !== prevProps.user) {
      if (this.props.user.status === dataStatus.SUCCESS) {
        const { setSignin } = this.props.global;
        setSignin();
      }
      else {
        Alert.alert("Error", "Login Failed!")
      }
    }
  }
  
  //Modal
  onGetListUser = async () => {
    const listUser = await AsyncStorage.getItem('userInfo');
    if (listUser !== null) {
        return JSON.parse(listUser);
    } else {
        return [];
    }
};
  renderItem = ({ item }) => (
    <View style={{ paddingVertical:8, flexDirection: 'row', borderTopWidth: 1,borderColor:"#E5E5E5" }}>
      <Icon.Button
        size={25}
        name="user-circle"
        backgroundColor=""
        color="grey"
        style={{ marginTop: 4, marginLeft: 8, marginRight: 7 }}
      />
      <TouchableOpacity onPress={() => this.onHandModal(item)}>
        <Text style={{ fontSize: 17 }}>{item.name}</Text>
        <Text style={{ fontSize: 15, paddingTop: 2.5 }}>{item.url}</Text>
      </TouchableOpacity>
    </View>
  );
  onHandModal = e => {
    this.setState({
      username: e.name,
      url: e.url,
      modalVisible: false,
    });
  };

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });

  };
  setModalandclearInput = visible =>{
    this.setState({
      modalVisible: visible,
      url: "",
      username: "",
      password: ""
    })
  }
  // call login API
  onLogin = () => {
    //TODO: database ->dynamic.
    this.props.LoginERP(userProfile.db, this.state.username, this.state.password, this.state.url)
    
  };
  // check login
  changeText(value, type) {
    switch (type) {
      case 'url':
        this.setState({
          url: value,
        });
        break;
      case 'password':
        this.setState({
          password: value,
        });
        break;
      case 'username':
        this.setState({
          username: value,
        });
        break;
      default:
        break;
    }
  }

  // call google API
  async signIn() {
    const authenticate = new AuthenticateBusiness();
    await authenticate.signIn();
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={{ backgroundColor: '#FFFFFF', flex: 1 }}>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {/* header modal */}
              <Text
                style={{
                  fontSize: 20,
                  marginTop: 5,
                  paddingBottom: '3%',
                  color:"#555555",
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}>
                Accounts
              </Text>
              {/* body */}
              <View>
                <FlatList
                  data={this.state.listAccount}
                  renderItem={this.renderItem}
                  keyExtractor={(item, index) => `${index}`}
                />
              </View>
              {/* footer modal */}
              <View style={{ borderTopWidth: 1, alignItems: 'center',borderColor:"#E5E5E5" }}>
                <TouchableOpacity
                  style={{
                    backgroundColor: '#4876FF',
                    borderRadius: 10,
                    marginTop: '5%',
                    width: '70%',
                  }}
                  onPress={() => this.setModalandclearInput(!modalVisible)}>
                  <Text
                    style={{
                      fontSize: 20,
                      paddingTop: '3%',
                      marginBottom: '3%',
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    Other Account
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{position: "absolute", bottom:0,top:0,left:0,right:0,zIndex:1, backgroundColor:'rgba(0,0,0,0.5)'}} onTouchStart={() => this.setModalVisible(!modalVisible)} />
        </Modal>
        <View>
          <Image
            style={styles.imgStyle}
            source={require('../../Components/Images/xboss.png')}
          />
          <View style={styles.inputField} marginTop={'13%'}>
            <Icon.Button
              name="globe"
              backgroundColor=""
              color="grey"
              style={{ marginTop: 7, marginLeft: 15 }}
            />
            <TextInput
              name="url"
              style={styles.TextInput}
              placeholder="URL"
              onChangeText={value => this.changeText(value, 'url')}
              value={this.state.url}
              
            />
          </View>
          <View style={styles.inputField}>
            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
              <Icon
                name="user-circle"
                backgroundColor=""
                color="grey"
                size={20}
                style={{ marginTop: 15, marginLeft: 20 }}
              />
            </TouchableOpacity>

            <TextInput
              style={styles.TextInput}
              placeholder="User Name Email"
              value={this.state.username}
              onChangeText={value => this.changeText(value, 'username')}
            />
          </View>
          <View style={styles.inputField}>
            <Icon.Button
              name="lock"
              backgroundColor=""
              color="grey"
              style={{ marginTop: 7, marginLeft: 15 }}
            />
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              value={this.state.password}
              onChangeText={value => this.changeText(value, 'password')}
              secureTextEntry={true}
            />
          </View>

          {/* Login Button  */}
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity style={styles.BtnLogin} onPress={this.onLogin}>
              <AppText style={styles.loginText} i18nKey={'login'}>Login</AppText>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <GoogleSigninButton
              style={{ width: '80%', height: 48, marginTop: '5%' }}
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={this.signIn}
            />
          </View>
          <View
            style={{
              alignItems:'center',
              justifyContent:'center',
              marginTop: 15,
              marginHorizontal: 30,
              flexDirection: 'row',
            }}>
            <AppText style={{justifyContent : 'center'}} i18nKey={'forgetPassword'}>Forget password?</AppText>
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('ChangePasswordScreen')
              }>
              <AppText style={{color: 'blue' , marginLeft : 10 }} i18nKey={'resetPassword'}> {' '} Reset your password?</AppText>
            </TouchableOpacity>
          </View>
          {/* button google login */}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  imgStyle: {
    width: '90%',
    height: '16%',
    marginTop: '20%',
    marginLeft: '5%',
    marginBottom: '5%',
    resizeMode: 'stretch',
  },

  inputField: {
    marginTop: '5%',
    marginHorizontal: 30,
    borderColor: '#E5E5E5',
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
  },
  TextInput: {
    color: '#000000',
    borderColor: '#E5E5E5',
    borderRadius: 15,
    flex: 1,
    paddingRight: 50,
    textAlign: 'center',
  },
  BtnLogin: {
    width: '80%',
    backgroundColor: '#4876FF',
    marginTop: 30,
    marginHorizontal: 30,
    borderRadius: 15,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  //modal
  centeredView: {
    flex: 1,
    justifyContent: 'center'
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    elevation: 5,
    zIndex: 100
  },
  loginText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  }
});

function mapStateToProps(state) {
  return {
    user: state.AuthenticateReducer.user,
    language: state.ChangeLanguageReducer.language,
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { LoginERP , changeLanguage  })(LoginScreen),
);
