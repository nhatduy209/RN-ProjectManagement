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
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { createTask } from '../../redux/action/taskAction/TaskAction';
import CalendarPicker from 'react-native-calendar-picker';
import DatePicker from 'react-native-date-picker'
import StarRating from 'react-native-star-rating';
import DocumentPicker from 'react-native-document-picker';
import { getProjectByCompany } from '../../redux/action/projectAction/ProjectAction'
import { getAllTaskType } from '../../redux/action/projectTypeAction/ProjectTypeAction'
import { getListUserByProject } from '../../redux/action/userAction/UserAction'
import { getListPartner, searchPartner } from '../../redux/action/partnerAction/PartnerAction'
import {getListTaskTypeReallllll,getListTaskType} from '../../redux/action/taskTypeAction/TaskTypeAction'
import {getListCheckListType } from '../../redux/action/checkListTask/CheckListTaskAction';

import { withGlobalContext } from '../../GlobalContextProvider';
import { connect } from 'react-redux';
import { dataStatus, userProfile } from '../../utility/config'

import moment from 'moment';
import common from '../../utility/common';


class NewTaskScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      modalOfProject: false,
      modalOfTaskType: false,
      modalOfAssignTo: false,
      modalOfRequestBy: false,
      modalOfStage:false,

      Deadline: moment().format('YYYY-MM-DD'),
      Title: '',
      Project: '',
      TaskType: '',
      RequestBy: '',
      AssignTo: '',
      Priority: "1",
      Description: "",
      Stage: "",
      AttachmentFile: [],

      isSearchPartner: false,
      searchPartnerText: ""
    };
    this.onSave.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      title: 'New Task Screen',
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
    this.props.getListPartner()
    this.props.getListTaskTypeReallllll()
  }
  componentDidUpdate(prevProps) {
    if (this.props.createStatus !== prevProps.createStatus) {
      if (this.props.createStatus.status === dataStatus.SUCCESS) {
        this.props.getListTaskType();
        this.props.getListCheckListType();
      }
    }
    if (this.props.listTaskType !== prevProps.listTaskType) {
      if (this.props.listTaskType.status === dataStatus.SUCCESS) {
        this.props.navigation.navigate('TaskScreen');
      }
    }
  }
  onSave = () => {
    if (this.state.Title === ''|| this.state.AssignTo ==="" ||this.state.Stage ==="") {
      Alert.alert("Vui lòng nhập đầy đủ thông tin!")
    }else{
      const createdata = {
        "name": this.state.Title,
        "date_deadline": this.state.Deadline,
        "project_id": this.state.Project?.[0] ?? false,
        "type_id": this.state.TaskType?.[0] ?? false,
        "creator_id": this.state.RequestBy?.[0] ??false,
        "user_id": this.state.AssignTo?.[0] ??false,
        "priority": this.state.Priority,
        "description": this.state.Description,
        "stage_id": this.state.Stage?.[0] ?? false
      }
      this.props.createTask(createdata)
    }
  };
  onStarRatingPress(rating) {
    this.setState({
      Priority: String(rating)
    });
  }

  onSelectProject = (item) => () => {
    this.props.getListUserByProject(item.id)
    this.setState({ Project: [item.id, item.name], modalOfProject: false })
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
          />
        </TouchableOpacity>
      );
    }
  }
  emptyComponent = () => {
    return (
      <View style={styles.emptyItem}>
        <Icon5
          size={60}
          name="box-open"
          color="#e5e5e5e5"
        />
        <Text style={{ textAlign: 'center', color: '#e5e5e5e5', fontSize: 22, fontWeight: 'bold' }}> Danh sách trống </Text>
      </View>
    );
  };
  renderProjectItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{ margin: "2%" }} onPress={this.onSelectProject(item)} >
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
  renderStageItem = ({ item }) => (
    <View style={{ flexDirection: 'row', borderTopWidth: 1 }}>
      <TouchableOpacity style={{ margin: "2%" }} onPress={() => {
        this.setState({ Stage: [item.id, item.name], modalOfStage: false })
      }} >
        <Text style={{ fontSize: 17 }}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
  onDateChange = date => {
    const date_deadline = moment(date).format("YYYY-MM-DD")
    this.setState({
      Deadline: date_deadline.toString(),
      modalVisible: false,
    });
  };
  render() {
    return (
      <>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setState({ modalVisible: false });
          }}>

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <CalendarPicker onDateChange={value => this.onDateChange(value)} />
            </View>
          </View>
          <View style={{ position: "absolute", bottom: 0, top: 0, left: 0, right: 0, backgroundColor: "rgba(0,0,0,0.5)" }} onTouchStart={() => this.setState({ modalVisible: false })} />

        </Modal>
        <Modal
          animationType="slide"
          visible={this.state.modalOfProject}
          onRequestClose={() => {
            this.setState({ modalOfProject: false });
          }}>

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
          <View style={{ flex: 9 }}>
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
              onPress={() => this.setState({ modalOfProject: false })}>
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
          onRequestClose={() => {
            this.setState({ modalOfTaskType: false });
          }}>

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
              // data={this.state.listTaskType}
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
              onPress={() => this.setState({ modalOfTaskType: false })}>
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
          onRequestClose={() => {
            this.setState({ modalOfAssignTo: false });
          }}>

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
              ListEmptyComponent={this.emptyComponent}
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
              onPress={() => this.setState({ modalOfAssignTo: false })}>
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
          visible={this.state.modalOfStage}
          onRequestClose={() => {
            this.setState({ modalOfStage: false });
          }}>

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
            Stage
              </Text>
          {/* body */}
          <View style={{ flex: 9 }}>
            <FlatList
              data={this.props.realListTaskType.data}
              renderItem={this.renderStageItem}
              keyExtractor={(item, index) => `${index}`}
              ListEmptyComponent={this.emptyComponent}
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
              onPress={() => this.setState({ modalOfStage: false })}>
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
          onRequestClose={() => {
            this.setState({ modalOfRequestBy: false });
          }}>

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
              ListEmptyComponent={this.emptyComponent}
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
              onPress={() => this.setState({ modalOfRequestBy: false })}>
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
        <KeyboardAvoidingView enabled style={{ flex: 1 }}>
          <ScrollView style={{
            flex: 1, backgroundColor: "white"
          }}>
            <View style={{ backgroundColor: "white" }}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Text style={styles.TextStyle}>Task Title:</Text>
                <View style={{ right: 10 }}>
                  <StarRating
                    starStyle={{ marginLeft: 4 }}
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
                <TouchableOpacity onPress={() => { this.setState({ modalOfProject: true }) }} >
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
                  onChangeText={value => this.setState({ TaskType: value })}
                  style={styles.TextInputStyle}
                  editable={false}
                />
                <TouchableOpacity onPress={() => { this.setState({ modalOfTaskType: true }) }}>
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
                <TouchableOpacity onPress={() => { this.setState({ modalOfRequestBy: true }) }} >
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
                <TouchableOpacity onPress={() => { this.setState({ modalOfAssignTo: true }) }}>
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
                <Text style={styles.TextStyle}>Stage:</Text>
              </View>
              <View style={styles.inputField}>
                <TextInput
                  placeholder="Stage"
                  placeholderTextColor="#C0C0C0"
                  value={this.state.Stage[1]}
                  onChangeText={value => this.setState({ Stage: value })}
                  style={styles.TextInputStyle}
                  editable={false}
                />
                <TouchableOpacity onPress={() => { this.setState({ modalOfStage: true }) }}>
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
                  placeholder="Calendar"
                  placeholderTextColor="#C0C0C0"
                  style={{ width: '88%', height: '100%' }}
                  value={moment(this.state.Deadline).format("DD-MM-YYYY").toString()}
                  editable={false}
                />
                <Icon
                  style={{ marginTop: 13,marginLeft:13 }}
                  name="calendar"
                  backgroundColor=""
                  color="grey"
                  size={25}
                  onPress={() => this.setState({ modalVisible: true })}
                />
              </View>

              <View style={{ marginVertical: 5  }}>
                <Text style={styles.TextStyle}>Description</Text>
              </View>
              <View style={styles.TextInputStyleDescription}>
                <TextInput
                  placeholder="Description"
                  placeholderTextColor="#C0C0C0"
                  multiline={true}
                  value={String(this.state.Description)}
                  onChangeText={value => this.setState({ Description: value })}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </>
    );
  }
}
function mapStateToProps(state) {
  return {
    listProject: state.ProjectReducer.listProject,
    listTaskType: state.ProjectTypeReducer.listTaskType,
    listUser: state.UserReducer.listUserOfProject,
    listPartner: state.PartnerReducer.listPartner,
    createStatus: state.TaskReducer.createStatus,
    realListTaskType:state.TaskTypeReducer.realListTaskType,
    listTaskType: state.TaskTypeReducer.listTaskType
  };
}
export default connect(mapStateToProps, {
  createTask, getProjectByCompany, getAllTaskType, getListUserByProject, getListPartner, searchPartner,getListTaskTypeReallllll,getListTaskType,getListCheckListType
})(NewTaskScreen)

const styles = StyleSheet.create({
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
    zIndex: 100,
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
    margin: "1%",
    borderColor: "#C0C0C0",
    borderWidth: 0.5
  },
  emptyItem: {
    borderRadius: 5,
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#ffffff',
    elevation: 2,
    alignItems: 'center'
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
