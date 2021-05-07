import React, { PureComponent } from 'react';
import { SafeAreaView, FlatList, TextInput,TouchableOpacity, View, RefreshControl} from 'react-native';
import { connect } from 'react-redux';
import { getListTaskType, searchTask } from '../../../redux/action/taskTypeAction/TaskTypeAction';
import TaskStage from './TaskStage';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { maxWidthScreen } from '../../../utility/config';
import TaskBusiness from '../../../business/TaskBusiness'
import {getListCheckListType } from '../../../redux/action/checkListTask/CheckListTaskAction';
export class TaskScreen extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
     // listTaskType : [],
      isSearching : false, 
      searchTaskText: '',
      isRefreshing: false,
      isRefreshingFooter : false, 
    }
  }

  

  componentDidMount() {
    this.props.getListTaskType();
    this.props.getListCheckListType();
  }

  handleRefresh = async () => {
    await this.props.getListTaskType();
  }

  getDataRefresh = async () => {
    return new Promise( (resolve , reject) => {
      this.handleRefresh().then( res => resolve(res))
    })
  }

  renderStage = ({ item }) => {

    return (
         <TaskStage item={item} navigate={this.props.navigation} isSearch = {this.state.isSearching} />
    );
  };
  handleSearch = (value) => {
  
      if(value.length > 0){
        this.setState({isSearching : true })
        this.setState({searchTaskText : value})
      }
      else{
        this.setState({searchTaskText : value})
        this.setState({isSearching : false })
      }
    
  }

  clearText = () => {
    this.setState({searchTaskText : ''});
    this.props.getListTaskType();
    this.setState({isSearching : false});
  }

  renderClearButton = () => {
    if(this.state.isSearching){
      return(
        <TouchableOpacity onPress= {this.clearText}>
        <Icon
          size={17}
          name="times"
          color="#555555"
          style={{ marginLeft: 8}}
        />
       </TouchableOpacity>
      );
    }
  }

  searchTask = () => {
    this.props.searchTask(this.state.searchTaskText);
  }

  renderSearchButton = () => {
    console.log(this.state.searchTaskText);
    if(this.state.isSearching){
      return(
        <TouchableOpacity onPress= {this.searchTask}>
        <Icon
          size={17}
          name="search"    
          color="#555555"
          //style={{marginTop: 11, marginLeft: 8, marginRight: 12}}
        />
       </TouchableOpacity>
      );
    }
  }

  render() {
    // each of items

    return ( 
      <>
        <View style={{ 
            flexDirection: 'row',
            borderColor: '#e5e5e5',
            backgroundColor: '#ffffff',
            borderRadius: 5,
            elevation : 2,
            paddingHorizontal : 10,
            alignItems : 'center',
            margin: 5,}}>
         <TextInput
            onChangeText={value => this.handleSearch(value)}
            value={this.state.searchTaskText}
            placeholder="Search task..."
            placeholderTextColor= "#e5e5e5e5"
            style={{
              flex: 1,
              color: '#555555',
              fontSize : 16,
              paddingVertical : 5,
            }}           
            
        />
         {this.renderSearchButton()}
         {this.renderClearButton()}
        </View>
        <FlatList
          horizontal
          renderItem={this.renderStage}
          data={this.props.listTaskType.data}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          style={{width: maxWidthScreen, height:'100%'}}
          snapToInterval= {maxWidthScreen -50 }
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    listTaskType: state.TaskTypeReducer.listTaskType,
  };
}
export default connect(mapStateToProps, { getListTaskType , searchTask , getListCheckListType })(TaskScreen);
