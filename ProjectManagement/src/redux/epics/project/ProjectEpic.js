import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/projectAction/ActionName';
import { NAME_EPICS } from './NameEpic';

import ProjectBusiness from '../../../business/ProjectBusiness'


let messageError = {};

const resolver = (action) => {
    const projectBusiness = new ProjectBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_COMPANY:
                projectBusiness.getProjectByCompany( success => {
                    resolve({
                        actionType: NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_COMPANY,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_COMPANY_FAILED));
                })
                break;
            case NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_STATUS:
                projectBusiness.getProjectByStatus( success => {
                    resolve({
                        actionType: NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_STATUS,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_STATUS_FAILED));
                })
                break;
            case NAME_ACTIONS.PROJECT_SCREEN.GET_DETAIL_PROJECT:
                
                projectBusiness.getDetailProject(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.PROJECT_SCREEN.GET_DETAIL_PROJECT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PROJECT_SCREEN.GET_DETAIL_PROJECT_FAILED));
                })
                break;
            case NAME_ACTIONS.PROJECT_SCREEN.EDIT_PROJECT:
                projectBusiness.editProject(action.data, success => {
                    
                    resolve({
                        actionType: NAME_ACTIONS.PROJECT_SCREEN.EDIT_PROJECT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PROJECT_SCREEN.EDIT_PROJECT_FAILED));
                })
                break;
            case NAME_ACTIONS.PROJECT_SCREEN.SELECT_PROJECT:
                resolve({
                    actionType: NAME_ACTIONS.PROJECT_SCREEN.SELECT_PROJECT,
                    data: action.data
                });
                break;
            case NAME_ACTIONS.PROJECT_SCREEN.SEARCH_LIST_PROJECT:
                projectBusiness.searchProject( action.data.searchText , success => {
                    resolve({
                        actionType: NAME_ACTIONS.PROJECT_SCREEN.SEARCH_LIST_PROJECT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PROJECT_SCREEN.SEARCH_LIST_PROJECT_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Project Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_COMPANY:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_PROJECT_COMPANY,
                data: data.data
            };
        case NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_STATUS:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_PROJECT_STATUS,
                data: data.data
            };
        case NAME_ACTIONS.PROJECT_SCREEN.GET_DETAIL_PROJECT:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_DETAIL_PROJECT,
                data: data.data
            };
        case NAME_ACTIONS.PROJECT_SCREEN.EDIT_PROJECT:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_EDIT_PROJECT,
                data: data.data
            };
        case NAME_ACTIONS.PROJECT_SCREEN.SELECT_PROJECT:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_SELECT_PROJECT,
                data: data.data
            };
        case NAME_ACTIONS.PROJECT_SCREEN.SEARCH_LIST_PROJECT:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_SEARCH_LIST_PROJECT,
                data: data.data
            };
        default:
            console.error('Error when dispatch Project Epic.');
            return new Error('Error when dispatch Project Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_COMPANY_FAILED:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_PROJECT_COMPANY_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_STATUS_FAILED:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_PROJECT_STATUS_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.PROJECT_SCREEN.GET_DETAIL_PROJECT_FAILED:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_GET_DETAIL_PROJECT_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.PROJECT_SCREEN.EDIT_PROJECT_FAILED:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_EDIT_PROJECT_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.PROJECT_SCREEN.SELECT_PROJECT_FAILED:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_SELECT_PROJECT_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.PROJECT_SCREEN.SEARCH_LIST_PROJECT_FAILED:
            return {
                type: NAME_EPICS.EPIC_PROJECT_SCREEN.EPIC_SEARCH_LIST_PROJECT_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Project Epic.');
            return new Error('Error when dispatch error Project Epic.'); F
    }
};

const ProjectEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.PROJECT_SCREEN.PROJECT_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default ProjectEpic;