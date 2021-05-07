import UserService from '../services/UserService'
import { dataStatus, userProfile } from '../utility/config';
import PartnerService from '../services/PartnerService'

class PartnerBusiness {
    getListPartner = async (success, failed) => {
        try {
            const partnerService = new PartnerService();
            const domain = [];
            const fields = [
                "name"
            ];
            const result = await partnerService.getPartner(domain, fields,0,13)
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
    searchPartner = async (data, success, failed) =>{
        try {
            const partnerService = new PartnerService();
            const {searchText} = data
            const domain = [
                ["name","ilike", searchText]
            ];
            const fields = [
                "name"
            ];
            const result = await partnerService.getPartner(domain, fields)
            console.log("PARTNER: ", result)
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

export default PartnerBusiness