import _ from 'underscore'
import UserService from '../services/UserService';
import {dataStatus, userProfile} from '../utility/config';
import CheckListTaskService from '../services/CheckListTaskService';
import CreateCheckListTaskService from '../services/CreateCheckListService';
class CheckListTaskBussniess {
  getListCheckList = async (data, success, failed) => {
    try {
      console.log(`data:`, data)
      const checkListService = new CheckListTaskService();
      const domain = [['id', '=', data.idCheckList]];
      const fields = [];
      const result = await checkListService.getCheckListTask(
        domain,
        fields,
        0,
        0,
      );
      if (result.status === dataStatus.SUCCESS) {
        const objChecklistGroup = _.groupBy(result.data, (item) => {
          return item.res_id
        })
        const ListChecklist = _.map(objChecklistGroup, (value, key) => {
          return {
            id: key,
            title: value[0].res_name,
            value
          }
        })
        const resultCheckList = {
          status : result.status,
          data : ListChecklist
        }
        console.log(`listChecklistGroup: `, resultCheckList)
        success(resultCheckList);
      } else {
        failed(result);
      }
    } catch (error) {
      console.log(`Error: `, error)
      failed(error);
    }
  };

  createCheckList = async (data, success, failed) => {     // create for title check list
    try {
      const checkListService = new CreateCheckListTaskService();
      const args = {
        'task_id' : data.idTask , 
        'name' : data.nameCheckList,
      }
      const result = await checkListService.createCheckListTask(args);
      console.log('RESULT-------------------------', result);
      const createCheckListTitleResult = await checkListService.createCheckListTitle(result.data);
      console.log('CheckListTitleResult-----------------', createCheckListTitleResult);
      if (result.status === dataStatus.SUCCESS) {
        success(result);
      } else {
        failed(result);
      }
    } catch (error) {
      failed(error);
    }
  };

  getListCheckListType = async (success, failed) => {
      const checkListService = new CheckListTaskService();
      const result = await checkListService.getCheckListType();
      console.log("CHECK LIST TYPE -------------------",result)
      if (result.status === dataStatus.SUCCESS) {
        success(result);
      } else {
        failed(result);
      }
  };

  createCheckListItem = async (data, success, failed) => {   // create for items check list
    console.log("DATA ITEMS -------", data);
    try {
      const checkListService = new CheckListTaskService();
      const args = {
        "checklist_id" : false,
        "name": data.name,
        "res_id": data.res_id,
        "res_model": "project.task.checklist",
        "type": data.type,
      }
      console.log("ARGS---------", args);
      const result = await checkListService.createCheckListItem(args);
      console.log('RESULT-------------------------', result);
      if (result.status === dataStatus.SUCCESS) {
        success(result);
      } else {
        failed(result);
      }
    } catch (error) {
      failed(error);
    }
  };

  deleteCheckListItem = async (data, success, failed) => {   // delete for items check list
    try {
      console.log("DATA-----------------", data);
      const checkListService = new CheckListTaskService();
      const args = [data.idItem];
      const result = await checkListService.deleteCheckListItem(args);
      console.log('RESULT-------------------------', result);
      if (result.status === dataStatus.SUCCESS) {
        success(result);
      } else {
        failed(result);
      }
    } catch (error) {
      failed(error);
    }
  };
}

export default CheckListTaskBussniess;
