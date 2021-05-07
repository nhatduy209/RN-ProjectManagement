import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput, Modal } from 'react-native';
import common from '../../utility/common';
import StarRating from 'react-native-star-rating';
import Moment from 'react-moment';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { getListCheckList, createCheckListHeader, createCheckListItem } from '../../redux/action/checkListTask/CheckListTaskAction';
import AppText from '../../utility/AppText';
import Collapsible from 'react-native-collapsible';
import { dataStatus, maxWidthScreen } from '../../utility/config';
import RenderCheckList from './ListCheckList';
import { getDetailTask , resetDetailTask} from '../../redux/action/taskAction/TaskAction';
export class TaskDetailScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      checkList: [],
      checkListItem: [],
      isShowEnterChecklistTitle: true,
      isChecked: false,
      arrayTemp: [],
      unmount: false

    };
    this.showAddCheckListButton = true;
    this.GetTaskDetail = {};
  }

  componentDidMount() {
    this.props.getDetailTask(this.props.route.params.id)
  }


  addCheckList = () => {         // create check list header
    const idTask = this.props.route.params.id;
    const value = this.state.checkListTitle;
    this.props.createCheckListHeader(idTask, value);
    this.setState({ checkListTitle: '' })

  }

  handleText = (value) => {
    this.setState({ checkListTitle: value });
    console.log(this.state.checkListTitle);
  }
  renderButtonAdd = () => {
    if (this.showAddCheckListButton) {
      return (
        <TouchableOpacity onPress={this.addCheckList}>
          <Icon
            size={25}
            name="check"
            color="#555555"
            style={{ paddingRight: 5 }}
          />
        </TouchableOpacity>
      );
    }
  }

  handleClickAddCheckList = () => {    // check where show icon or not
    if (this.state.isShowEnterChecklistTitle) {
      this.setState({ isShowEnterChecklistTitle: false })
    }
    else {
      this.setState({ isShowEnterChecklistTitle: true })
    }
  }

  componentDidUpdate(prevProps) {    // check and render check list 
      if (this.props.detailTask.status !== prevProps.detailTask.status) {
        console.log(`this.props.detailTask.status: `, this.props.detailTask.status)
        if (this.props.detailTask.status === dataStatus.SUCCESS) {
          const taskChecklistIds = this.props.detailTask.data.checklist_task_instance_ids;
          this.props.getListCheckList(taskChecklistIds);
        }
      }
      console.log("this.props.createCheckListStatus--------------", this.props.createCheckListStatus);
      if(this.props.createCheckListStatus.status !== prevProps.createCheckListStatus.status){
        if(this.props.createCheckListStatus.status === dataStatus.SUCCESS){   
          console.log("this.props.createCheckListStatus.", this.props.createCheckListStatus);
          this.props.resetDetailTask(false);
          setTimeout( () => {
            this.props.getDetailTask(this.props.route.params.id);
          },250);    
         // const taskChecklistIds = this.props.detailTask.data.checklist_task_instance_ids;
          //this.props.getListCheckList(taskChecklistIds);
        }
      }
  }

  componentWillUnmount() {
    this.props.resetDetailTask();
  }

  renderChecklist(item) {
    return (
      <RenderCheckList item={item} id={this.props.detailTask.id} />
    );
  }
  render() {
    const status = this.props.detailTask.status;
    const TaskDetail = this.props.detailTask.data;
    const checkList = this.props.checkList;
    console.log("CHECK LIST ", this.props.checkList);

    console.log("TASK DETAIL", TaskDetail);
    // let List = this.state.checkList;
    let arrayCheckList = [];
      return (
        <ScrollView style={{ flex: 1 }}>
          {/* Detail Task */}
          <View style={styles.contentView}>
            <View style={{ flexDirection: 'row' }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: 'bold',
                  flex: 1,
                  paddingLeft: 5,
                  color: '#555555',
                }}
                numberOfLines={2}>
                {TaskDetail?.name ?? ''}
              </Text>
              <View style={{ marginLeft: 'auto' }}>
                <StarRating
                  starStyle={{ marginLeft: 2.5 }}
                  disabled={false}
                  maxStars={3}
                  starSize={20}
                  fullStarColor="#ffc107"
                  emptyStarColor="#ffc107"
                  rating={Number(TaskDetail?.priority ?? 0)}
                />
              </View>
            </View>
            <View>
              <View style={styles.viewDetailTask}>
                <AppText style={styles.textStyle} i18nKey={'taskDetailScreenProject'}> </AppText>
                <Text style={styles.detailText}>
                  {common.convertArrayToString(TaskDetail?.project_id)}
                </Text>
              </View>
              <View style={styles.viewDetailTask}>
                <AppText style={styles.textStyle} i18nKey={'taskDetailScreenTaskType'}> </AppText>
                <Text style={styles.detailText}>{common.convertArrayToString(TaskDetail?.type_id)}</Text> 
              </View>
              <View style={styles.viewDetailTask}>
                <AppText style={styles.textStyle} i18nKey={'taskDetailScreenProject'}> </AppText>
                <Text style={styles.detailText} numberOfLines={2}>
                  {common.convertArrayToString(TaskDetail?.sprint_id)}
                </Text>
              </View>
              <View style={styles.viewDetailTask}>
                <AppText style={styles.textStyle} i18nKey={'taskDetailScreenStage'}> </AppText>
                <Text style={styles.detailText}>{common.convertArrayToString(TaskDetail?.stage_id)}</Text>
              </View>
              <View style={styles.viewDetailTask}>
                <AppText style={styles.textStyle} i18nKey={'taskDetailScreenDeadline'}> </AppText>

                <Moment
                  style={styles.detailText}
                  format="DD/MM/YYYY"
                  date={TaskDetail?.date_deadline}
                  element={Text}
                />
              </View>
            </View>
          </View>

          {/* Task distribution */}
          <View style={{ flex: 1, paddingHorizontal: 5 }}>
            <View style={{ flexDirection: 'row' }}>
              {/* Request By  */}
              <View
                style={{
                  flexDirection: 'column',
                  flex: 1,
                }}>
                <AppText style={styles.textStyle} i18nKey={'taskDetailScreenRequestBy'}></AppText>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View>
                    <Image style={{ height: 20, width: 20, borderRadius: 10 }} source={{ uri: common.getPartnerAvartar(
                      common.convertArrayToString(TaskDetail?.creator_id, true)) }} />
                  </View>
                  <Text numberOfLines={2} style={{ paddingRight: 5, flex: 1 }}>
                    {' '}
                    {common.convertArrayToString(TaskDetail?.creator_id)}
                  </Text>
                </View>
              </View>

              {/* Request Date */}
              <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <AppText style={styles.textStyleLeft} i18nKey={'taskDetailScreenRequestDate'}>Request Date</AppText>
                <Moment
                  format="DD/MM/YYYY"
                  date={TaskDetail?.create_date}
                  element={Text}
                />
              </View>
            </View>

            <View style={{ flexDirection: 'row', flex: 1 }}>
              {/* Assign By */}
              <View style={{ flexDirection: 'column', flex: 1 }}>
                <AppText style={styles.textStyle} i18nKey={'taskDetailScreenAssignBy'}> Assign by </AppText>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Image style={{ height: 20, width: 20, borderRadius: 10 }} source={{ uri: common.getUserAvartar(
                    common.convertArrayToString(TaskDetail?.user_id,true)) }} />
                  <Text style={{ marginTop: 7 }}>
                    {' '}
                    {common.convertArrayToString(TaskDetail?.user_id)}
                  </Text>
                </View>
              </View>

              {/* Assign Date */}
              <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                <AppText style={styles.textStyleLeft} i18nKey={'taskDetailScreenAssignDate'}></AppText>
                <Moment
                  style={{ marginTop: 7 }}
                  format="DD/MM/YYYY"
                  date={TaskDetail?.date_deadline}
                  element={Text}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {/* Resolve By */}
              <View style={{ flexDirection: 'column' }}>
                <AppText style={styles.textStyle} i18nKey={'taskDetailScreenResolveBy'} ></AppText>
                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ height: 20, width: 20, borderRadius: 10 }} source={{ uri: common.getUserAvartar(
                  common.convertArrayToString(TaskDetail?.user_id,true)) }} />
                  <Text style={{ marginTop: 5 }}>  {common.convertArrayToString(TaskDetail?.user_id)}</Text>
                </View>
              </View>

              {/* Due Date */}

              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  flex: 1,
                }}>
                <AppText style={styles.textStyleLeft} i18nKey={'taskDetailScreenDueDate'}></AppText>
                <Moment
                  style={{ marginTop: 7 }}
                  format="DD/MM/YYYY"
                  date={TaskDetail?.date_end}
                  element={Text}
                />
              </View>
            </View>
          </View>

          {/* Description and CheckList */}

          <View style={{ flexDirection: 'row', marginLeft: 10, paddingBottom: 5 }}>
            <AppText
              style={{
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                color: '#555555',
              }}
              i18nKey={'taskDetailScreenDescription'}
            >

            </AppText>
          </View>
          <View style={styles.CheckList_Description}>
            <Text>{TaskDetail?.description ?? ''}</Text>
            {/* <Text>{TaskDetail.checklist_task_instance_ids}</Text> */}
          </View>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#555555',
              marginLeft: 10,
            }}>
            Check list
        </Text>
          <View style={styles.CheckList_Description}>
            <View
              style={{
                flexDirection: 'row',
                backgroundColor: '#e5e5e5',
                borderRadius: 5,
              }}>
              <Text style={styles.checkList}> New checklist header </Text>
              <Text style={styles.checkList}>
                0/{arrayCheckList.length}
              </Text>
              <TouchableOpacity onPress={this.handleClickAddCheckList}>
                <Icon
                  name="plus"
                  backgroundColor=""
                  color="grey"
                  style={{ marginLeft: 'auto', padding: 10 }}
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <Collapsible collapsed={this.state.isShowEnterChecklistTitle}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TextInput placeholder="Type new check list title....." style={{ flex: 1 }}
                  onChangeText={(value) => this.handleText(value)}>
                </TextInput>
                {this.renderButtonAdd()}
              </View>
            </Collapsible>
            {this.props.checkList.data.map((item, index) => {
              return this.renderChecklist(item);
            })}
          </View>
        </ScrollView>
      );
  }
}

