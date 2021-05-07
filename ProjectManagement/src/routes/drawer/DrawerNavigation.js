import React, { Component } from "react";
import 'react-native-gesture-handler';
import ProjectScreenStack from '../dashboard/ProjectScreenStack'
import {TaskScreenStack} from '../dashboard/TaskScreenStack';
import DrawerContent from './DrawerContent'
import { createDrawerNavigator } from '@react-navigation/drawer';
import SettingScreenStack from '../dashboard/SettingScreenStack';
class DrawerNavigation extends React.Component {
  render() {
    const Drawer = createDrawerNavigator();
    return (
         <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
            <Drawer.Screen  name="Task" component={TaskScreenStack} />
            <Drawer.Screen name="Project" component={ProjectScreenStack} />
            
            <Drawer.Screen  name="Settings" component={SettingScreenStack} />
        </Drawer.Navigator>
    );
  }
}
export default DrawerNavigation;