import BaseService from './BaseService'

class TaskService extends BaseService {
    constructor() {
        super();
        this.model = "project.task"
    }
    getListTask = (domain, field , offset = 0 , limits= 5) => {
        return new Promise((resolve, reject) => {
            this.search_read(domain, field,offset,limits).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
    getDetailTask = (domain, field) =>{
        return new Promise((resolve , reject)=>{
            this.search_read(domain, field).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    createTask = (data)=>{
        return new Promise((resolve , reject)=>{
            this.create(data).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editTask = (id, editdata)=>{
        return new Promise((resolve , reject)=>{
            this.write(id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
}
export default TaskService