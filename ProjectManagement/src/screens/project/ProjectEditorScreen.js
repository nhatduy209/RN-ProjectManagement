import React, { Component } from "react";
import {  View ,Text, TextInput,StyleSheet,TouchableOpacity, Modal,SafeAreaView,FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';
import { editProject } from '../../redux/action/projectAction/ProjectAction'
import { dataStatus,userProfile } from "../../utility/config";
import { getDetailProject,getProjectByStatus } from '../../redux/action/projectAction/ProjectAction'
import {getAllProjectType} from '../../redux/action/projectTypeAction/ProjectTypeAction'
import {getListUserByCompany} from '../../redux/action/userAction/UserAction'



class ProjectEditorScreen extends React.Component
{
    constructor(props){
    super(props);
    this.state={
        projectId: this.props.projectDetail.data.id,
        projectName:this.props.projectDetail.data.name,
        projectManager:this.props.projectDetail.data.user_id,
        projectType:this.props.projectDetail.data.type_id,
        listManager:[],
        listType:[],
        modalOfManager: false,
        modalOfType: false,
        showX: false,
        global_search:""
        // this.props.route.params.ProjectDetail.user_id
    }
  }
  componentDidMount(){
    this.props.navigation.setOptions({
      title: 'Edit Project',
      headerStyle: {
        backgroundColor: '#61dafb',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.EditProject} >
            <Text style={{ marginRight: 10, fontSize: 20, color:"#ffff" }}>Save</Text>
          </TouchableOpacity>
        </View>
      ),
    })
    this.props.getAllProjectType()
    this.props.getListUserByCompany(userProfile.companyId)

  }
  componentDidUpdate(prevProps){
    if (this.props.listManager !== prevProps.listManager) {
      if (this.props.listManager.status === dataStatus.SUCCESS) {
        this.setState({ listManager: this.props.listManager.data })
      }
    }
    if (this.props.listType !== prevProps.listType) {
      if (this.props.listType.status === dataStatus.SUCCESS) {
        this.setState({ listType: this.props.listType.data })
      }
    }
    if(this.props.editStatus !== prevProps.editStatus)
    {
      if(this.props.editStatus.status === dataStatus.SUCCESS)
      {    
        this.props.getDetailProject(this.state.projectId)
      }
    }
    if(this.props.projectDetail !== prevProps.projectDetail)
    {
      if(this.props.projectDetail.status === dataStatus.SUCCESS)
      {
        this.props.getProjectByStatus();
        this.props.navigation.navigate('ProjectDetailScreen');
      }
    }
  }
  EditProject=()=>{
    const editdata={
      "name":this.state.projectName,
      "user_id": this.state.projectManager[0],
      "type_id":this.state.projectType[0]
    }
    this.props.editProject(this.state.projectId,editdata)
    
  }
  handleSearch = value => {
    this.setState({global_search: value});
    let arrayTemp = [];
    for (let i = 0; i < this.props.listManager.data.length; i++) {
      if (this.props.listManager.data[i].name.toLowerCase().includes(value.toLowerCase())) {
        arrayTemp.push(this.props.listManager.data[i]);
      }
    }
    this.setState({listManager: arrayTemp});
  };
  renderManagerItem = ({ item }) => (
    <View style={{borderColor: '#e5e5e5',borderRadius: 5, flexDirection: 'row', elevation:1,margin:2 ,backgroundColor:"#ffff"}}>
      <TouchableOpacity style={{flex:1, margin: "2%",width:"100%"}} onPress={() => {
        this.setState({ projectManager: [item.id, item.name], modalOfManager: false })
      }} >
        <Text style={{ fontSize: 17 }}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  renderTypeItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{flex:1, margin: "3%",width:"100%" }} onPress={() => {
        this.setState({ projectType: [item.id, item.name,item.display_name], modalOfType: false })
      }} >
        <Text style={{ fontSize: 17 }}>{item.display_name}</Text>
      </TouchableOpacity>
    </View>
  );
  render(){
    return (
    <View style={{flex:1,backgroundColor:'#ffff'}}>
      <Modal
          animationType="slide"
          visible={this.state.modalOfManager}
          onRequestClose={() => {
            this.setState({ modalOfManager: false });
          }}>

          {/* header modal */}
          <View style={{backgroundColor:"#ffff"}}>
            <Text
            style={{
              fontSize: 22,
              margin: "2%",
              textAlign: 'center',
              fontWeight: 'bold',
              
            }}>
            Manager
              </Text>
          </View>
          <View style={{backgroundColor:"#e5e5e5"}}>
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
              style={styles.TextSearch}
              placeholder="Project Name"
              value={this.state.global_search}
              onChangeText={value => this.handleSearch(value)}
            />
            <View>
                {this.state.showX ? (<TouchableOpacity onPress={()=> this.setState({global_search:'',showX:false })}>
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


          </View>
          {/* body */}
          <View style={{flex: 9,backgroundColor:"#e5e5e5"}}>
              <SafeAreaView >
                <FlatList
                  data={this.state.listManager}
                  renderItem={this.renderManagerItem}
                  keyExtractor={(item, index) => `${index}`}
                />
          </SafeAreaView>
          </View>
          
          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '2%',
                width: '70%',
              }}
              onPress={() => this.setState({ modalOfManager: false })}>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: '3%',
                  marginBottom: '3%',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Cancel
                  </Text>
            </TouchableOpacity>
          </View>
        </Modal>
      <Modal
          animationType="slide"
          visible={this.state.modalOfType}
          onRequestClose={() => {
            this.setState({ modalOfType: false });
          }}>

          {/* header modal */}
          <Text
            style={{
              fontSize: 22,
              margin: "3%",
              textAlign: 'center',
              fontWeight: 'bold',
              
            }}>
            Project Type
              </Text>
          {/* body */}
          <SafeAreaView style={{ flex: 9}}>
            <FlatList
              data={this.state.listType}
              renderItem={this.renderTypeItem}
              keyExtractor={(item, index) => `${index}`}
            />
          </SafeAreaView>
          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '3%',
                width: '70%',
              }}
              onPress={() => this.setState({ modalOfType: false })}>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: '3%',
                  marginBottom: '3%',
                  textAlign: 'center',
                  color: 'white',
                }}>
                Cancel
                  </Text>
            </TouchableOpacity>
          </View>
        </Modal>
       <View style={styles.header}>
            <Text style={styles.text} >Project Name: </Text>
            <View style={styles.input} >
                <TextInput
                    style={styles.TextInput}
                    value={this.state.projectName}
                    onChangeText={value => this.setState({projectName:value})}  
                />

            </View>

            <Text style={styles.text}>Project Manager: </Text>
              <View style={styles.input} >
                <TextInput
                    style={styles.TextInput}
                    value={this.state.projectManager[1]}
                    onChangeText={value => this.setState({projectManager:value})}  
                />
                <TouchableOpacity onPress={() => { this.setState({ modalOfManager: true }) }} >
                  <Icon
                    name="angle-down"
                    backgroundColor=""
                    color="grey"
                    size={30}
                    style={{ marginTop: 8, marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </View>
            <Text style={styles.text}>Project Type: </Text>
            <View style={styles.input} >
                <TextInput
                    style={styles.TextInput}
                    value={this.state.projectType?.[1] ?? ""}
                    onChangeText={value => this.setState({projectType:value})}  
                />
                <TouchableOpacity onPress={() => { this.setState({ modalOfType: true }) }} >
                  <Icon
                    name="angle-down"
                    backgroundColor=""
                    color="grey"
                    size={30}
                    style={{ marginTop: 8, marginLeft: 20 }}
                  />
                </TouchableOpacity>
              </View> 
           
        </View>
    </View>
      
    );
  }
}
const styles = StyleSheet.create({
  header:{
    flex:1,
    marginRight:5,
    marginLeft:5,
  },
  text:{
    marginTop:5,
    fontSize:20,
    height:"auto",
 
  },
  TextInput: {
    backgroundColor:"#ffff",
    fontSize:15,
    height:"auto",
    width: '87%',
    paddingBottom: 0
  },
  input:{
      borderBottomWidth: 1,
      flexDirection: 'row',
      backgroundColor:"#ffff",
      
  },
  inputField: {
    margin:"1%",
    
    borderRadius: 5,
    elevation: 1,
    height: 40,
    flexDirection: 'row',
    backgroundColor:"#ffff"

  },
  TextSearch: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    paddingRight: 15,
  },
});
function mapStateToProps(state) {
  return {
    listType: state.ProjectTypeReducer.listProjectType,
    listManager: state.UserReducer.listUser,
    editStatus: state.ProjectReducer.editStatus,
    projectDetail: state.ProjectReducer.projectDetail
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { editProject,getAllProjectType,getListUserByCompany ,getDetailProject,getProjectByStatus})(ProjectEditorScreen),
);
