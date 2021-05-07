import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../../screens/Login/LoginScreen'
import ChangePasswordScreen from '../../screens/Login/ChangePasswordScreen';
import SettingScreen from '../../screens/setting/SettingScreen'
export default class AuthenticationStack extends React.Component
{   
    render(){
        const Stack = createStackNavigator();
        return (   
            <Stack.Navigator >
                <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} 
                options={{
                        title: 'Reset Password',
                        headerStyle: {
                        backgroundColor: '#61dafb', 
                        },
                        headerTintColor: '#fff',
                        headerTitleStyle: {
                        fontWeight: 'bold',
                        },
                    }} />
                <Stack.Screen name ="Settings" component={SettingScreen}/>
            </Stack.Navigator>
        );
    }
};