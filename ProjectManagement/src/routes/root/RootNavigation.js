import React from 'react';
import AuthenticationStack from '../authentication/AuthenticationStack';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigation from '../drawer/DrawerNavigation';
import { withGlobalContext } from '../../GlobalContextProvider'


class RootNavigation extends React.Component {
   
    render() {
        const Stack = createStackNavigator();
        const isSignin= this.props.global.isSignin
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>

                {isSignin ? (
                    <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} />
                ) : (
                    <Stack.Screen name="Authentication" component={AuthenticationStack} />
                )}
            </Stack.Navigator>
        );
    }
}
export default withGlobalContext(RootNavigation);

