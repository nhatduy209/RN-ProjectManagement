import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/checkListTask/ActionName';
import { NAME_EPICS } from './NameEpic';
import CheckListTaskBussniess from '../../../business/CheckListTaskBusiness';
let messageError = {};
const resolver = action => {
  const checkListTaskBusiness = new CheckListTaskBussniess();
  return new Promise((resolve, reject) => {
    switch (action.typeAction) {
      case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_CHECK_LIST:
        checkListTaskBusiness.getListCheckList(
          action.data,
          success => {
            resolve({
              actionType: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_CHECK_LIST,
              data: success,
            });
          },
          failed => {
            messageError = failed;
            reject(
              new Error(
                NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_CHECK_LIST_FAIL,
              ),
            );
          },
        );
        break;
      case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CREATE_CHECK_LIST:
        checkListTaskBusiness.createCheckList(
          action.data,
          success => {
            resolve({
              actionType: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CREATE_CHECK_LIST,
              data: success,
            });
          },
          failed => {
            messageError = failed;
            reject(
              new Error(
                NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CREATE_CHECK_LIST_FAIL,
              ),
            );
          },
        );
        break;
      case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_LIST_CHECK_LIST_TYPE:
        checkListTaskBusiness.getListCheckListType(
          success => {
            resolve({
              actionType: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_LIST_CHECK_LIST_TYPE,
              data: success,
            });
          },
          failed => {
            messageError = failed;
            reject(
              new Error(
                NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_LIST_CHECK_LIST_TYPE_FAIL,
              ),
            );
          },
        );
        break;
      case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CRATE_CHECK_LIST_ITEM:
        checkListTaskBusiness.createCheckListItem(
          action.data,
          success => {
            resolve({
              actionType: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CRATE_CHECK_LIST_ITEM,
              data: success,
            });
          },
          failed => {
            messageError = failed;
            reject(
              new Error(
                NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CRATE_CHECK_LIST_ITEM_FAIL,
              ),
            );
          },
        );
        break;
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.DELETE_CHECK_LIST_ITEM:
      console.log("ACTION HERE" , action)
        checkListTaskBusiness.deleteCheckListItem(
          action.data,
          success => {
            resolve({
              actionType: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.DELETE_CHECK_LIST_ITEM,
              data: success,
            });
          },
          failed => {
            messageError = failed;
            reject(
              new Error(
                NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.DELETE_CHECK_LIST_ITEM_FAIL,
              ),
            );
          },
        );
        break;
      default:
        console.error('Error when resolver Check List Epic.');
        break;
    }
  });
};

const dispatch = data => {
  switch (data.actionType) {
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_CHECK_LIST:
      return {
        type: NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_GET_LIST_CHECK_LIST,
        data: data.data,
      };
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CREATE_CHECK_LIST:
      return {
        type: NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_CREATE_CHECK_LIST,
        data: data.data,
      };
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_LIST_CHECK_LIST_TYPE:
      return {
        type: NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_GET_LIST_CHECK_LIST_TYPE,
        data: data.data,
      };
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CRATE_CHECK_LIST_ITEM:
      console.log("DISPATCH ", data);
      return {
        type: NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_CREATE_CHECK_LIST_ITEM,
        data: data.data.status,
      };
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.DELETE_CHECK_LIST_ITEM:
      return {
        type: NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_DELETE_CHECK_LIST_ITEM,
        data: data.data,
      };
    default:
      console.error('Error when dispatch Check List Epic.');
      return new Error('Error when dispatch Check List Epic.');
  }
};

const dispatchError = (error, action) => {
  console.log("DATAAAAAAAAAAAAAAA ERRORRR", error)
  switch (error.message) {
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_CHECK_LIST_FAIL:
      return {
        type:
          NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_GET_LIST_CHECK_LIST_FAIL,
        data: messageError,
      };
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CREATE_CHECK_LIST_FAIL:
      return {
        type:
          NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_CREATE_CHECK_LIST_FAIL,
        data: messageError,
      };
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_LIST_CHECK_LIST_TYPE_FAIL:
      return {
        type:
          NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_GET_LIST_CHECK_LIST_TYPE_FAIL,
        data: messageError,
      };
    case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CRATE_CHECK_LIST_ITEM_FAIL:
      return {
        type:
          NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_CREATE_CHECK_LIST_ITEM,
        data: messageError,
      };
  case NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.DELETE_CHECK_LIST_ITEM_FAIL:
      return {
        type:
          NAME_EPICS.EPIC_CHECK_LIST_TASK_SCREEN.EPIC_DELETE_CHECK_LIST_ITEM_FAIL,
        data: messageError,
      };
    default:
      console.error('Error when dispatch error Check List Epic.');
      return new Error('Error when dispatch error Check List Epic.');
  }
};

const CheckListEpic = action$ =>
  action$.pipe(
    ofType(NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CHECK_LIST_TASK),
    mergeMap(action =>
      from(resolver(action)).pipe(
        map(success => dispatch(success)),
        catchError(error => of(dispatchError(error, action))),
        takeUntil(
          action$.pipe(filter(pipeAction => pipeAction.type === 'CANCEL')),
        ),
      ),
    ),
  );
export default CheckListEpic;
