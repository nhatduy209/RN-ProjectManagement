import AttachmentService from '../services/AttachmentService'
import { dataStatus, userProfile } from '../utility/config';


class AttachmentBusiness {
    createAttach = async (data,success, failed) => {
        try {
            const attachment = new AttachmentService();
            const {resId, modelname, content, filename} = data
            const domain = [
                0, 
                modelname,
                resId,
                0,
                0,
                content, 
               filename
            ];
            const result = await attachment.createAttachment(domain)
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

export default AttachmentBusiness