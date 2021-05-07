import React, { Component } from "react";

import Icon from 'react-native-vector-icons/FontAwesome';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, SafeAreaView,SectionList } from 'react-native';


import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';
import { getProjectByCompany, getDetailProject,getProjectByStatus,searchProject } from '../../redux/action/projectAction/ProjectAction'
import { dataStatus } from "../../utility/config";
import UserBusiness from '../../business/UserBusiness'
class ProjectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      project_list: [],
      showX: false,
      global_search: null,
    }


  }

  componentDidMount() {
   
    this.props.getProjectByStatus()
    
  }
  componentDidUpdate(prevProps) {
    if (this.props.listProjectByStatus !== prevProps.listProjectByStatus) {
      if (this.props.listProjectByStatus.status === dataStatus.SUCCESS) {
        this.setState({ project_list: this.props.listProjectByStatus.data })
      }
    }
    if(this.props.projectDetail !== prevProps.projectDetail)
    {
      if(this.props.projectDetail.status === dataStatus.SUCCESS)
      {
        this.props.navigation.navigate('ProjectDetailScreen')
      
      }
    }
  }
  handleSearch = value => {
    if(value ===""|| !value)
    {
      this.props.getProjectByStatus()
      this.setState({global_search:value,showX:false});
    }
    else{
      this.setState({global_search: value,showX:true});
      this.props.searchProject(value)
    }
  };
  
  ToDetail=({item})=>
  {
    this.props.getDetailProject(item.id)
    
  }
  renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => this.ToDetail({item})}>
      <View style={styles.body}>
        <View style={{ margin:"2%"}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: '1%' ,flex:1}}>
            <Text style={styles.label_projectName}>{item.name}</Text>
          </View>
          <Text style={styles.label_projectManager}>( {item.user_id[1]} )</Text>
          <Text style={{ fontSize: 17 }}>{item.task_count} task</Text>
          {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ fontSize: 17 }}>All task:</Text>
          <Text style={{ fontSize: 17 ,color:'red'}}>10 doing</Text>
          <Text style={{ fontSize: 17 ,color:'red'}}>20 done</Text>
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
  render() {
    
    return (
      <View style={{ backgroundColor: '#e5e5e5', flex: 1 }}>
        <View style={styles.inputField}>
          <View style={{justifyContent:"center",marginLeft: "2%"}}>
              <Icon
              name="search"
              backgroundColor=""
              color="grey"
              size={22}
              
            />

          </View>         
          <TextInput
            name="search"
            style={styles.TextInput}
            placeholder="Project Name"
            value={this.state.global_search}
            onChangeText={value=>this.handleSearch(value)}
          />
            <View>
          {this.state.showX ? (<TouchableOpacity onPress={()=> this.handleSearch("") }>
            <Icon
              name="times"
              backgroundColor=""
              color="grey"
              size={20}
              style={{ marginTop: 9, marginRight: 7 }}
            />
          </TouchableOpacity>):null}
        </View>
        </View>
      
        <View style={{ flex: 1 }}>
          <SafeAreaView>
            <SectionList
              sections={this.state.project_list}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
              renderSectionHeader={({ section: { title } }) => (
              <Text style={{fontSize: 25,margin:1,textAlign:'center',color:"#ff6666"}}>{title}</Text>
              )}
            />
          </SafeAreaView>
        </View>

        {/* <ActionButton buttonColor='rgba(231,76,60,1)' onPress={() => this.props.navigation.navigate('NewProjectScreen')} /> */}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  body: {
    elevation: 1,
    margin:2,
    backgroundColor: '#ffff',
    borderColor: '#e5e5e5',
    borderRadius: 5,
  },
  label_projectName: {
    fontSize: 20, fontWeight: 'bold', color: "#595959"
  },
  label_projectManager: {
    fontSize: 17, marginBottom: '2%', fontStyle: 'italic',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  inputField: {
    margin:"1%",
    borderColor: '#e5e5e5',
    borderRadius: 5,
    elevation: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor:"#ffff"

  },
  TextInput: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    paddingRight: 15,
  },
});
function mapStateToProps(state) {
  return {
    listProject: state.ProjectReducer.listProject,
    user: state.AuthenticateReducer.user,
    listProjectByStatus: state.ProjectReducer.listProjectByStatus,
    projectDetail: state.ProjectReducer.projectDetail
  
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { getProjectByCompany, getDetailProject,getProjectByStatus ,searchProject})(ProjectScreen),
);
