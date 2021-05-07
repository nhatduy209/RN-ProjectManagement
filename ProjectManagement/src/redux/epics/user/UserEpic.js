import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/userAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import UserBusiness from '../../../business/UserBusiness'
import { dataStatus } from '../../../utility/config';


let messageError = {};

const resolver = (action) => {
    const userBusiness = new UserBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_COMPANY:
                userBusiness.getListUserbyCompany(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_COMPANY,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_COMPANY_FAILED));
                })
                break;
            case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_BY_ID:
                userBusiness.getListUser(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_BY_ID,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_BY_ID_FAILED));
                })
                break;
            case NAME_ACTIONS.USER_SCREEN.SELECT_USER_PROJECT:
                
                resolve({
                    actionType: NAME_ACTIONS.USER_SCREEN.SELECT_USER_PROJECT,
                    data: action.data
                });
            case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_PROJECT_ID:
                userBusiness.getListUserbyProjectId(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_PROJECT_ID,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_PROJECT_ID_FAILED));
                })
                break;
            case NAME_ACTIONS.USER_SCREEN.REMOVED_SELECT_USER_PROJECT:
                resolve({
                    actionType: NAME_ACTIONS.USER_SCREEN.REMOVED_SELECT_USER_PROJECT,
                    data: action.data
                });
                break;
            case NAME_ACTIONS.USER_SCREEN.CLEAR_SELECT_USER_PROJECT:
                
                resolve({
                    actionType: NAME_ACTIONS.USER_SCREEN.CLEAR_SELECT_USER_PROJECT,
                    data: {
                        status: dataStatus.SUCCESS,
                        data:{}
                    }
                });
                break;
            default:
                console.error('Error when resolver User Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_BY_ID:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_BY_ID,
                data: data.data
            };
        case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_COMPANY:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_COMPANY,
                data: data.data
            };
        case NAME_ACTIONS.USER_SCREEN.SELECT_USER_PROJECT:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_SELECT_USER_PROJECT,
                data: data.data
            }
        case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_PROJECT_ID:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_PROJECT_ID,
                data: data.data
            };
        case NAME_ACTIONS.USER_SCREEN.REMOVED_SELECT_USER_PROJECT:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_REMOVED_SELECT_USER_PROJECT,
                data: data.data
            };
        case NAME_ACTIONS.USER_SCREEN.CLEAR_SELECT_USER_PROJECT:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_CLEAR_SELECT_USER_PROJECT,
                data:{}
            };
        default:
            console.error('Error when dispatch User Epic.');
            return new Error('Error when dispatch User Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_BY_ID_FAILED:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_BY_ID_FAILED,
                data: messageError
            }
             case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_COMPANY_FAILED:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_BY_ID_FAILED,
                data: messageError
            }

        case NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_BY_ID_FAILED:
            return {
                type: NAME_EPICS.EPIC_USER_SCREEN.EPIC_GET_LIST_USER_PROJECT_ID_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error User Epic.');
            return new Error('Error when dispatch error User Epic.'); 
    }
};

const UserEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.USER_SCREEN.USER_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default UserEpic;