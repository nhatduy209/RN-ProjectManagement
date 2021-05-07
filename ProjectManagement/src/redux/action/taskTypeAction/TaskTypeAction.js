import { NAME_ACTIONS} from './ActionName';

export function getListTaskType(){
  return {
    type: NAME_ACTIONS.TASK_TYPE_SCREEN.TASK_TYPE_SCREEN,
    typeAction: NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE,
    data: {}
  }
}
export function getListTaskTypeReallllll(){
  return {
    type: NAME_ACTIONS.TASK_TYPE_SCREEN.TASK_TYPE_SCREEN,
    typeAction: NAME_ACTIONS.TASK_TYPE_SCREEN.GET_LIST_TASK_TYPE_2,
    data: {}
  }
}

export function searchTask(searchText){
  console.log("SEARCH TEXTTTTTT-----------------------", searchText);
  return {
    type: NAME_ACTIONS.TASK_TYPE_SCREEN.TASK_TYPE_SCREEN,
    typeAction: NAME_ACTIONS.TASK_TYPE_SCREEN.SEARCH_LIST_TASK,
    data: {searchText}
  }
}