import UserService from '../services/UserService'
import { dataStatus, userProfile } from '../utility/config';
import ProjectService from '../services/ProjectService'

class UserBusiness {
    getListUser = async (data, success, failed) => {
        try {
            const userSevice = new UserService();
            const { listUserId } = data
            const domain = [
                [
                    "id", "=", listUserId
                ],
            ];
            const fields = [
                "name",
                "phone",
                "email"
            ];
            const result = await userSevice.getUser(domain, fields)
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
    getUserById = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                const userSevice = new UserService();
                const domain = [
                    [
                        "id", "=", id
                    ],
                ];
                const fields = [
                    "name",
                    "phone",
                    "email"
                ];
                const result = await userSevice.getUser(domain, fields)
                if (result.status === dataStatus.SUCCESS) {
                    //console.log("USER BUSINESS USER:", result.data[0])
                    resolve(result.data[0])
                }
                else {
                    reject(dataStatus.FAILED)
                }
            } catch (error) {
                reject(error)
            }
        });
    }
    getListUserbyCompany = async (data, success, failed) => {
        try {
            const userSevice = new UserService();
            const { companyId } = data
            const domain = [
                [
                    "company_id", "=", companyId
                ],
            ];
            const fields = [
                "name",
                "email"
            ];
            const result = await userSevice.getUser(domain, fields)
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
    getListUserbyProjectId = async (data, success, failed) => {
        try {
            const projectService = new ProjectService()
            const userSevice = new UserService();
            const { projectId } = data
            let listMember = []
            const domainProject = [
                [
                    "id",
                    "=",
                    projectId
                ]
            ]
            const fieldProject = [
                "members"
            ]
            const project = await projectService.getProjectByCompany(domainProject, fieldProject)
            if (project.status === dataStatus.SUCCESS) {
                listMember = project.data[0].members
            } else {
                failed(project)
            }
            const domain = [
                [
                    "id", "=", listMember
                ],
            ];
            const fields = [
                "name"
            ];
            const result = await userSevice.getUser(domain, fields)
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

export default UserBusiness