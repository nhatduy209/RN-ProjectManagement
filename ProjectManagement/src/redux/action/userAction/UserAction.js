import {NAME_ACTIONS} from './ActionName'

export function getListUserByCompany(company_id){
    return {
      type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
      typeAction: NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_COMPANY,
      data: {
        companyId : company_id
      }
    }
}
export function getListUserById(listUserId){
  return {
    type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
    typeAction: NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_BY_ID,
    data: {
      listUserId : listUserId
    }
  }
}
export function selectUserProject(data){
  return {
    
      type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
      typeAction: NAME_ACTIONS.USER_SCREEN.SELECT_USER_PROJECT,
      data
    };
}
export function removedSelectUserProject(data){
  return {
      type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
      typeAction: NAME_ACTIONS.USER_SCREEN.REMOVED_SELECT_USER_PROJECT,
      data
    };
  }
export function clearSelectUserProject(){
  return {
      type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
      typeAction: NAME_ACTIONS.USER_SCREEN.CLEAR_SELECT_USER_PROJECT,
      data:{}
    };
  }


export function getListUserByProject(projectId){
  return {
    type: NAME_ACTIONS.USER_SCREEN.USER_SCREEN,
    typeAction: NAME_ACTIONS.USER_SCREEN.GET_LIST_USER_PROJECT_ID,
    data: {
      projectId : projectId
    }
  }
}