/**
 * @format
 */
import PushNotification from 'react-native-push-notification';
import {AppRegistry, LogBox} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

LogBox.ignoreAllLogs();

AppRegistry.registerComponent(appName, () => App);

PushNotification.getChannels(function (channel_ids) {
  console.log(channel_ids); // ['channel_id_1']
});


PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  permissions: true,
  popInitialNotification: true,
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },


  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log('ACTION:', notification.action);
    console.log('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    console.error(err.message, err);
  },

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
});
