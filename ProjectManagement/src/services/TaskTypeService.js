import BaseService from './BaseService'

class TaskTypeService extends BaseService {
    constructor() {
        super();
        this.model = "project.task.type"
    }
    getTaskType = (domain, field) => {
        return new Promise((resolve, reject) => {
            this.search_read(domain, field).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
}
export default TaskTypeService