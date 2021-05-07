import BaseService from './BaseService';

class CheckListTaskService extends BaseService {
  constructor() {
    super();
    this.model = 'checklist.task.instance';
  }
  getCheckListTask = (domain, field, offset, limit) => {
    return new Promise((resolve, reject) => {
      this.search_read(domain, field, offset, limit)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  getListCheckListType= () => {
    return new Promise((resolve, reject) => {
      this.getCheckListType()
        .then(resp => {
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
  
  deleteCheckListItem= (data) => {
    return new Promise((resolve, reject) => {
      this.unlink(data)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  };

  createCheckListItem= (data) => {
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
}
export default CheckListTaskService;
