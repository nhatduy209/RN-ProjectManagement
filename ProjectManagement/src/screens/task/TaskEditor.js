import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  FlatList,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createTask } from '../../redux/action/taskAction/TaskAction';
import CalendarPicker from 'react-native-calendar-picker';
import DatePicker from 'react-native-date-picker'
import StarRating from 'react-native-star-rating';
import DocumentPicker from 'react-native-document-picker';

import { getProjectByCompany } from '../../redux/action/projectAction/ProjectAction'
import { createAttachment } from '../../redux/action/attachmentAction/AttachmentAction'
import { getAllTaskType } from '../../redux/action/projectTypeAction/ProjectTypeAction'
import { getListUserByProject } from '../../redux/action/userAction/UserAction'
import { getListPartner, searchPartner } from '../../redux/action/partnerAction/PartnerAction'
import { editTask, getDetailTask } from '../../redux/action/taskAction/TaskAction'
import RNFS from "react-native-fs"
import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';
import { dataStatus, userProfile } from '../../utility/config'

import moment from 'moment';
import common from '../../utility/common';
import AppText from '../../utility/AppText';

class TaskEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalOfProject: false,
      modalOfTaskType: false,
      modalOfAssignTo: false,
      modalOfRequestBy: false,

      Id: this.props.detailTask.data.id,
      Deadline: moment(this.props.detailTask.data.date_deadline).format("YYYY-MM-DD"),
      Title: this.props.detailTask.data.name,
      Project: this.props.detailTask.data.project_id,
      TaskType: this.props.detailTask.data.type_id,
      RequestBy: this.props.detailTask.data.creator_id,
      AssignTo: this.props.detailTask.data.user_id,
      Priority: this.props.detailTask.data.priority,
      Description: this.props.detailTask.data.description,
      AttachmentFile: [],

      isSearchPartner: false,
      searchPartnerText: ""
    };
    this.onSave.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'Edit Task Screen',
      headerStyle: {
        backgroundColor: '#61dafb',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={this.onSave} >
            <Text style={{ marginRight: 10, fontSize: 20, color: "#ff9900" }}>Save</Text>
          </TouchableOpacity>
        </View>
      ),
    })

    this.props.getProjectByCompany(userProfile.companyId)
    this.props.getAllTaskType()
    this.props.getListUserByProject(this.state.Project[0])
    this.props.getListPartner()
  }
  componentDidUpdate(prevProps) {
    if (this.props.editStatus !== prevProps.editStatus) {
      if (this.props.editStatus.status === dataStatus.SUCCESS) {
        this.props.getDetailTask(this.state.Id)
      }
    }
    if (this.props.detailTask !== prevProps.detailTask) {
      if (this.props.detailTask.status === dataStatus.SUCCESS) {
        const TaskDetail = this.props.detailTask.data
        this.props.navigation.navigate('TaskDetailScreen', TaskDetail);
      }
    }
  

  }
  onSave =  () => {
    if (this.state.AttachmentFile.length !== 0) {
      this.state.AttachmentFile.map((item) => {
        RNFS.readFile(item.uri, "base64").then((res) => {
          this.props.createAttachment(this.state.Id, "project.task", res, item.name)
        })
      });
    }
      
    const editdata = {
      "name": this.state.Title,
      "date_deadline":this.state.Deadline ,
      "project_id": this.state.Project[0],
      "type_id": this.state.TaskType[0],
      "creator_id": this.state.RequestBy[0],
      "user_id": this.state.AssignTo[0],
      "priority": this.state.Priority,
      "description": this.state.Description
    }
    this.props.editTask(this.state.Id, editdata)
  };

  onStarRatingPress(rating) {
    this.setState({
      Priority: String(rating)
    });
  }
  //SEARCH <=========================================>
  handleSearch = (value) => {
    if (value.length > 0) {
      this.setState({ isSearchPartner: true })
    }
    else {
      this.setState({ isSearchPartner: false })
      this.props.getListPartner();
    }
    this.setState({ searchPartnerText: value })
  }

  clearText = () => {
    this.setState({ searchPartnerText: '' });
    this.props.getListPartner();
    this.setState({ isSearchPartner: false });
  }

  renderClearButton = () => {
    if (this.state.isSearchPartner) {
      return (
        <TouchableOpacity onPress={this.clearText}>
          <Icon
            size={17}
            name="times"
            color="#555555"
            style={{ marginLeft: 8 }}
          />
        </TouchableOpacity>
      );
    }
  }

  searchPartner = () => {
    this.props.searchPartner(this.state.searchPartnerText);
  }

  renderSearchButton = () => {
    if (this.state.isSearchPartner) {
      return (
        <TouchableOpacity onPress={this.searchPartner}>
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
  selectMultipleFile = async () => {
    const permission = await common.checkPermissions()
    if (permission === true) {
      try {
        const results = await DocumentPicker.pickMultiple({
          type: [DocumentPicker.types.allFiles],
          //There can me more options as well find above

        });

        this.setState({ AttachmentFile: results })
      }
      catch (err) {
        //Handling any exception (If any)
        if (DocumentPicker.isCancel(err)) {
          //If user canceled the document selection
          alert('Canceled from multiple doc picker');
        } else {
          alert('Unknown Error: ' + err);
          throw err;
        }
      }
    } else {
      alert("Please check permissions")
    }
  }
  renderProjectItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{ margin: "2%" }} onPress={() => {
        this.setState({ Project: [item.id, item.name], modalOfProject: false })
      }} >
        <Text style={{ fontSize: 17 }}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  renderTaskTypeItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{ margin: "2%" }} onPress={() => {
        this.setState({ TaskType: [item.id, item.name], modalOfTaskType: false })
      }} >
        <Text style={{ fontSize: 17 }}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  renderUserItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{ margin: "2%" }} onPress={() => {
        this.setState({ AssignTo: [item.id, item.name], modalOfAssignTo: false })
      }} >
        <Text style={{ fontSize: 17 }}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  renderPartnerItem = ({ item }) => (
    <TouchableOpacity style={styles.eachView} onPress={() => {
      this.setState({ RequestBy: [item.id, item.name], modalOfRequestBy: false })
    }} >
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ fontSize: 17 }}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
  onDateChange =  date => {
    const date_deadline =  moment(date).format("YYYY-MM-DD")
    this.setState({
      Deadline: date_deadline,
      modalVisible: false,
    });
  };
  onCloseModal = (modalName) => () => {
    switch (modalName) {
      case "Project":
        this.setState({ modalOfProject: false })
        break;
      case "TaskType":
        this.setState({ modalOfTaskType: false })
        break;
      case "AssignTo":
        this.setState({ modalOfAssignTo: false })
        break;
      case "RequestBy":
        this.setState({ modalOfRequestBy: false })
        break;
      case "Calendar":
        this.setState({ modalVisible: false })
        break;
      default:
        break;
    }
  }
  onOpenModal = (modalName) => () => {
    switch (modalName) {
      case "Project":
        this.setState({ modalOfProject: true })
        break;
      case "TaskType":
        this.setState({ modalOfTaskType: true })
        break;
      case "AssignTo":
        this.setState({ modalOfAssignTo: true })
        break;
      case "RequestBy":
        this.setState({ modalOfRequestBy: true })
        break;
      case "Calendar":
        this.setState({ modalVisible: true })
        break;
      default:
        break;
    }
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={this.onCloseModal("Calendar")}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CalendarPicker onDateChange={this.onDateChange} />
            </View>
          </View>
          <View style={{ position: "absolute", bottom: 0, top: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)" }} onTouchStart={this.onCloseModal("Calendar")} />

        </Modal>
        <Modal
          animationType="slide"
          visible={this.state.modalOfProject}
          onRequestClose={this.onCloseModal("Project")}>

          {/* header modal */}
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              textAlign: 'center',
              fontWeight: 'bold',
              flex: 1,
              borderBottomWidth: 1
            }}>
            Project
              </Text>
          {/* body */}
          <View style={{ flex: 9 }} >
            <FlatList
              data={this.props.listProject.data}
              renderItem={this.renderProjectItem}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '2%',
                width: '70%',
                height: 50,
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 8
              }}
              onPress={this.onCloseModal("Project")}>
              <Text
                style={{
                  fontSize: 20,
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
          visible={this.state.modalOfTaskType}
          onRequestClose={this.onCloseModal("TaskType")}>

          {/* header modal */}
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              textAlign: 'center',
              fontWeight: 'bold',
              flex: 1,
              borderBottomWidth: 1
            }}>
            Task Type
              </Text>
          {/* body */}
          <View style={{ flex: 9 }}>
            <FlatList
              data={this.props.listTaskType.data}
              renderItem={this.renderTaskTypeItem}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '2%',
                width: '70%',
                height: 50,
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 8
              }}
              onPress={this.onCloseModal("TaskType")}>
              <Text
                style={{
                  fontSize: 20,
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
          visible={this.state.modalOfAssignTo}
          onRequestClose={this.onCloseModal("AssignTo")}>

          {/* header modal */}
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              textAlign: 'center',
              fontWeight: 'bold',
              flex: 1,
              borderBottomWidth: 1
            }}>
            AssignTo
              </Text>
          {/* body */}
          <View style={{ flex: 9 }}>
            <FlatList
              data={this.props.listUser.data}
              renderItem={this.renderUserItem}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '2%',
                width: '70%',
                height: 50,
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 8
              }}
              onPress={this.onCloseModal("AssignTo")}>
              <Text
                style={{
                  fontSize: 20,
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
          visible={this.state.modalOfRequestBy}
          onRequestClose={this.onCloseModal("RequestBy")}>
          {/* header modal */}
          <Text
            style={{
              fontSize: 20,
              marginTop: 10,
              textAlign: 'center',
              fontWeight: 'bold',
              flex: 1
            }}>
            RequestBy
              </Text>
          {/* body */}
          <View style={{ flex: 9 }}>
            <View style={{
              flexDirection: 'row',
              borderColor: '#e5e5e5',
              backgroundColor: '#ffffff',
              borderRadius: 5,
              elevation: 2,
              paddingHorizontal: 10,
              alignItems: 'center',
              margin: 5,
            }}>
              <TextInput
                onChangeText={value => this.handleSearch(value)}
                value={this.state.searchPartnerText}
                placeholder="Search partner..."
                placeholderTextColor="#e5e5e5e5"
                style={{
                  flex: 1,
                  color: '#555555',
                  fontSize: 16,
                  paddingVertical: 5,
                }}

              />
              {this.renderSearchButton()}
              {this.renderClearButton()}
            </View>
            <FlatList
              data={this.props.listPartner.data}
              renderItem={this.renderPartnerItem}
              keyExtractor={(item, index) => `${index}`}
            />
          </View>
          {/* footer modal */}
          <View style={{ borderTopWidth: 1, alignItems: 'center', flex: 1 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#4876FF',
                marginTop: '2%',
                width: '70%',
                height: 50,
                alignItems: "center",
                justifyContent: 'center',
                borderRadius: 8
              }}
              onPress={this.onCloseModal("RequestBy")}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  color: 'white',
                }}>
                Cancel
                  </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', marginTop: 30 }}>
            <Text style={styles.TextStyle}>Task Title:</Text>
            <View style={{ marginLeft: 'auto' }}>

              <StarRating
                starStyle={{ marginLeft: 2.5 }}
                disabled={false}
                maxStars={3}
                starSize={20}
                fullStarColor="#ffc107"
                emptyStarColor="#ffc107"
                rating={Number(this.state.Priority)}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
              />
            </View>
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Title"
              placeholderTextColor="#C0C0C0"
              onChangeText={value => this.setState({ Title: value })}
              style={styles.TextInputStyle}
              value={this.state.Title}
             
            />
          </View>
          <View style={{ marginTop: 5 }}>
            <Text style={styles.TextStyle}>Project:</Text>
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Project"
              placeholderTextColor="#C0C0C0"
              value={this.state.Project[1]}
              onChangeText={value => this.setState({ Project: value })}
              style={styles.TextInputStyle}
              editable={false}
            />
            <TouchableOpacity onPress={this.onOpenModal("Project")} >
              <Icon
                name="angle-down"
                backgroundColor=""
                color="grey"
                size={30}
                style={{ marginTop: 8, marginLeft: 20 }}
              />
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 5 }}>
            <Text style={styles.TextStyle}>Task Type:</Text>
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Task Type"
              placeholderTextColor="#C0C0C0"
              value={this.state.TaskType[1]}
              onChangeText={(value) => this.setState({ TaskType: value })}
              style={styles.TextInputStyle}
              editable={false}
            />
            <TouchableOpacity onPress={this.onOpenModal("TaskType")}>
              <Icon
                name="angle-down"
                backgroundColor=""
                color="grey"
                size={30}
                style={{ marginTop: 8, marginLeft: 20 }}
              />
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 5 }}>
            <Text style={styles.TextStyle}>Request By:</Text>
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Request By"
              placeholderTextColor="#C0C0C0"
              value={this.state.RequestBy?.[1] ?? ""}
              onChangeText={value => this.setState({ RequestBy: value })}
              style={styles.TextInputStyle}
              editable={false}
            />
            <TouchableOpacity onPress={this.onOpenModal("RequestBy")} >
              <Icon
                name="angle-down"
                backgroundColor=""
                color="grey"
                size={30}
                style={{ marginTop: 8, marginLeft: 20 }}
              />
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 5 }}>
            <Text style={styles.TextStyle}>Assign To:</Text>
          </View>
          <View style={styles.inputField}>
            <TextInput
              placeholder="Assign To"
              placeholderTextColor="#C0C0C0"
              value={this.state.AssignTo[1]}
              onChangeText={value => this.setState({ AssignTo: value })}
              style={styles.TextInputStyle}
              editable={false}
            />
            <TouchableOpacity onPress={this.onOpenModal("AssignTo")} >
              <Icon
                name="angle-down"
                backgroundColor=""
                color="grey"
                size={30}
                style={{ marginTop: 8, marginLeft: 20 }}
              />
            </TouchableOpacity>
          </View>


          <View style={{ marginTop: 5 }}>
            <Text style={styles.TextStyle}>Deadline:</Text>
          </View>
          <View style={styles.inputField}>

            <TextInput
              style={{ width: '88%', height: '100%' }}
              value={moment(this.state.Deadline).format('DD-MM-YYYY').toString()}
              editable={false}
            />
            <Icon
              style={{  marginTop: 13,marginLeft:13 }}
              name="calendar"
              backgroundColor=""
              color="grey"
              size={25}
              onPress={this.onOpenModal("Calendar")}
            />
          </View>

          <View style={{ marginTop: 5 }}>
            <Text style={styles.TextStyle}>Attachments</Text>
          </View>
          <View style={{ flexDirection: "row", width: "100%", height: 50 }}>
            <Icon
              style={{ margin: 3, marginLeft: 6 }}
              name="camera"
              backgroundColor=""
              color="grey"
              size={30}
              onPress={() => this.selectMultipleFile()}
            />
            {this.state.AttachmentFile.map((item, key) => (
              <View style={styles.attachFile} key={key}>
                <Icon
                  name="file-o"
                  style={{ marginTop: 5, marginLeft: 5 }}
                />
                <Text style={{ marginLeft: 7, flex: 1 }} >
                  {item.name ? item.name : ''}
                </Text>
              </View>
            ))}
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text style={styles.TextStyle}>Description</Text>
          </View>
          <View style={styles.TextInputStyleDescription}>
            <TextInput
              editable={false}
              multiline={true}
              value={String(this.state.Description)}
              onChangeText={value => this.setState({ Description: value })}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
