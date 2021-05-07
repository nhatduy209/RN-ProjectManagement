import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { maxWidthScreen } from '../../../utility/config';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import { getListTask } from '../../../redux/action/taskAction/TaskAction';
import _ from 'underscore';
import Icon from 'react-native-vector-icons/FontAwesome5';
//render stage

export class TaskStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 5,
      limit: 10,
      listTask: [],
      loading: false,
      searchTaskText: '',
      isRefreshingFooter: false,
    };
    this.shouldLoadMore = true ;
  }

  renderItem = ({ item }) => {
    return <TaskItem item={item} navigate={this.props.navigate} />;
  };

  itemSeparator = () => {
    return <View style={{ height: 5 }} />;
  };

  emptyComponent = () => {
    return (
      <View style={styles.emptyItem}>
        <Icon
          size={60}
          name="box-open"
          color="#e5e5e5e5"
        />
        <Text style={{ textAlign: 'center' , color : '#e5e5e5e5' ,fontSize : 22 , fontWeight : 'bold'}}> Chưa có Task </Text>
      </View>
    );
  };

  componentDidUpdate(prevProps) {
    const { listTask } = this.props.item;
    const { data } = listTask;
    const { listTask: prevListTask } = prevProps.item;
    const { data: prevData } = prevListTask;
      if (!_.isEqual(data, prevData)) {
        if (data.length < this.offset + this.limit) {
          this.shouldLoadMore = false;
        } else {
          this.offset = this.offset + this.limit;
          this.shouldLoadMore = true;
        }
      }
  }

  onEndReach = () => {
    if(!this.props.isSearch){
    if (this.shouldLoadMore) {
      this.shouldLoadMore = true;
      this.setState({isRefreshingFooter : true })
        this.props.getListTask(
          this.state.offset,
          this.state.limit,
          this.props.item.id,
          this.props.item.listTask.data,
        );  
        this.shouldLoadMore = false;
       // this.setState({isRefreshingFooter : false })
    }
    else{
      this.setState({isRefreshingFooter : false })
    }
    }
  };

  clearText = () => {
    this.setState({ searchTaskText: '' });
  };

  render() {
    return (
      <View style={{width : maxWidthScreen - 50 }}>
        <View
          style={{
            justifyContent: 'center',
            marginHorizontal : 5,
            borderRadius : 5,
            backgroundColor: 'white',
            paddingVertical: 5,
            borderColor: '#e5e5e5',
            elevation: 2,
          }}>
          
          <Text
            style={{
              textAlign: 'center',
              fontSize: 18,
              fontWeight: '300',
              color: '#555555',
              
            }}>
            {this.props.item.name} {''}
            <Text style ={{color : '#ff3333' }}>({this.props.item.listTask.data.length}) </Text>
         
          </Text>
        </View>
        <FlatList
          data={this.props.item.listTask.data}
          //style = {{ marginTop : 5}}
          //data={this.state.listTask}
          keyExtractor={(task, index) => index}
          renderItem={this.renderItem}
          contentContainerStyle={{ paddingBottom: 10, paddingHorizontal: 5 , paddingTop : 5}}
          // check the flat list scroll to the end
          ItemSeparatorComponent={this.itemSeparator}
          ListEmptyComponent={this.emptyComponent}
          onEndReachedThreshold={0.1}
         // ListFooterComponent={this.renderFooter.bind(this)}
          onEndReached={
            () => this.onEndReach()
          }
          ListFooterComponent = { 
               <ActivityIndicator size="large"  animating={this.state.isRefreshingFooter} color="#e5e5e5e5" style={{alignSelf : 'center'}} />
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  emptyItem: {
    borderRadius : 5,
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#ffffff',
    elevation: 2,
    alignItems :'center'
  },
});

function mapStateToProps(state) {
  return {
    task: state.TaskReducer.listAllTask,
  };
}

export default connect(mapStateToProps, { getListTask })(TaskStage);
