import {NAME_ACTIONS} from './ActionName';

export function getListTask(offset, limit, stage_id, currentList) {
  return {
    type: NAME_ACTIONS.TASK_SCREEN.TASK_SCREEN,
    typeAction: NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK,
    data: {offset, limit, stage_id,currentList},
  };
}
export function editTask(id, editdata){
  return {
    type: NAME_ACTIONS.TASK_SCREEN.TASK_SCREEN,
    typeAction: NAME_ACTIONS.TASK_SCREEN.EDIT_TASK,
    data: {
      idTask:id,
      editdata: editdata
    }
  }
}
export function getListTaskOfProject(listIdTask){
  return {
    type: NAME_ACTIONS.TASK_SCREEN.TASK_SCREEN,
    typeAction: NAME_ACTIONS.TASK_SCREEN.GET_LIST_TASK_OF_PROJECT,
    data: {listIdTask: listIdTask},
  };
}
export function getDetailTask(idTask) {
  return {
    type: NAME_ACTIONS.TASK_SCREEN.TASK_SCREEN,
    typeAction: NAME_ACTIONS.TASK_SCREEN.GET_DETAIL_TASK,
    data: {idTask},
  };
}
export function createTask(createData) {
  return {
    type: NAME_ACTIONS.TASK_SCREEN.TASK_SCREEN,
    typeAction: NAME_ACTIONS.TASK_SCREEN.CREATE_TASK,
    data: {createData}
  };
}

export function resetDetailTask(isResetAll = true) {
  return {
    type: NAME_ACTIONS.TASK_SCREEN.TASK_SCREEN,
    typeAction: NAME_ACTIONS.TASK_SCREEN.RESET_DETAIL_TASK,
    data: isResetAll
  };
}
