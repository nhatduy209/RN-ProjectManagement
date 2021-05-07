import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/projectTypeAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import ProjectTypeBusiness from '../../../business/ProjectTypeBusiness'


let messageError = {};

const resolver = (action) => {
    const projectTypeBusiness = new ProjectTypeBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_PROJECT_TYPE:
                projectTypeBusiness.getAllProjectType(success => {
                    resolve({
                        actionType: NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_PROJECT_TYPE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_PROJECT_TYPE_FAILED));
                })
                break;
            case NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_TASK_TYPE:
                projectTypeBusiness.getAllTaskType(success => {
                    resolve({
                        actionType: NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_TASK_TYPE,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_TASK_TYPE_FAILED));
                })
                break;
            default:
                console.error('Error when resolver ProjectType Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_PROJECT_TYPE:
            return {
                type: NAME_EPICS.EPIC_PROJECT_TYPE_SCREEN.EPIC_GET_ALL_PROJECT_TYPE,
                data: data.data
            };
        case NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_TASK_TYPE:
            return {
                type: NAME_EPICS.EPIC_PROJECT_TYPE_SCREEN.EPIC_GET_ALL_TASK_TYPE,
                data: data.data
            };
        default:
            console.error('Error when dispatch ProjectType Epic.');
            return new Error('Error when dispatch ProjectType Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_PROJECT_TYPE_FAILED:
            return {
                type: NAME_EPICS.EPIC_PROJECT_TYPE_SCREEN.EPIC_GET_ALL_PROJECT_TYPE_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_TASK_TYPE_FAILED:
            return {
                type: NAME_EPICS.EPIC_PROJECT_TYPE_SCREEN.EPIC_GET_ALL_TASK_TYPE_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error ProjectType Epic.');
            return new Error('Error when dispatch error ProjectType Epic.'); F
    }
};

const ProjectTypeEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.PROJECT_TYPE_SCREEN.PROJECT_TYPE_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default ProjectTypeEpic;