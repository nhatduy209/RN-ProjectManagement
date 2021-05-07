import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/authentication/NameEpic';

const loginState = {
  user: {
    status: dataStatus.NONE,
    message: '',
    data: {},
  },
  logoutStatus: {
    status: dataStatus.NONE,
    message: ''
  }
};

const loginReducer = (state = loginState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGIN_ERP:
      state = {
        ...state,
        user: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data
        }
      }
      break;
    case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGIN_ERP_FAILED:
      state = {
        ...state,
        user: {
          status: action.data.status,
          message: '',
          data: {}
        }
      }
      break;
    case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGOUT:
      state = {
        ...state,
        logoutStatus: {
          status: action.data.status,
          message: action.data.message
        }
      }
      break
    case NAME_EPICS.EPIC_LOGIN_SCREEN.EPIC_LOGOUT_FAILED:
      state = {
        ...state,
        logoutStatus: {
          status: action.data.status,
          message: action.data.message
        }
      }
      break;
    default:
      break;
  }
  return state;
};
export default loginReducer;
