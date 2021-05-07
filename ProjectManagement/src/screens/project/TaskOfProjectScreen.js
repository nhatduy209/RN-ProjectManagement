import React, { Component } from "react";
import {  View ,Text,StyleSheet,ActivityIndicator,SafeAreaView,FlatList,TouchableOpacity} from 'react-native';
import UserAvatar from 'react-native-user-avatar';
import common from '../../utility/common';
import Priority from '../../screens/PriorityStar';
import Moment from 'react-moment';

import { getListTask,getDetailTask } from '../../redux/action/taskAction/TaskAction';


import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';
 class TaskOfProjectScreen extends React.Component
{
  constructor(props) {
    super(props);
    this.state = {
      list_task: this.props.listTaskOfProject.data,
      isRefreshingFooter: false,
      offset: 5,
      limit: 10,
    }
    
  }
  // componentDidMount(){
  //   this.setState({list_task:this.props.listTaskOfProject.data})
  // }

  handleSearch = value => {
    let arrayTemp = [];
    for (let i = 0; i < this.props.listTaskOfProject.data.length; i++) {
      if (this.props.listTaskOfProject.data[i].stage_id[1]) {
        if(this.props.listTaskOfProject.data[i].stage_id[1].toLowerCase().includes(value.toLowerCase()))
          {arrayTemp.push(this.props.listTaskOfProject.data[i]);}
      }
    }
    this.setState({list_task: arrayTemp});
  };
 
  renderItem = ({item})=>
  {
     return(
       <View style={{margin:"1%"}}>
         <TouchableOpacity style={styles.eachView}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#555555',
            }}
            numberOfLines={2}>
            {item.name}
          </Text>
          <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
            <Priority priority={Number(item.priority)} />
          </View>
        </View>
        <Text style={{...styles.textStyle, color: '#17a2b8'}} numberOfLines={2}>
          {item.project_id[1]}
        </Text>
        <Text style={styles.textStyle}>{item.type_id[1]}</Text>
        <Text style={styles.textStyle}>{item.stage_id[1]}</Text>

        <View
          style={{
            borderTopWidth: 0.5,
            borderColor: '#e5e5e5',
            flexDirection: 'row',
            paddingTop: 5,
            marginTop: 5,
          }}>
          <Moment
            format="DD/MM/YYYY"
            date={item.date_deadline}
            element={Text}
          />
          <UserAvatar
            style={{marginLeft: 'auto'}}
            size={20}
            bgColors={['#ffff']}
            name={item.user_id[1]}
            src={common.getUserAvartar(item.user_id[0])}
          />
        </View>
      </TouchableOpacity>
    
       </View>
      )
  }
  render(){
    return (
       <View style={styles.CheckList_Description}>
         <View style={{flex:1}}>
           <View style={{flexDirection:'row'}}>
           
             <TouchableOpacity onPress={()=>this.setState({list_task: this.props.listTaskOfProject.data})} style={{ width:"20%",margin:2,borderRadius:5, backgroundColor:"#000",alignItems:'center'}}>
                  <Text style={{fontSize:22, color:'#ffff',margin:2}}>All</Text>
              </TouchableOpacity>     
            

              <TouchableOpacity onPress={()=>this.handleSearch('Doing')} style={{width:"20%", margin:2,borderRadius:5, backgroundColor:"#ff9900",alignItems:'center'}}>
                <Text style={{fontSize:22,color:'#ffff',margin:2}}>Doing</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={()=>this.handleSearch('Done')} style={{ width:"20%",margin:2,borderRadius:5, backgroundColor:"#00ff00",alignItems:'center'}}>
                <Text style={{fontSize:22,color:'#ffff',margin:2}}>Done</Text>
              </TouchableOpacity>
          </View>        
            <View style={{flex:1}} >
               <SafeAreaView>
                  <FlatList
                    data={this.state.list_task}
                    renderItem={this.renderItem}
                    keyExtractor={(item,index) => index.toString()}
                   
                    ListFooterComponent = { 
                    <ActivityIndicator size="large" animating={this.state.isRefreshingFooter} color="#e5e5e5e5" style={{alignSelf : 'center'}} />
                    }
                  />
                </SafeAreaView>
            </View>
         </View>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    listTaskOfProject: state.TaskReducer.listTaskOfProject
  };
}
export default withGlobalContext(
  connect(mapStateToProps, {getListTask,getDetailTask })(TaskOfProjectScreen),
);
const styles = StyleSheet.create({
border:{
  flex:1,
  margin:"1%"
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
    marginTop: 10,
    borderRadius: 15,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
  },
   CheckList_Description: {
    borderWidth: 1,
    height: '100%',
    flex:1
    
  },
   border_button:{
    borderWidth:1,
    margin:2,
    borderRadius:5
    
  },
  eachView: {
      padding: 5,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
});


