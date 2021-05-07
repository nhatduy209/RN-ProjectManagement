import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/user/NameEpic'

const userState = {
  listUser: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
  listUserById: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
  listSelectUserOfProject: {
    data: []
  },
  listUserOfProject: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  }
}
const userReducer = (state = userState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_COMPANY:
      state = {
        ...state,
        listUser: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_COMPANY_FAILED:
      state = {
        ...state,
        listUser: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_BY_ID:
      state = {
        ...state,
        listUserById: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_BY_ID_FAILED:
      state = {
        ...state,
        listUserById: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_SELECT_USER_PROJECT:
      const data_1 = state.listSelectUserOfProject.data
      data_1.push(action.data)
      state = {
        ...state,
        listSelectUserOfProject: {
          data: data_1
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_PROJECT_ID:
      state = {
        ...state,
        listUserOfProject: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_PROJECT_ID_FAILED:
      state = {
        ...state,
        listUserOfProject: {
          status: action.data.status,
          message: action.data.message,
          data: []
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_REMOVED_SELECT_USER_PROJECT:
      const data_2 =state.listSelectUserOfProject.data
      for( var i = 0; i < data_2.length; i++){ 
        if ( data_2[i] === action.data) {
          data_2.splice(i, 1); 
        }
      }
      state = {
        ...state,
        listSelectUserOfProject: {
        data: data_2
        }
      }
      break;
    case NAME_EPICS.EPIC_USER_SCREEN.EPIC_CLEAR_SELECT_USER_PROJECT:
      state = {
        ...state,
        listSelectUserOfProject: {
        data:[]
        }
      }
      break;
    default:
      break;
  }
  console.log(`reducer state user:`, state.listSelectUserOfProject.data)
  return state;
}
export default userReducer;
