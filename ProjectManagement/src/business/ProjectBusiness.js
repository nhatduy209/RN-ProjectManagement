import ProjectService from '../services/ProjectService'
import { dataStatus,userProfile } from '../utility/config';

class ProjectBusiness {
    searchProject = async ( data,success, failed) => {
        const projectFields = [
            "name",
            "user_id",
            "type_id",
            "members",
            "task_count",
            "tasks",
            "project_status"
        ];
        try {
            let ResultData = {status: '', message: '', data: []};
            const projectServices = new ProjectService();
            const domain = [
                ['company_id', '=', userProfile.companyId]
            ];
            const field = ["project_status"];
            
            const result = await projectServices.getProjectByCompany(domain, field);
            console.log(`business:`, result)
            if (result.status === dataStatus.SUCCESS) {
            ResultData.status = result.status;
            //  tempArray.message = result.message;
            
            
            for (let i = 0; i < result.data.length; i++) {
                let projectStatus = {
                        id: 0,
                        title: '',
                        data: [],
                    };
                    const projectDomain = [
                        ['company_id', '=', userProfile.companyId],
                        ['project_status', '=', result.data[i].project_status[0]],
                        ['name', 'ilike',data ]
                    ];
                    projectStatus.id = result.data[i].project_status[0];
                    projectStatus.title = result.data[i].project_status[1];
                    const projectbyCompany = await projectServices.getProjectByCompany(
                        projectDomain,
                        projectFields,
                    );
                    projectStatus.data = projectbyCompany.data
                ResultData.data.push(projectStatus);
            }
            //lọc kết quả trùng nhau
            var x = Array.from(new Set(ResultData.data.map(JSON.stringify))).map(JSON.parse);
           
            ResultData.data=x
            
            success(ResultData);
        } else {
            failed(result);
        }
        } catch (error) {
            failed(error);
        }   
    };
    getProjectByStatus = async ( success, failed) => {
        const projectFields = [
            "name",
            "user_id",
            "type_id",
            "members",
            "task_count",
            "tasks",
            "project_status"
        ];
        try {
            let ResultData = {status: '', message: '', data: []};
            const projectServices = new ProjectService();
            const domain = [
                ['company_id', '=', userProfile.companyId]
            ];
            const field = ["project_status"];
            
            const result = await projectServices.getProjectByCompany(domain, field);
            console.log(`business:`, result)
            if (result.status === dataStatus.SUCCESS) {
            ResultData.status = result.status;
            //  tempArray.message = result.message;
            
            
            for (let i = 0; i < result.data.length; i++) {
                let projectStatus = {
                        id: 0,
                        title: '',
                        data: [],
                    };
                    const projectDomain = [
                        ['company_id', '=', userProfile.companyId],
                        ['project_status', '=', result.data[i].project_status[0]],
                    ];
                    projectStatus.id = result.data[i].project_status[0];
                    projectStatus.title = result.data[i].project_status[1];
                    const projectbyCompany = await projectServices.getProjectByCompany(
                        projectDomain,
                        projectFields,
                    );
                    projectStatus.data = projectbyCompany.data
                ResultData.data.push(projectStatus);
            }
            //lọc kết quả trùng nhau
            var x = Array.from(new Set(ResultData.data.map(JSON.stringify))).map(JSON.parse);
            function compare( a, b ) {
                if ( a.id < b.id ){
                    return -1;
                }
                if ( a.id > b.id ){
                    return 1;
                }
                return 0;
            }
            x.sort( compare );
            ResultData.data=x
            
            success(ResultData);
        } else {
            failed(result);
        }
        } catch (error) {
            failed(error);
        }   
    };
    getProjectByCompany = async ( success, failed) => {
        try {
            const projectService = new ProjectService()
            
            const domain = [
                [
                    "company_id",
                    "=",
                    userProfile.companyId
                ]
            ]
            const field = [
                "name",
                "user_id",
                "type_id",
                "members",
                "task_count",
                "tasks",
                "project_status"
            ]
            const result = await projectService.getProjectByCompany(domain, field)
            if (result.status === dataStatus.SUCCESS) {
                success(result)
            }
            else {
                failed(result)
            }
        } catch (error) {
            failed(error)
        }
    };
    getDetailProject = async (data, success, failed) => {
        try {
            const projectService = new ProjectService()
            const { idProject } = data
            const domain = [
                [
                    "id",
                    "=",
                    idProject
                ]
            ]
            const field = [
                "name",
                "user_id",
                "type_id",
                "members",
                "task_count",
                "tasks",
                "project_status"
            ]
            const result = await projectService.getDetailProject(domain, field)
            const resultnew = {
                status: result.status,
                data: result.data[0],
                message: result?.message ?? "no message"
            }
            if (result.status === dataStatus.SUCCESS) {
                success(resultnew)
            }
            else {
                failed(resultnew)
            }
        } catch (error) {
            failed(error)
        }
    };
    editProject = async (data, success, failed) => {
        try {
            const projectService = new ProjectService()
            const { projectId, editdata } = data
            const id = [
                    projectId
            ]
            const result = await projectService.editProject(id, editdata)
            console.log("PROJECT BUSINESS: ", result)
            if (result.status === dataStatus.SUCCESS) {
                success(result)
            }
            else {
                failed(result)
            }
        } catch (error) {
            failed(error)
        }
    };
    getListProject = async (data,success,failed)=>{

    };
}
export default ProjectBusiness
