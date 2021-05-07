import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import UserAvatar from 'react-native-user-avatar';
import common from '../../utility/common';



import { getListUserById,selectUserProject } from '../../redux/action/userAction/UserAction';
import {getListTaskOfProject} from '../../redux/action/taskAction/TaskAction'

import { getListUserByProject } from '../../redux/action/userAction/UserAction'


import { dataStatus } from "../../utility/config";
import MemberDetailItem from "../project/MemberScreen/MemberDetailItem"
import TaskOfProjectScreen from "../project/TaskOfProjectScreen"

class ProjectDetailScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      listTask:[],
      tab: '',

    }

  }
  componentDidMount() {
    this.props.getListUserById(this.props.projectDetail.data.members)
    this.props.getListTaskOfProject(this.props.projectDetail.data.tasks)
    
  }
  componentDidUpdate(prevProps) {
    if (this.props.listUser !== prevProps.listUser) {
      if (this.props.listUser.status === dataStatus.SUCCESS) {
        this.setState({
          members: this.props.listUser.data,
        })
       
      }
    }
  }
  switchTab = () => {
    switch (this.state.tab) {
      case 'Members':
        return <MemberDetailItem  />;
      case 'Task':
        return <TaskOfProjectScreen navigate={this.props.navigate} />;
      default:
        break;
    }
  };
  
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#ffff' }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: '2%' }}>
            <Text style={styles.text}>{this.props.projectDetail.data.name}</Text>
            <Text style={{ margin:"2%", fontSize: 15 }}>({this.props.projectDetail.data.project_status?.[1]??""})</Text>
          </View>
          <Text style={styles.text}>Project Manager: {this.props.projectDetail.data.user_id[1]}</Text>
          <Text style={styles.text}>Project Type: {this.props.projectDetail.data.type_id?.[1]??""}</Text>
          <View style={{flexDirection: 'row',justifyContent:'space-between'}}>
              <Text style={styles.text}>Members: {this.props.projectDetail.data.members.length} members</Text>
              <View >
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('MemberScreen',this.props.projectDetail.data)}>
                  <Icon
                    name="plus"
                    color="#00ff00"
                    size={25}
                    style={{marginTop:'25%', marginRight: 5}}
                  />
                </TouchableOpacity>
                </View>
          </View>
        </View>
        {/* Body */}
          <View style={styles.body}>
              <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={styles.button_tab}
                    onPress={() => this.setState({tab: 'Members'})}>
                    <Text style={{textAlign: 'center'}}>Members</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.button_tab}
                    onPress={() => this.setState({tab: 'Task'})}>
                    <Text style={{textAlign: 'center'}}>List Task</Text>
                  </TouchableOpacity>
              </View>
                {this.switchTab()}
        </View>  

      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    marginRight: 5,
    marginLeft: 5,
  },
  body: {
    margin:5,
    flex:1
  },
  text: {
    fontSize: 20,
    marginTop: 5
  },
  border: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 5,
    marginRight: 5,
    shadowColor: "#fff000",
    shadowOpacity: 1,
    shadowOffset: { height: 20 }
  },
  button: {
    width: 35,
    height: 35,
    borderRadius: 35 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4876FF",
    marginLeft: 5

  },
  button_tab: {
    borderWidth: 1,
    width: 100,
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
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  CheckList_Description: {
    borderWidth: 1,
    height: '100%',
    
  },
});
function mapStateToProps(state) {
  return {
    listUser: state.UserReducer.listUserById,
    listTaskOfProject: state.TaskReducer.listTaskOfProject,
    projectDetail: state.ProjectReducer.projectDetail
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { getListUserById,selectUserProject,getListTaskOfProject })(ProjectDetailScreen),
);
