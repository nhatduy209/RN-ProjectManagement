import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { deleteCheckListItem ,getListCheckList} from '../../redux/action/checkListTask/CheckListTaskAction'
import { createCheckListItem } from '../../redux/action/checkListTask/CheckListTaskAction';
import { maxWidthScreen } from '../../utility/config';
export class RenderCheckList extends React.Component {

  constructor() {
    super();
    this.state = {
      isShowEnterChecklistTitle: true,
      modalVisible: false,
      checkListTitle: '',
      isChecked: false,
      nameCheckList: '',
    };
    this.showAddCheckListButton = true;
    this.checkListTypeSelected = '';
    this.res_id = null;
    this.addingChecklistItem = false;
  }

  setModalVisible = () => {
    console.log(this.state.modalVisible);
    if (this.state.modalVisible) {
      this.setState({ modalVisible: false });
    }
    else {
      this.setState({ modalVisible: true });
    }
  }

  componentDidUpdate() {
    if(this.addingChecklistItem){
      console.log('CREATE -------' , this.props.checkListItem);
    }
  }

  handleCheck = (value) => {
    // this.setState({checkListTypeSelected : value});
    this.checkListTypeSelected = value
    console.log('Selected : ', this.checkListTypeSelected);
  }

  handleNameCheckList = (value) => {
    this.setState({ nameCheckList: value });
    console.log(this.state.nameCheckList);
  }

  addCheckListItem = () => {
    // call action add check list item
    this.props.createCheckListItem(
      this.state.nameCheckList,
      this.res_id,
      this.checkListTypeSelected
    )

    this.addingChecklistItem = true;
    this.setState({ modalVisible: false });

  }

  renderModalView = (item) => {
    this.res_id = item.id;
    return (
      <Modal
        transparent={true}
        visible={this.state.modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row' }}>
              <TextInput placeholder="Name check list"
                style={styles.inputNameCheckList}
                onChangeText={(value) => this.handleNameCheckList(value)}
              ></TextInput>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {
                this.props.checkListType.data.types.map((item, index) => {
                  return (
                    <View style={{ padding: 5 }}>
                      <Text> {item.name}</Text>
                      <CheckBox
                        style={{ alignSelf: 'center' }}
                        value={this.state.isChecked}
                        onValueChange={() => this.handleCheck(item.value)}
                      >
                      </CheckBox>
                    </View>
                  );
                })
              }

            </View>
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity
                style={[styles.button, styles.buttonAdd]}
                onPress={this.addCheckListItem}
              >
                <Text style={styles.textStyle}>Add Check List</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={this.setModalVisible}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    );
  }

  deleteItem = (itemId) => {
    console.log("ITEM SELECT TO DELETE", itemId);
    this.props.deleteCheckListItem(itemId);
  }

  render() {
    return (
      <View style={{
        borderColor: '#e5e5e5',
        borderRadius: 5,
        padding: 7,
        //borderWidth: 0.5,
        backgroundColor: '#ffff',
        marginVertical: 5,
        elevation: 2
      }}>
        {this.renderModalView(this.props.item)}
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <Text style={{ fontSize: 15, flex: 1, alignSelf: 'center' }}>
            {' '}
              Check List : {this.props.item.title}
          </Text>
          <TouchableOpacity onPress={this.setModalVisible} >
            <Icon
              name="plus"
              backgroundColor=""
              color="#e5e5e5"
              style={{ marginLeft: 'auto', padding: 10 }}
              size={20}
            />
          </TouchableOpacity>
        </View>
        {
          this.props.item.value.map((item, index) => {
            if (item.name) {
              return (
                <View style={{ flexDirection: 'row', padding: 4, borderBottomWidth: 0.5, borderColor: '#e5e5e5e5', alignItems: 'center' }} >
                  <Text style={{ alignSelf: 'center', fontSize: 13 }}>
                    {item.name}
                  </Text>
                  <View style={{ flexDirection: 'row', marginLeft: 'auto', padding: 10 }}>
                    <TouchableOpacity>
                      <Icon
                        name="pencil"
                        backgroundColor=""
                        color="grey"
                        style={{ marginLeft: 'auto' }}
                        size={19}
                        style={{ marginRight: 15 }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.deleteItem(item.id)}>
                      <Icon
                        name="trash"
                        backgroundColor=""
                        color="grey"
                        style={{ marginLeft: 'auto' }}
                        size={19}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              )
            }
          })
        }
      </View>
    )
  }
}



function mapStateToProps(state) {
  return {
    checkList: state.CheckListTaskReducer.listCheckList,
    checkListType: state.CheckListTypeReducer.listCheckListType,
    checkListItem : state.CheckListTaskReducer.createCheckListItem,
    detailTask: state.TaskReducer.taskDetail,
  };
}
export default connect(mapStateToProps, {deleteCheckListItem, createCheckListItem ,getListCheckList})(RenderCheckList);

const styles = StyleSheet.create({
  textStyle: {
    marginRight: 2,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#555555',
  },
  button: {
    borderWidth: 1,
    width: 100,
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
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  buttonAdd: {
    backgroundColor: '#7cfccccc'
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
