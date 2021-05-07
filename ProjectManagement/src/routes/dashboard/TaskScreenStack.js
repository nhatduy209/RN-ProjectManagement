import 'react-native-gesture-handler';

import * as React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {createStackNavigator, HeaderBackground} from '@react-navigation/stack';
import TaskScreen from '../../screens/task/TaskScreen/TaskScreen';
import TaskDetailScreen from '../../screens/task/TaskDetailScreen';
import NewTaskScreen from '../../screens/task/NewTaskScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import TaskEditor from '../../screens/task/TaskEditor';

//TODO: Restructures this file.
const Stack = createStackNavigator();

const NavigationDrawerStructureLeft = props => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.openDrawer();
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};
const NavigationDrawerStructureRight = props => {
  const onNewTask = () => {
    props.navigationProps.navigate('NewTaskScreen');
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onNewTask}>
        <Icon
          name="plus"
          color="#ff9900"
          size={30}
          style={{width: 25, height: 25, marginRight: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};




const EditTaskButton = props => {
  const onEditTask = () => {
    props.navigationProps.navigate('EditTaskScreen');
    
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onEditTask}>
        <Icon
          name="edit"
          color="#ff9900"
          size={30}
          style={{width: 30, height: 30, marginRight: 10}}
        />
      </TouchableOpacity>
    </View>
  );
};

export class TaskScreenStack extends React.Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="TaskScreen"
          component={TaskScreen}
          options={{
            title: 'Task Screen', //Set Header Title
            headerLeft: () => (
              <NavigationDrawerStructureLeft
                navigationProps={this.props.navigation}
              />
            ),
            headerRight: () => (
              <NavigationDrawerStructureRight
                navigationProps={this.props.navigation}
              />
            ),
            headerStyle: {
              backgroundColor: '#61dafb', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="TaskDetailScreen"
          component={TaskDetailScreen}
          options={({route}) => ({
            title: route.params.name,
            headerStyle: {
              backgroundColor: '#61dafb',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerRight: () => (
              <EditTaskButton navigationProps={this.props.navigation} />
            ),
          })}
        />
        <Stack.Screen
          name="NewTaskScreen"
          component={NewTaskScreen}
        />
         <Stack.Screen
          name="EditTaskScreen"
          component={TaskEditor}
        />
      </Stack.Navigator>
    );
  }
}
