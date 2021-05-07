import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/partner/NameEpic'

const partnerState = {
    listPartner: {
        status: dataStatus.NONE,
        message: '',
        data: [],
    }
}
const partnerReducer = (state = partnerState, action) => {
    switch (action.type) {
        case NAME_EPICS.EPIC_PARTNER_SCREEN.EPIC_GET_LIST_PARTNER:
            state = {
                ...state,
                listPartner: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
            }
            break;
        case NAME_EPICS.EPIC_PARTNER_SCREEN.EPIC_GET_LIST_PARTNER_FAILED:
            state = {
                ...state,
                listPartner: {
                    status: action.data.status,
                    message: action.data.message,
                    data: []
                }
            }
            break;
        case NAME_EPICS.EPIC_PARTNER_SCREEN.EPIC_SEARCH_PARTNER:
            state = {
                ...state,
                listPartner: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
            }
            break;
        case NAME_EPICS.EPIC_PARTNER_SCREEN.EPIC_SEARCH_PARTNER_FAILED:
            state = {
                ...state,
                listPartner: {
                    status: action.data.status,
                    message: action.data.message,
                    data: []
                }
            }
            break;
        default:
            break;
    }
    return state;
}
export default partnerReducer;
