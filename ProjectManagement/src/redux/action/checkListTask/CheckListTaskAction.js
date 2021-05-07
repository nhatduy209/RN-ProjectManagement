import {NAME_ACTIONS} from './ActionName';

export function getListCheckList(idCheckList) {
  return {
    type: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CHECK_LIST_TASK,
    typeAction: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_CHECK_LIST,
    data: {idCheckList},
  };
}


export function createCheckListHeader(idTask , nameCheckList) {
  return {
    type: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CHECK_LIST_TASK,
    typeAction: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CREATE_CHECK_LIST,
    data: {idTask , nameCheckList },
  };
}
export function getListCheckListType() {
  return {
    type: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CHECK_LIST_TASK,
    typeAction: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.GET_LIST_CHECK_LIST_TYPE,
    data: {},
  };
}

export function createCheckListItem( name, res_id , type  )
{
  console.log("ACTION HERE ",name, res_id , type )
  return {
    type: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CHECK_LIST_TASK,
    typeAction: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CRATE_CHECK_LIST_ITEM,
    data: {name, res_id , type},
  };
}

export function deleteCheckListItem( idItem  )
{
  console.log("ID ITEM-----" , idItem);
  return {
    type: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.CHECK_LIST_TASK,
    typeAction: NAME_ACTIONS.CHECK_lIST_TASK_SCREEN.DELETE_CHECK_LIST_ITEM,
    data: {idItem},
  };
}
