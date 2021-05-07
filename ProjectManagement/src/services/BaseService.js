import Service from './Service';
import { subHost, userProfile } from '../utility/config';
class BaseService extends Service {
    constructor() {
        super();
        this.model = ''
    }

    authentication = (db, login, password) => {
        return new Promise((resolve, reject) => {
            const params = {
                db: db,
                login: login,
                password: password
            }
            this.callPostAPI(params, subHost.authenticate).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        })
    }

    search_read = (domain = [], fields = [], offset = 0, limit = 0, orderBy = '', kwargs = {}) => {
        return new Promise((resolve, reject) => {
            const params = {
                model: this.model,
                method: 'search_read',
                args: [
                    domain, fields, offset, limit, orderBy
                ],
                kwargs,
                context: {
                    tz: userProfile.tz,
                    lang: userProfile.lang
                }
            }
            this.callPostAPI(params, subHost.call_kw).then((resp) => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
    read = (domain = [], fields = [], offset = 0, limit = 0, orderBy = '', kwargs = {}) => {
        return new Promise((resolve, reject) => {
            const params = {
                model: this.model,
                method: 'read',
                args: [
                    domain, fields, offset, limit, orderBy
                ],
                kwargs,
                context: {
                    tz: userProfile.tz,
                    lang: userProfile.lang
                }
            }
            this.callPostAPI(params, subHost.call_kw).then((resp) => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
    create = (data = {}, kwargs = {}) => {
        return new Promise((resolve, reject) => {
            const params = {
                model: this.model,
                method: 'create',
                args: [
                    data
                ],
                kwargs,
                context: {
                    tz: userProfile.tz,
                    lang: userProfile.lang
                }
            }
            this.callPostAPI(params, subHost.call_kw).then((resp) => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
    create_attachment = (data = [], kwargs = {}) => {
        return new Promise((resolve, reject) => {
            const params = {
                model: this.model,
                method: 'create_attachment',
                args: data
                ,
                kwargs,
                context: {
                    tz: userProfile.tz,
                    lang: userProfile.lang
                }
            }
            this.callPostAPI(params, subHost.call_kw).then((resp) => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
    write = (id=[], editdata = {}, kwargs = {}) => {
        return new Promise((resolve, reject) => {
            const params = {
                model: this.model,
                method: 'write',
                args: [
                    id, editdata
                ],
                kwargs,
                context: {
                    tz: userProfile.tz,
                    lang: userProfile.lang
                }
            }
            this.callPostAPI(params, subHost.call_kw).then((resp) => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
    logout = () => {
        return new Promise((resolve, reject) => {
            const params = {}
            this.callPostAPI(params, subHost.logout).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }

    callButton = (data) => {
        return new Promise((resolve, reject) => {
            const params = {
                model: this.model,
                method: 'action_add_checklist',
                args: [
                    [data]
                ],
            }
            this.callPostAPI(params, subHost.call_button).then((resp) => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }

    getCheckListType = (kwargs = {}) => {
        return new Promise((resolve, reject) => {
            const params = {
                model: this.model,
                method: 'get_checklist_task_type',
                args: [],
                kwargs, 
                context: {
                    tz: userProfile.tz,
                    lang: userProfile.lang
                }
            }
            this.callPostAPI(params, subHost.call_kw).then((resp) => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }

    unlink = (data, kwargs = {}) => {
        return new Promise((resolve, reject) => {
            const params = {
                model: this.model,
                method: 'unlink',
                args: [data],
                kwargs:{ 
                    context: {
                        tz: userProfile.tz,
                        lang: userProfile.lang
                    }
                }
            }
            this.callPostAPI(params, subHost.call_kw).then((resp) => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
}

export default BaseService;