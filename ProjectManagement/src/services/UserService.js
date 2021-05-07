import BaseService from './BaseService'

class UserService extends BaseService {
    constructor() {
        super();
        this.model = "res.users"
    }
    getUser = (domain, field) => {
        return new Promise((resolve, reject) => {
            this.search_read(domain, field).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
}
export default UserService