import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import Priority from '../../PriorityStar';
import UserAvatar from 'react-native-user-avatar';
import common from '../../../utility/common';
import Moment from 'react-moment';
import {getDetailTask} from '../../../redux/action/taskAction/TaskAction';
import {connect} from 'react-redux';
import {maxWidthScreen} from '../../../utility/config';
import {dataStatus} from '../../../utility/config';

class TaskItem extends React.Component {
  constructor(props) {
    super(props);
   
  }
  goToDetailTask = () => {
    
    this.props.getDetailTask(this.props.item.id)
    const TaskDetail = this.props.item;
    this.props.navigate.navigate('TaskDetailScreen', TaskDetail);
  };
  render() {
    return (
      <TouchableOpacity style={styles.eachView} onPress={this.goToDetailTask}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#555555',
            }}
            numberOfLines={2}>
            {this.props.item.name}
          </Text>
          <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
            <Priority priority={Number(this.props.item.priority)} />
          </View>
        </View>
        <Text style={{...styles.textStyle, color: '#17a2b8'}} numberOfLines={2}>
          {this.props.item.project_id[1]}
        </Text>
        <Text style={styles.textStyle}>{this.props.item.type_id[1]}</Text>
        <Text style={styles.textStyle}>{this.props.item.stage_id[1]}</Text>

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
            date={this.props.item.date_deadline}
            element={Text}
          />
          {/* <Text> {this.props.date_deadline}</Text> */}
          <UserAvatar
            style={{marginLeft: 'auto'}}
            size={20}
            bgColors={['#ffff']}
            name={this.props.item.user_id[1]}
            src={common.getUserAvartar(this.props.item.user_id[0])}
          />
        </View>
      </TouchableOpacity>
    );
  }
}
function mapStateToProps(state) {
  return {
    detailTask: state.TaskReducer.taskDetail
  };
}
export default connect(mapStateToProps, {getDetailTask})(TaskItem);

const styles = StyleSheet.create({
  eachView: {
    width:'100%',
    padding: 5,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#ffffff',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },

  textStyle: {
    fontSize: 14,
    color: '#555555',
  },
});
