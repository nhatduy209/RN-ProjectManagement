import React, { Component } from "react";
import Swipeable from 'react-native-gesture-handler/Swipeable'
import Icon from 'react-native-vector-icons/FontAwesome';
import UserAvatar from 'react-native-user-avatar';
import common from '../../../utility/common';
import { withGlobalContext } from '../../../GlobalContextProvider';
import { connect } from 'react-redux';
import { editProject } from '../../../redux/action/projectAction/ProjectAction'
import { dataStatus,userProfile } from "../../../utility/config";
import { getProjectByCompany,getDetailProject } from '../../../redux/action/projectAction/ProjectAction'
import {getAllProjectType} from '../../../redux/action/projectTypeAction/ProjectTypeAction'
import {getListUserByCompany} from '../../../redux/action/userAction/UserAction'

import { View, Text, TouchableOpacity, FlatList, StyleSheet,Animated , TextInput, SafeAreaView } from 'react-native';


class MemberDetailItem extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      listMembers:this.props.listUser.data,
     
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.editStatus !== prevProps.editStatus)
    {
      if(this.props.editStatus.status === dataStatus.SUCCESS){
        
        this.props.getDetailProject(this.props.projectDetail.data.id)
      }
    }
    
  }
 
  removedMember =(id)=>
  {
    const data=[]
    const data_2 =this.props.listUser.data
    for( var i = 0; i < data_2.length; i++){ 
        if ( data_2[i].id === id) {
          data_2.splice(i, 1); 
        }
    }
    data_2.forEach(element => {
      data.push(element.id)
    });
    const member ={
      members:[[6,false,data]]
    }
    this.setState({listMembers:data_2})
    this.props.editProject(this.props.projectDetail.data.id,member)
  
  }
  
  render() {
   const renderItem = ({ item }) => {
    const leftSwipe=()=>
      {
          return(
          <View style ={styles.deleteBox}>
          
              <TouchableOpacity onPress={()=>this.removedMember(item.id)}   >
                        <Icon size={25} name="trash" color="#ffff" />
              </TouchableOpacity>
          </View>
          )
      } 
  return(
      <Swipeable renderRightActions={leftSwipe} >   
        <View style={styles.border}>
          <View style={{  marginBottom: 5, flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', flex:1}}>
                <View style={{margin:"2%"}}>
                  <UserAvatar  
                  size={50} bgColors={['#ffff']} 
                  name="Avishay Bar" 
                  src={common.getUserAvartar(item.id)}
                />
                </View>
                {/* test Data */}
                <View style={{flex:1}} >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ fontSize: 17 }}>{item.name}</Text>
                    </View>

                    <View>
                      <Text style={{ fontSize: 12, paddingTop: '2%', }}>{item.email}</Text>
                    </View>
                </View>
              </View>

              <View style={{ flexDirection: 'row', marginTop: 5, marginRight: 10 }}>
                <View style={styles.button}>
                  <Icon size={20} name="phone" color="#ffff" />
                </View>
                <View style={styles.button}>
                  <Icon size={20} name="comment" color="#ffff" />
                </View>
                <View style={styles.button}>
                  <Icon size={18} name="envelope-open" color="#ffff" />
                </View>
              </View>
            </View>
        </View>
      </Swipeable>

      )
  
  };
    return (
      <View style={styles.CheckList_Description}>
          <View style={{flex:1}}>
            
          <SafeAreaView>
                  <FlatList
                    data={this.state.listMembers}
                    renderItem={renderItem}
                    keyExtractor={(item,index) => index.toString()}
                  />
          </SafeAreaView>
          </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    editStatus: state.ProjectReducer.editStatus,
    listUser: state.UserReducer.listUserById,
    projectDetail: state.ProjectReducer.projectDetail
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { editProject, getDetailProject})(MemberDetailItem),
);



const styles = StyleSheet.create({
  header: {
    marginRight: 5,
    marginLeft: 5,
  },
  body: {
    margin:5
  },
  text: {
    fontSize: 20,
    marginTop: 5
  },
  border: {
    borderBottomWidth:1,
  },
  button: {
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4876FF",
    marginLeft: 5

  },
  CheckList_Description: {
    borderWidth: 1,
    flex:1
  },
  deleteBox:{
    backgroundColor:'red',
    justifyContent:'center',
    alignItems:'center',
    width:"18%",
    height:"100%",
    borderBottomWidth:1
  }
});