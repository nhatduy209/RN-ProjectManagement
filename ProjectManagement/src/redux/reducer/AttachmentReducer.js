import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/attachment/NameEpic'

const attachmentState = {
    createStatus: {
        status: dataStatus.NONE,
        message: '',
        data: {},
    }
}
const attachmentReducer = (state = attachmentState, action) => {
    switch (action.type) {
        case NAME_EPICS.EPIC_ATTACHMENT.EPIC_CREATE_ATTACHMENT:
            state = {
                ...state,
                createStatus: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
            }
            break;
        case NAME_EPICS.EPIC_ATTACHMENT.EPIC_CREATE_ATTACHMENT_FAILED:
            state = {
                ...state,
                createStatus: {
                    status: action.data.status,
                    message: action.data.message,
                    data: {}
                }
            }
            break;
        default:
            break;
    }
    return state;
}
export default attachmentReducer;
