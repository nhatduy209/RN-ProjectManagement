import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/task-type/NameEpic'

const taskTypeState = {
    listTaskType: {
        status: dataStatus.NONE,
        message: '',
        data: [],
    },
    realListTaskType: {
        status: dataStatus.NONE,
        message: '',
        data: [],
    }
};
const taskTypeReducer = (state = taskTypeState, action) => {
    switch (action.type) {
        case NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE:
            state = {
                ...state,
                listTaskType: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data
                }
            }
            break;
        case NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE_FAILED:
            state = {
                ...state,
                listTaskType: {
                    status: action.data.status,
                    message: action.data.message,
                    data: []
                }
            }
            break;
        case NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_SEARCH_LIST_TASK_:
            state = {
                ...state,
                listTaskType: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data,
                }
            }
            break;
        case NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_SEARCH_LIST_TASK_FAILED:
            state = {
                ...state,
                listTaskType: {
                    status: action.data.status,
                    message: action.data.message,
                    data: []
                }
            }
            break;
        case NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE_2:
            state = {
                ...state,
                realListTaskType: {
                    status: action.data.status,
                    message: action.data.message,
                    data: action.data.data,
                }
            }
            break;
        case NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE_2_FAILED:
            state = {
                ...state,
                realListTaskType: {
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
export default taskTypeReducer;
