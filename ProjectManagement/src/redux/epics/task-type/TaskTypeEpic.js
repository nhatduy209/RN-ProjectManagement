import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/taskTypeAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import TaskTypeBusiness from '../../../business/TaskTypeBusiness'


let messageError = {};

const resolver = (action) => {
    const taskTypeBusiness = new TaskTypeBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE:
                taskTypeBusiness.getAllTaskType(success => {
                    resolve({
                        actionType: NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE_FAILED));
                })
                break;

            case NAME_ACTIONS.TASK_TYPE_SCREEN.SEARCH_LIST_TASK:
                taskTypeBusiness.searchTaskType(action.data.searchText, success => {
                    resolve({
                        actionType: NAME_ACTIONS.TASK_TYPE_SCREEN.SEARCH_LIST_TASK,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.TASK_TYPE_SCREEN.SEARCH_LIST_TASK_FAILED));
                })
                break;
            case NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE_2:
                taskTypeBusiness.getListTaskType(success => {
                    resolve({
                        actionType: NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE_2,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE_2_FAILED));
                })
                break;
            default:
                console.error('Error when resolver TaskType Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE:
            return {
                type: NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE,
                data: data.data
            };
        case NAME_ACTIONS.TASK_TYPE_SCREEN.SEARCH_LIST_TASK:
            return {
                type: NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE,
                data: data.data
            };
        case NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE_2:

            return {
                type: NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE_2,
                data: data.data
            };
        default:
            console.error('Error when dispatch TaskType Epic.');
            return new Error('Error when dispatch TaskType Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE_FAILED:
            return {
                type: NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.TASK_TYPE_SCREEN.SEARCH_LIST_TASK_FAILED:
            return {
                type: NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_SEARCH_LIST_TASK_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE_2_FAILED:
            return {
                type: NAME_EPICS.EPIC_TASK_TYPE_SCREEN.EPIC_GET_LIST_TASK_TYPE_2_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error TaskType Epic.');
            return new Error('Error when dispatch error TaskType Epic.'); F
    }
};

const ProjectTypeEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.TASK_TYPE_SCREEN.TASK_TYPE_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default ProjectTypeEpic;