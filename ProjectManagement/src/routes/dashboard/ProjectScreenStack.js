import 'react-native-gesture-handler';
import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import ProjectScreen from '../../screens/project/ProjectScreen';
import ProjectDetailScreen from '../../screens/project/ProjectDetailScreen';
import NewProjectScreen from '../../screens/project/NewProjectScreen';
import MemberScreen from '../../screens/project/MemberScreen'
import ProjectEditorScreen from '../../screens/project/ProjectEditorScreen'
import Icon from 'react-native-vector-icons/FontAwesome';
import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';


const Stack = createStackNavigator();
const NavigationDrawerStructureLeft = (props) => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 30, height: 30, marginLeft: 10,}}
        />
      </TouchableOpacity>
    </View>
  );
};
const EditProjectButton = props => {
  const onEditProject = () => {
    props.navigationProps.navigate('ProjectEditorScreen');
  };
  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onEditProject}>
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
class ProjectScreenStack extends React.Component {

    render(){
        return (
          <Stack.Navigator>
                <Stack.Screen
                    name="Project"
                    component={ProjectScreen}
                    options={{
                    title:'Project',
                    headerLeft: () => (
                        <NavigationDrawerStructureLeft navigationProps={this.props.navigation} />
                    ),
                    headerStyle: {
                    backgroundColor: '#61dafb',
                  },
                  headerTintColor: '#ffff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                    
                    }}
                />
                <Stack.Screen name="ProjectDetailScreen" component={ProjectDetailScreen} 
                    options={{
                    title: this.props.projectDetail.data.name,
                    headerRight: () => (
                <EditProjectButton navigationProps={this.props.navigation} />
                ),
                     headerStyle: {
                    backgroundColor: '#61dafb',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
                    
                    }} />
                <Stack.Screen name="NewProjectScreen" 
                     component ={NewProjectScreen}
                    options={{
                    title: 'New Project',
                     headerStyle: {
                      backgroundColor: '#61dafb',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                      fontWeight: 'bold',
                    },
                    }}
                />
                <Stack.Screen name="MemberScreen" 
                     component ={MemberScreen}
                />
                <Stack.Screen name="ProjectEditorScreen" 
                     component ={ProjectEditorScreen}
                />
                </Stack.Navigator>
            );
    }
            
}
function mapStateToProps(state) {
  return {
    projectDetail: state.ProjectReducer.projectDetail
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { })(ProjectScreenStack),
);