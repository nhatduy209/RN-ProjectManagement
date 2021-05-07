import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/project/NameEpic'

const projectState = {
  listProject: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
  listProjectByStatus: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
  selectProject: {
    data: {}
  },
  projectDetail: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  editStatus: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  }
};
const projectReducer = (state = projectState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_PROJECT_COMPANY:
      state = {
        ...state,
        listProject: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_PROJECT_COMPANY_FAILED:
      state = {
        ...state,
        listProject: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_PROJECT_STATUS:
      state = {
        ...state,
        listProjectByStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_PROJECT_STATUS_FAILED:
      state = {
        ...state,
        listProjectByStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_SEARCH_LIST_PROJECT:
      state = {
        ...state,
        listProjectByStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_SEARCH_LIST_PROJECT_FAILED:
      state = {
        ...state,
        listProjectByStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    
    
    
    
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_DETAIL_PROJECT:
     
      state = {
        ...state,
        projectDetail: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_DETAIL_PROJECT_FAILED:
      state = {
        ...state,
        projectDetail: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_EDIT_PROJECT:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_EDIT_PROJECT_FAILED:
      state = {
        ...state,
        editStatus: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_SELECT_PROJECT:
      state = {
        ...state,
        selectProject: {
          data: action.data
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default projectReducer;
