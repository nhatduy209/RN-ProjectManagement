import {dataStatus} from '../../utility/config';
import {NAME_EPICS} from '../epics/check-list-task/NameEpic';

const checkListTypeState = {
  listCheckListType: {
    status: dataStatus.NONE,
    message: '',
    data: [],
  },
};
const checkListTypeReducer = (state = checkListTypeState, action) => {
  switch (action.type) {
    case NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_GET_LIST_CHECK_LIST_TYPE:
      state = {
        ...state,
        listCheckListType: {
          status: action.data.status,
          message: action.data.message,
          data: action.data.data,
        },
      };
      break;
    case NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_GET_LIST_CHECK_LIST_TYPE_FAIL:
      state = {
        ...state,
        listCheckListType: {
          status: action.data.status,
          message: action.data.message,
          data: [],
        },
      };
      break;
    default:
      break;
  }
  return state;
};
export default checkListTypeReducer;
