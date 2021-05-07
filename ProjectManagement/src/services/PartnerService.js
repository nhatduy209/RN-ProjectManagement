import BaseService from './BaseService'

class PartnerService extends BaseService {
    constructor() {
        super();
        this.model = "res.partner"
    }
    getPartner = (domain, field, offset=0, limit=0) => {
        return new Promise((resolve, reject) => {
            this.search_read(domain, field,offset, limit ).then(resp => {
                resolve(resp)
            }).catch(error => {
                reject(error)
            })
        });
    }
}
export default PartnerService