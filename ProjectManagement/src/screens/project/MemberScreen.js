import React, { Component } from "react";
import {  View ,Text,StyleSheet,Alert,SafeAreaView,FlatList,TouchableOpacity,TextInput,BackHandler} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


import { getListUserById } from '../../redux/action/userAction/UserAction';

import {editProject} from '../../redux/action/projectAction/ProjectAction'
import {getListUserByCompany} from '../../redux/action/userAction/UserAction'
import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';
import { userProfile, dataStatus } from "../../utility/config";
import MemberItem from './MemberScreen/MemberItem' 
import {clearSelectUserProject } from '../../redux/action/userAction/UserAction';
import {getDetailProject,getProjectByStatus} from '../../redux/action/projectAction/ProjectAction'


 class MemberScreen extends React.Component
{
  constructor(props){
        super(props);
         this.state={
            checkbox:false,
            members:[],
            global_search:'',
            showX:false
        }
    }
  componentDidMount(){
    this.props.navigation.setOptions({
    title: 'Select Members',
    headerStyle: {
      backgroundColor: '#61dafb',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.AddMember} >
            <Text style={{ marginRight: 10, fontSize: 20,color:"#ffff"}}>Save</Text>
          </TouchableOpacity>
        </View>
      ),
    })
    this.props.getListUserByCompany(userProfile.companyId)
    //test
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }
  componentDidUpdate(prevProps){
    if (this.props.listUser !== prevProps.listUser) {
      if(this.props.listUser.status === dataStatus.SUCCESS){
        // let arr = this.props.listUser.data
        // let arr_2 = this.props.listUserProject.data
        // const new_arr = arr.filter(item => !arr_2.includes(item));
        // this.setState({members:new_arr})

        this.setState({members:this.props.listUser.data})

      }
    }
    if(this.props.editStatus !== prevProps.editStatus)
    {
      if(this.props.editStatus.status === dataStatus.SUCCESS){
        this.props.getListUserById(this.props.listSelectUserOfProject.data)
        this.props.getDetailProject(this.props.projectDetail.data.id)
        this.props.clearSelectUserProject()
      }
    }
    if(this.props.projectDetail!== prevProps.projectDetail){
      if (this.props.projectDetail.status === dataStatus.SUCCESS) {
        this.props.getProjectByStatus();
        this.props.navigation.navigate('ProjectDetailScreen');
      }
    }
  }
  onBack = ()=>
  {
    this.props.clearSelectUserProject()
    this.props.navigation.goBack()
  }
  backAction = () => {
    Alert.alert("Hold on!", "Are you sure you want to go back?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel"
      },
      { text: "YES", onPress: () => this.onBack()}
    ]);
    return true;
  };
  handleSearch = value => {
    this.setState({global_search: value});
    let arrayTemp = [];
    for (let i = 0; i < this.props.listUser.data.length; i++) {
      if (this.props.listUser.data[i].name.toLowerCase().includes(value.toLowerCase())) {
        arrayTemp.push(this.props.listUser.data[i]);
      }
    }
    this.setState({members: arrayTemp});
  };
  
  renderItem = ({item}) => {
      return <MemberItem item ={item}/>
  };
  AddMember=()=>
  {
    const data={
      members:[[6,false,this.props.listSelectUserOfProject.data]]
    }
    this.props.editProject(this.props.projectDetail.data.id,data)
  }

    render(){
     
      return (
        <View style={{ flex: 1,backgroundColor:'#ffff'}}>
                <View style={styles.inputField}>
                     
                      <View style={{justifyContent:"center",marginLeft: "2%"}}>
                          <Icon
                          name="search"
                          backgroundColor=""
                          color="grey"
                          size={20} 
                          />
                      </View>
                     
                      <TextInput
                        name="search"
                        style={styles.TextInput}
                        placeholder="Name "
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
                                style={{ marginTop: 7, marginRight: 7 }}
                              />
                            </TouchableOpacity>):null}
                        </View>
            </View>
            <View style={{ flex: 7,backgroundColor:'#ffff'}}>
              <SafeAreaView>
                <FlatList
                  data={this.state.members}
                  renderItem={this.renderItem}
                  keyExtractor={item => item.id}
                />
            </SafeAreaView>
            </View>
        </View>
    );
  }
}
const styles = StyleSheet.create({
border:{
    borderWidth: 1,
    borderRadius: 5,
    marginTop:5,
    marginLeft:10,
    marginRight:10,
 },
 icon:{
    width:30,
    height:30,
    borderRadius: 30 / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:"#4876FF",
    marginLeft:5
  
 },
 BtnLogin: {
    width: '80%',
    backgroundColor: '#4876FF',
    marginTop: 5,
    borderRadius: 10,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
  },
  inputField: {
    margin:"1%",
    borderColor: '#e5e5e5',
    elevation: 2,
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    backgroundColor:"#ffff"
  },
  TextInput: {
    color: '#000000',
    borderColor: 'black',
    flex: 1,
    paddingRight: 15,
    fontSize:17
  },
});
function mapStateToProps(state) {
  return {
    user: state.AuthenticateReducer.user,
    listUser: state.UserReducer.listUser,
    listSelectUserOfProject: state.UserReducer.listSelectUserOfProject,
    editStatus: state.ProjectReducer.editStatus,
    projectDetail: state.ProjectReducer.projectDetail
    
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {getListUserByCompany,editProject,getListUserById,clearSelectUserProject,getDetailProject,getProjectByStatus})(MemberScreen),
);
