import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/task/TaskName'

const taskState = {
  listAllTask: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
  taskDetail: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  createStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  listTaskOfProject: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
  editStatus: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  }
};

const taskReducer = (state = taskState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_LIST_TASK:
      state = {
        ...state,
        listAllTask: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_LIST_TASK_FAILED:
      state = {
        ...state,
        listAllTask: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_DETAIL_TASK:
      state = {
        ...state,
        taskDetail: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_DETAIL_TASK_FAILED:
      state = {
        ...state,
        taskDetail: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_CREATE_TASK:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_CREATE_TASK_FAILED:
      state = {
        ...state,
        createStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_LIST_TASK_OF_PROJECT:
      state = {
        ...state,
        listTaskOfProject: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_LIST_TASK_OF_PROJECT_FAILED:
      state = {
        ...state,
        listTaskOfProject: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_EDIT_TASK:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_EDIT_TASK_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_TASK_SCREEN.EPIC_RESET_DETAIL_TASK:
      if (action.data) {
        state = {
          ...state,
          taskDetail: {
            status: dataStatus.NONE,
            message: '',
            data: {},
          },
        }
      }
      else{ 
        state = {
          ...state,
          taskDetail: {
            ...state.taskDetail,
            status: dataStatus.NONE,
          },
        }
      }
      break;
    default:
      break;
  }

  return state;
};
export default taskReducer;
