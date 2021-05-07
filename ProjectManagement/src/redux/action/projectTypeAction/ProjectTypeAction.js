import {NAME_ACTIONS} from './ActionName'

export function getAllProjectType(){
    return {
        type: NAME_ACTIONS.PROJECT_TYPE_SCREEN.PROJECT_TYPE_SCREEN,
        typeAction: NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_PROJECT_TYPE,
        data: {}
      };
}
export function getAllTaskType(){
  return {
      type: NAME_ACTIONS.PROJECT_TYPE_SCREEN.PROJECT_TYPE_SCREEN,
      typeAction: NAME_ACTIONS.PROJECT_TYPE_SCREEN.GET_ALL_TASK_TYPE,
      data: {}
    };
}