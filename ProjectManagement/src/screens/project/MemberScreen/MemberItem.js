import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox'
import Icon from 'react-native-vector-icons/FontAwesome';
import UserAvatar from 'react-native-user-avatar';
import common from '../../../utility/common';
import { selectUserProject ,removedSelectUserProject} from '../../../redux/action/userAction/UserAction';


import { withGlobalContext } from '../../../GlobalContextProvider';
import { connect } from 'react-redux';
class MemberItem extends React.Component {
    constructor(props){
        super(props);
         this.state={
            checkbox:false,
            listUserOfProject:this.props.listUser.data
        }
        this.state.listUserOfProject.forEach(element => {
            if(element.id===this.props.item.id)
            {
                this.state.checkbox = true
                this.props.selectUserProject(this.props.item.id)
            }
        });
        
    }

     onChangeCheckbox=()=>
     {
        if(this.state.checkbox === true)
        {
            
            this.props.removedSelectUserProject(this.props.item.id)
            this.setState({checkbox:false})
        }
        if(this.state.checkbox ==false)
        {   
            this.props.selectUserProject(this.props.item.id)
            this.setState({checkbox:true})
            
        }   
    }
    render() {
            return (
               <View style={{backgroundColor:"#ffff"}} >
                    <TouchableOpacity onPress={()=>this.onChangeCheckbox()}>
                    <View style={styles.border }>
                    <View style={{margin:"2%",flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{marginTop:"2%"}}>
                                <UserAvatar 
                                size={60} bgColors={['#ffff']} 
                                name="Avishay Bar" 
                                src={common.getUserAvartar(this.props.item.id)}
                                />
                            </View>
                    {/* test Data */}
                            <View >
                                <Text style={{fontSize: 18,marginLeft:"3%"}}>{this.props.item.name}</Text>
                                <Text style={{fontSize: 15,marginLeft:"3%"}}>{this.props.item.email}</Text>
                                <View style={{flexDirection:'row',marginTop:5}}>
                                    <View style={styles.icon}>
                                        <Icon size={15} name="phone" color="#ffff"/>
                                    </View>
                                    <View style={styles.icon}>
                                        <Icon size={15} name="comment" color="#ffff" />
                                    </View>
                                    <View style={styles.icon}>
                                        <Icon size={15} name="envelope-open" color="#ffff"/>
                                    </View>
                                </View>

                        </View>
                        </View>
                        {/* tích xanh */}
                        <View style={{marginTop:'6%'}}>
                        <CheckBox 
                            value = {this.state.checkbox}
                            tintColors={{true : "blue"}}
                        />
                        </View>
                    </View>
                </View>
            </TouchableOpacity>            
               </View>
            );
        }
}
function mapStateToProps(state) {
  return {
      listUser: state.UserReducer.listUserById,
  };
};
export default withGlobalContext(
  connect(mapStateToProps, { selectUserProject,removedSelectUserProject})(MemberItem),
);
const styles = StyleSheet.create({
        border:{
            elevation: 1,
            borderColor: '#e5e5e5',
            borderRadius: 1,
            margin:"1%"
        },
        icon:{
            width:30,
            height:30,
            borderRadius: 30 / 2,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:"#4876FF",
            marginLeft:"3%"
        
        },
});
