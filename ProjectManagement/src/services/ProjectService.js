import BaseService from './BaseService'
 
 class ProjectService extends BaseService{
    constructor() {
        super();
        this.model = "project.project"
    }
    getProjectByCompany = (domain, field) =>{
        return new Promise((resolve, reject)=>{
            this.search_read(domain, field).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    getDetailProject = (domain, field) =>{
        
        return new Promise((resolve , reject)=>{
            this.search_read(domain, field).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
    editProject = (id, editdata)=>{
        console.log("services")
        return new Promise((resolve, reject)=>{
            this.write(id, editdata).then(resp =>{
                resolve(resp)
            }).catch(error =>{
                reject(error)
            })
        });
    }
 }
export default ProjectService