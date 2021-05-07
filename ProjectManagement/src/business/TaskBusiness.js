import TaskService from '../services/TaskService'
import { dataStatus, userProfile } from '../utility/config';

class TaskBusiness {
    getListTask = async (data,success, failed) => {
        
        try {
            const task = new TaskService();
            const domain =[
                "|",
                [
                    "user_id",
                    "=",
                    userProfile.uid
                ],
                [
                    "contributor_ids.id",
                    "=",
                    userProfile.uid
                ],
                [
                    "stage_id",
                    "=",
                    data.stage_id
                ]
            ];
            const fields = [
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
                "checklist_task_instance_ids",
            ];
            const result = await task.getListTask(domain,fields,data.offset , data.limit)
            if (result.status === dataStatus.SUCCESS) {
                for(let i = 0 ; i < result.data.length ; i++)
                {
                    data.currentList.push(result.data[i]);
                }
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    getDetailTask = async (data, success, failed)=>{
        try {
            const task = new TaskService()
            const { idTask } = data
            const domain = [
                [
                    "id",
                    "=",
                    idTask
                ]
                
            ]
            const field = [
                // "members",
                // "project_id",
                // "name",
                // "product_backlog_id_domain",
                // "sprint_id",
                // "type_id",
                // "date_deadline",
                // "date_assign",
                // "description",
                // "creator_id",
                // "create_date",
                // "team_id",
                // "user_id",
                // "priority"
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
                "checklist_task_instance_ids",
            ]
            const result = await task.getDetailTask(domain,field)
            const resultnew = {
                status: result.status,
                data: result.data[0],
                message: result?.message ?? "no message"
            }
            if (result.status === dataStatus.SUCCESS) {
         
                success(resultnew);
            }
            else {
                failed(resultnew);
            }
        } catch (error) {
            failed(error)
        }
    }
    createTask = async (data, success, failed) =>{
        try {
            const task = new TaskService()
            const {createData} = data
            const result = await task.createTask(createData)
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    editTask = async (data, success, failed)=>{
        try {
            const task = new TaskService()
            const {idTask, editdata} = data
            const id=[
                idTask
            ]
            const result = await task.editTask(id,editdata)
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
    getListTaskOfProject = async (data, success, failed)=>{
        try {
            const task = new TaskService();
            const {listIdTask} = data
            const domain =[
                [
                    "id",
                    "=",
                    listIdTask
                ]
            ];
            const fields = [
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
            ];
            const result = await task.getListTask(domain,fields,0,0)
            if (result.status === dataStatus.SUCCESS) {
                success(result);
            }
            else {
                failed(result);
            }
        } catch (error) {
            failed(error)
        }
    }
} 

export default TaskBusiness