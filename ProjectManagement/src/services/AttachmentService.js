import BaseService from './BaseService';

class AttachmentService extends BaseService {
  constructor() {
    super();
    this.model = 'storage.file';
  }
  createAttachment = (domain) => {
    return new Promise((resolve, reject) => {
      this.create_attachment(domain)
        .then(resp => {
          resolve(resp);
        })
        .catch(error => {
          reject(error);
        });
    });
  };
}
export default AttachmentService;