function mapStateToProps(state) {
  return {
    detailTask: state.TaskReducer.taskDetail,
    listProject: state.ProjectReducer.listProject,
    listTaskType: state.ProjectTypeReducer.listTaskType,
    listUser: state.UserReducer.listUserOfProject,
    listPartner: state.PartnerReducer.listPartner,
    editStatus: state.TaskReducer.editStatus,
    createStatus: state.AttachmentReducer.createStatus
  };
}
export default withGlobalContext(
  connect(mapStateToProps, { getDetailTask, createTask, getProjectByCompany, getAllTaskType, getListUserByProject, getListPartner, editTask, searchPartner, createAttachment })(TaskEditor),
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputField: {
    marginLeft: 4,
    borderBottomWidth: 1,
    marginHorizontal: 0,
    flexDirection: 'row',
    width: '98%',
    borderColor: "#E5E5E5", 

   
  },
  TextInputStyle: {
    width: '88%',
    paddingVertical:0,
    //marginBottom: -8,
    fontSize: 15,
    color: "#555555"
  },
  TextStyle: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
    color:"#555555"
  },
  TextInputStyleDescription: {
    left: '1.5%',
    width: '97%',
    borderWidth: 2,
    borderRadius: 5,
    height: 100,
    borderColor:"#E5E5E5"
  },
  Calendar: {
    flexDirection: 'row',
    borderColor: "#FFF",
    width: '100%',
    height: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 100
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,

  },
  eachView: {
    width: '98%',
    padding: 5,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#fffffe',
    borderColor: "#C0C0C0",
    borderWidth: 0.5,
    margin: "1%"
  },
  attachFile: {
    flex: 1,
    height: "auto",
    width: "30%",
    flexDirection: "row",
    borderColor: "#C0C0C0",
    borderWidth: 0.5,
    margin: 3,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: '#fffffe',
  }
});
