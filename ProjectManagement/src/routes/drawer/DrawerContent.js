import axios from 'axios';
import React from 'react';
import {
  Linking,
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import IconOcticons from 'react-native-vector-icons/Octicons';
import UserAvatar from 'react-native-user-avatar';
import {withGlobalContext} from '../../GlobalContextProvider';
import {connect} from 'react-redux';
import {logout} from '../../redux/action/authenticateAction/AuthenticateAction';
import {getListTask} from '../../redux/action/getTaskAction/getTaskAction';
import {dataStatus, userProfile} from '../../utility/config';
import { LoginERP } from '../../redux/action/authenticateAction/AuthenticateAction';
import AppText from '../../utility/AppText';

export class DrawContentContent extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate(prevProps) {
    if (this.props.logoutStatus !== prevProps.logoutStatus) {
      if (this.props.logoutStatus.status === dataStatus.SUCCESS) {
        const {setSignin} = this.props.global;
        setSignin();//TODO:???
      } else {
        Alert.alert('Logout Failed!');
      }
    }
  }
  onhandleHelps = () => {
    Linking.openURL('https://www.xboss.com');
  };
  onhandleLogout = () => {
    this.props.logout();
  };
  goToTaskScreen = () => {
    this.props.navigation.navigate('Task');
  };
    goToProjectScreen = async () => {
      this.props.navigation.navigate('Project');
    };
  render() {

    return (
      <View style={{flex: 1}}>
        {/* header */}
        <View>
          <UserAvatar style={{marginTop:5}} size={100} bgColors={['#ffff']} name="Avishay Bar" src={this.props.user.avatar} />
          <Text style={styles.headerText}>{userProfile.company}</Text>
          <Text
            style={{
              marginTop: 10,
              textAlign: 'center',
              fontStyle: 'italic',
              marginBottom: 15,
            }}>
            {userProfile.username}{' '}
          </Text>
        </View>
        {/* body */}
        <View style={styles.body}>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.goToProjectScreen}>
              <IconOcticons
                name="project"
                backgroundColor=""
                color="grey"
                size={30}
                style={{marginLeft: 10}}
              />
              <AppText style={{fontSize: 20, marginLeft: 15,marginTop:"1%"}} i18nKey={'projectDrawer'}></AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.bodyText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.goToTaskScreen}>
              <Icon
                name="tasks"
                backgroundColor=""
                color="grey"
                size={30}
                style={{marginLeft: 10}}
              />
           
              <AppText style={{fontSize: 20, marginLeft: 15,marginTop:"1%"}} i18nKey={'taskDrawer'} ></AppText>
            </TouchableOpacity>
          </View>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <View style={styles.footerText}>
                <TouchableOpacity
                  style={styles.touch}
                  onPress={() => this.props.navigation.navigate('Settings')}>
                  <Icon
                    name="cog"
                    backgroundColor=""
                    color="grey"
                    size={25}
                    style={{marginLeft: 10}}
                  />
                  <AppText style={{fontSize: 15, marginLeft: 15,marginTop:"1%"}} i18nKey={'settingDrawer'}></AppText>
                </TouchableOpacity>
          </View>
          <View style={styles.footerText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.onhandleHelps}>
              <Icon
                name="question-circle"
                backgroundColor=""
                color="grey"
                size={25}
                style={{marginLeft: 10}}
              />
              <AppText style={{fontSize: 15, marginLeft: 15,marginTop:"1%"}} i18nKey={'helpDrawer'}></AppText>
            </TouchableOpacity>
          </View>
          <View style={styles.footerText}>
            <TouchableOpacity
              style={styles.touch}
              onPress={this.onhandleLogout}>
              <Icon
                name="sign-out-alt"
                backgroundColor=""
                color="grey"
                size={25}
                style={{marginLeft: 10}}
              />
              <AppText  style={{fontSize: 15, marginLeft: 15,marginTop:"1%"}} i18nKey={'logoutDrawer'}></AppText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    flex: 2,
  },
  body: {
    borderTopWidth: 1,
    flex: 4,
  },
  footer: {
    flex: 2,
    borderTopWidth: 1,
  },
  footerText: {
    marginTop: "7%",
    marginHorizontal: 1,
    flexDirection: 'row',
  },
  bodyText: {
    marginTop: 15,
    marginHorizontal: 1,
    flexDirection: 'row',
  },
  headerText: {
    marginTop: 5,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  touch: {
    flexDirection: 'row',
    backgroundColor: '#FFFF',
    width: '100%',
    textAlign: 'center',
  },
});

function mapStateToProps(state) {
  return {
    logoutStatus: state.AuthenticateReducer.logoutStatus,
    user: state.AuthenticateReducer.user.data
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {logout,LoginERP})(DrawContentContent),
);
