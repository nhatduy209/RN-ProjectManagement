import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/project-type/NameEpic'

const projectTypeState = {
    listProjectType: {
        status: dataStatus.NONE,
        message: '',
        data: [],
    },
    listTaskType: {
        status: dataStatus.NONE,
        message: '',
        data: [],
    }
};
const projectTypeReducer = (state = projectTypeState, action) => {
    switch (action.type) {
        case NAME_EPICS.EPIC_PROJECT_TYPE_SCREEN.EPIC_GET_ALL_PROJECT_TYPE:
            state = {
                ...state,
                listProjectType: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
            }
            break;
        case NAME_EPICS.EPIC_PROJECT_TYPE_SCREEN.EPIC_GET_ALL_PROJECT_TYPE_FAILED:
            state = {
                ...state,
                listProjectType: {
                    status: action.data.status,
                    message: action.data.message,
                    data: []
                }
            }
            break;
        case NAME_EPICS.EPIC_PROJECT_TYPE_SCREEN.EPIC_GET_ALL_TASK_TYPE:
            state = {
                ...state,
                listTaskType: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
            }
            break;
        case NAME_EPICS.EPIC_PROJECT_TYPE_SCREEN.EPIC_GET_ALL_TASK_TYPE_FAILED:
            state = {
                ...state,
                listTaskType: {
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
};
export default projectTypeReducer;
