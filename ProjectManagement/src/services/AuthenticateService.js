import BaseService from './BaseService'

class AuthenticateService extends BaseService {
    constructor() {
        super();
        
    }
    
    loginERP = (db, login, password) => {
        return new Promise((resolve, reject) => {
            this.authentication(db, login, password).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        })
    }
    logoutERP = () => {
        return new Promise((resolve, reject) => {
            this.logout().then(resp => {
                resolve(resp)
            }).catch(err => {
                reject(err)
            })
        })
    }

}
export default AuthenticateService
