import React, { Component } from "react";
import {  View ,Text,TouchableOpacity,StyleSheet} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import AppText from '../../utility/AppText';
import Collapsible from 'react-native-collapsible';
import {changeLanguage} from '../../redux/action/changeLanguage/ChangeLanguageAction';
import { connect } from 'react-redux';
export class SettingScreen extends React.Component
{
  constructor(props){
    super(props);
    this.state = {
      isNotShow : true,
      lang : 'en',
    }
  }


  changeLanguage = () => {
    this.setState({ isNotShow : false});
    console.log(this.state.isNotShow);
  }

  submitChange = () => {
    //const checkLang = (this.state.lang === 'en') ? checkLang = 'vi'
    this.setState({ isNotShow : true});
    // check language current 
    if(this.state.lang === 'en'){
    this.props.changeLanguage(this.state.lang);
    this.setState({lang : 'vi'});
    }
    else{
      this.setState({lang : 'en'});
      this.props.changeLanguage(this.state.lang);
    }
  }
  changeLanguageOption= () => {
      return(
        <TouchableOpacity onPress = {this.submitChange}>
            <View style = {{flexDirection : 'row',  paddingHorizontal : 20 , paddingVertical : 10}}>
                 <AppText style={{ fontSize : 15}} i18nKey = {'changLanguage'}></AppText>
                 <AppText style={{ fontSize : 15 , marginLeft : 'auto'}} i18nKey = {'langWantToChange'}></AppText>
            </View>    
        </TouchableOpacity>
           
      );
  }

  render(){
    let version = DeviceInfo.getVersion();
    return (
        <View style={{backgroundColor:"#ffff"}}>
        {/* Language */}
     
        <View style={{marginTop:"2%"}}>
          <TouchableOpacity style={styles.touch} onPress= {this.changeLanguage}>
            <AppText style={styles.textLeft} i18nKey={'language'}></AppText>
            <AppText style={styles.textRight} i18nKey={'langCurrent'}></AppText>
        </TouchableOpacity>
        <Collapsible collapsed={this.state.isNotShow}>
          {this.changeLanguageOption()}
        </Collapsible>
        </View>
        
       
        {/* Company */}
        <View style={{marginTop:"2%"}}>
          <TouchableOpacity style={styles.touch}>
          <AppText style={styles.textLeft} i18nKey={'changeCompanies'}></AppText>
          <Text style={styles.textRight}>Xboss</Text>
        </TouchableOpacity>
        </View>
        {/* Version */}
        <View style={{marginTop:"2%"}}>

          <TouchableOpacity style={styles.touch}>
          <AppText   style={styles.textLeft} i18nKey={'version'}></AppText>
          <Text style={styles.textRight}>{version}</Text>
        </TouchableOpacity>
        </View>
    </View>
    );
  }
}
const styles = StyleSheet.create({
 touch:{
    marginTop: '1%',
    marginHorizontal: 5,
    borderColor: 'black',
    borderColor: '#e5e5e5',
    elevation: 3,
    flexDirection: 'row',
    backgroundColor:'#ffff',
    justifyContent:'space-between'
 },
 textLeft:{
  margin:"5%",
  fontSize:15,
 
 },
 textRight:{
  margin:"5%",
  fontSize:15,
  
 }
});

function mapStateToProps(state) {
  return {
    language: state.ChangeLanguageReducer.language,
  };
}
export default connect(mapStateToProps, {changeLanguage})(SettingScreen);