function mapStateToProps(state) {
  return {
    checkList: state.CheckListTaskReducer.listCheckList,
    checkListType: state.CheckListTypeReducer.listCheckListType,
    detailTask: state.TaskReducer.taskDetail,
    createCheckListStatus:  state.CheckListTaskReducer.createCheckListTitle,
  };
}
export default connect(mapStateToProps, { resetDetailTask,getDetailTask, getListCheckList, createCheckListHeader, createCheckListItem })(TaskDetailScreen);

const styles = StyleSheet.create({
  textStyle: {
    marginRight: 2,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555555',
  },
  detailText: {
    marginLeft: 5,
    fontStyle: 'italic',
    fontSize: 15,
    flex: 1,
  },
  textStyleLeft: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555555',
  },
  contentView: {
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
  },
  TaskDistributionView: {
    flexDirection: 'row',
  },
  button: {
    borderWidth: 1,
    width: 100,
  },
  CheckList_Description: {
    marginHorizontal: 10,
    borderColor: '#e5e5e5',
    borderRadius: 10,
    minHeight: 80,
  },
  viewDetailTask: {
    flexDirection: 'row',
    paddingVertical: 5,
  },
  middleView: {
    marginHorizontal: 10,
  },
  checkList: {
    fontSize: 15,
    color: '#555555',
    flex: 1,
    alignSelf: 'center',
    marginLeft: 3
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    margin: 5
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  inputNameCheckList: {
    fontSize: 15,
    borderRadius: 15,
    borderWidth: 0.5,
    paddingHorizontal: 50,
    width: maxWidthScreen - 20,
    textAlign: 'center'
  }
});
