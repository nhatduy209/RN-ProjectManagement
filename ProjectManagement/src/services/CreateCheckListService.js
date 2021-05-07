import BaseService from './BaseService';

class CreateCheckListTaskService extends BaseService {
  constructor() {
    super();
    this.model =  "project.task.checklist";
  }
  createCheckListTask = (data) => {
    return new Promise((resolve, reject) => {
      this.create(data)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  createCheckListTitle= (data) => {
    return new Promise((resolve, reject) => {
      this.callButton(data)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}
export default CreateCheckListTaskService;
