import { dataStatus } from '../../utility/config';
import { NAME_EPICS } from '../epics/check-list-task/NameEpic';

const checkListTaskState = {
  listCheckList: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },

  createCheckListItem: {
    status: dataStatus.NONE
  },

  createCheckListTitle: {
    status: dataStatus.NONE
  },

  deleteCheckListItem: {
    status: dataStatus.NONE
  }
};
const checkListTaskReducer = (state = checkListTaskState, action) => {
  console.log("ACTION TYPE ", action)
  switch (action.type) {
    case NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_GET_LIST_CHECK_LIST:
      state = {
        ...state,
        listCheckList: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data,
        },
      };
      break;
    case NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_GET_LIST_CHECK_LIST_FAIL:
      state = {
        ...state,
        listCheckList: {
          status: action.data.status,
          message: action.data.message,
          data: [],
        },
      };
      break;

    case NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_CREATE_CHECK_LIST_ITEM:
      console.log('REDUCER ----', action);
      state = {
        ...state,
        createCheckListItem: {
          status: action.data,
        }
      };
      break;
    case NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_CREATE_CHECK_LIST:
      console.log("ACTIOON " , action.data);
      state = {
        ...state,
        createCheckListTitle: {
          status: action.data.status,
        },
      };
      break;

    default:
      break;
  }
  return state;
};
export default checkListTaskReducer;
