import BaseService from './BaseService'

class ProjectTypeService extends BaseService {
    constructor() {
        super();
        this.model = "project.type"
    }
    getProjectType = (domain, field) => {
        return new Promise((resolve, reject) => {
            this.search_read(domain, field).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
}
export default ProjectTypeService