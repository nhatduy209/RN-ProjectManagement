import {sin} from 'react-native/Libraries/Animated/Easing';
import TaskService from '../services/TaskService';
import TaskTypeService from '../services/TaskTypeService';
import {dataStatus} from '../utility/config';
import TaskBusiness from './TaskBusiness';
import {userProfile} from '../utility/config';
class TaskTypeBusiness {
  getAllTaskType = async (success, failed) => {
    const taskFields = [
      'create_date',
      'priority',
      'name',
      'creator_id',
      'write_date',
      'date_deadline',
      'user_id',
      'project_id',
      'stage_id',
      'type_id',
      'sprint_id',
      'date_end',
      'description',
      'checklist_task_instance_ids',
    ];
    try {
      let ResultData = {status: '', message: '', data: []};
      const taskTypeService = new TaskTypeService();
      const TaskServices = new TaskService();
      const domain = [];
      const field = ['name'];
      const result = await taskTypeService.getTaskType(domain, field);
      if (result.status === dataStatus.SUCCESS) {
        ResultData.status = result.status;
        //  tempArray.message = result.message;
        for (let i = 0; i < result.data.length; i++) {
          let stageTask = {
            id: 0,
            name: '',
            listTask: [],
          };
          const taskDomain = [
            '|',
            ['user_id', '=', userProfile.uid],
            ['contributor_ids.id', '=', userProfile.uid],
            ['stage_id', '=', result.data[i].id],
          ];
          stageTask.id = result.data[i].id;
          stageTask.name = result.data[i].name;
          stageTask.listTask = await TaskServices.getListTask(
            taskDomain,
            taskFields,
            0,
            5,
          );
          ResultData.data.push(stageTask);
        }
        success(ResultData);
      } else {
        failed(result);
      }
    } catch (error) {
      failed(error);
    }
  };
  
  getListTaskType = async (success, failed) => {
   
    try {
      
      const taskTypeService = new TaskTypeService();
   
      const domain = [];
      const field = ['name'];
      const result = await taskTypeService.getTaskType(domain, field);
      if (result.status === dataStatus.SUCCESS) {
        success(result);
      } else {
        failed(result);
      }
    } catch (error) {
      failed(error);
    }
  };
  searchTaskType = async (data,success, failed) => {
    console.log("BUSINESS_____________________",data);
    const taskFields = [
      'create_date',
      'priority',
      'name',
      'creator_id',
      'write_date',
      'date_deadline',
      'user_id',
      'project_id',
      'stage_id',
      'type_id',
      'sprint_id',
      'date_end',
      'description',
      'checklist_task_instance_ids',
    ];
    try {
      let ResultData = {status: '', message: '', data: []};
      const taskTypeService = new TaskTypeService();
      const TaskServices = new TaskService();
      const domain = [];
      const field = ['name'];
      const result = await taskTypeService.getTaskType(domain, field);
      if (result.status === dataStatus.SUCCESS) {
        ResultData.status = result.status;
        //  tempArray.message = result.message;
        for (let i = 0; i < result.data.length; i++) {
          let stageTask = {
            id: 0,
            name: '',
            listTask: [],
          };
          const taskDomain = [
            '|',
            ['user_id', '=', userProfile.uid],
            ['contributor_ids.id', '=', userProfile.uid],
            ['stage_id', '=', result.data[i].id],
            ['name', 'ilike',data ]
          ];
          stageTask.id = result.data[i].id;
          stageTask.name = result.data[i].name;
          stageTask.listTask = await TaskServices.getListTask(
            taskDomain,
            taskFields,0,0
          );
          ResultData.data.push(stageTask);
        }
        success(ResultData);
      } else {
        failed(result);
      }
    } catch (error) {
      failed(error);
    }
  };
}

export default TaskTypeBusiness;
