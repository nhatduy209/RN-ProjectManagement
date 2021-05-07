import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/taskAction/ActionName';
import { NAME_EPICS } from './TaskName';

import TaskBusiness from '../../../business/TaskBusiness'


let messageError = {};

const resolver = (action) => {
    const taskBusiness = new TaskBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK:
                taskBusiness.getListTask(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK_FAILED));
                })
                break;
            case NAME_ACTIONS.TASK_SCREEN.GET_DETAIL_TASK:
                taskBusiness.getDetailTask(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.TASK_SCREEN.GET_DETAIL_TASK,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.TASK_SCREEN.GET_DETAIL_TASK_FAILED));
                })
                break;
            case NAME_ACTIONS.TASK_SCREEN.CREATE_TASK:
                taskBusiness.createTask(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.TASK_SCREEN.CREATE_TASK,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.TASK_SCREEN.CREATE_TASK_FAILED));
                })
                break;
            case NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK_OF_PROJECT:
                taskBusiness.getListTaskOfProject(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK_OF_PROJECT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK_OF_PROJECT_FAILED));
                })
                break;
            case NAME_ACTIONS.TASK_SCREEN.EDIT_TASK:
                taskBusiness.editTask(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.TASK_SCREEN.EDIT_TASK,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.TASK_SCREEN.EDIT_TASK_FAILED));
                })
                break;
            case NAME_ACTIONS.TASK_SCREEN.RESET_DETAIL_TASK:
                resolve({
                    actionType: NAME_ACTIONS.TASK_SCREEN.RESET_DETAIL_TASK,
                    data: action.data,
                });
                break;
            default:
                console.error('Error when resolver Task Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_LIST_TASK,
                data: data.data
            };
        case NAME_ACTIONS.TASK_SCREEN.GET_DETAIL_TASK:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_DETAIL_TASK,
                data: data.data
            };
        case NAME_ACTIONS.TASK_SCREEN.CREATE_TASK:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_CREATE_TASK,
                data: data.data
            };
        case NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK_OF_PROJECT:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_LIST_TASK_OF_PROJECT,
                data: data.data
            };
        case NAME_ACTIONS.TASK_SCREEN.EDIT_TASK:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_EDIT_TASK,
                data: data.data
            };
        case NAME_ACTIONS.TASK_SCREEN.RESET_DETAIL_TASK:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_RESET_DETAIL_TASK,
                data: data.data,
            };
        default:
            console.error('Error when dispatch Task Epic.');
            return new Error('Error when dispatch Task Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK_FAILED:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_LIST_TASK_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.TASK_SCREEN.GET_DETAIL_TASK_FAILED:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_DETAIL_TASK_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.TASK_SCREEN.CREATE_TASK_FAILED:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_CREATE_TASK_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK_OF_PROJECT_FAILED:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_GET_LIST_TASK_OF_PROJECT_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.TASK_SCREEN.EDIT_TASK_FAILED:
            return {
                type: NAME_EPICS.EPIC_TASK_SCREEN.EPIC_EDIT_TASK_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Task Epic.');
            return new Error('Error when dispatch error Task Epic.');
    }
};

const TaskEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.TASK_SCREEN.TASK_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default TaskEpic;