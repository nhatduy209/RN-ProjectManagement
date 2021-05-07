import ProjectTypeService from '../services/ProjectTypeService'
import { dataStatus } from '../utility/config';

class ProjectTypeBusiness {
    getAllProjectType = async ( success, failed)=>{
        try {
            const projectTypeService = new ProjectTypeService()
            const domain = [
                [
                    "project_ok","=",true
                ]
            ]
            const field = [
                "name",
                "display_name"
            ]
            const result = await projectTypeService.getProjectType(domain,field)
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
    getAllTaskType = async ( success, failed)=>{
        try {
            const projectTypeService = new ProjectTypeService()
            const domain = [
                [
                    "task_ok","=",true
                ]
            ]
            const field = [
                "name"
            ]
            const result = await projectTypeService.getProjectType(domain,field)
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

export default ProjectTypeBusiness