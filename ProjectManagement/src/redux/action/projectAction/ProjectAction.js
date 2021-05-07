import {NAME_ACTIONS} from './ActionName'

export function getProjectByCompany(){
    return {
        type: NAME_ACTIONS.PROJECT_SCREEN.PROJECT_SCREEN,
        typeAction: NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_COMPANY,
        data: {}
      };
}

export function getProjectByStatus(){
    console.log("Action")
    return {
        type: NAME_ACTIONS.PROJECT_SCREEN.PROJECT_SCREEN,
        typeAction: NAME_ACTIONS.PROJECT_SCREEN.GET_PROJECT_STATUS,
        data: {}
      };
}


export function editProject(projectId, editdata){
  return {
      type: NAME_ACTIONS.PROJECT_SCREEN.PROJECT_SCREEN,
      typeAction: NAME_ACTIONS.PROJECT_SCREEN.EDIT_PROJECT,
      data: { 
        projectId: projectId, 
        editdata: editdata 
      }
    };
}
export function selectProject(data){
  
  return {
      type: NAME_ACTIONS.PROJECT_SCREEN.PROJECT_SCREEN,
      typeAction: NAME_ACTIONS.PROJECT_SCREEN.SELECT_PROJECT,
      data
    };
}
export function getDetailProject(idProject) {
  
  return {
    type: NAME_ACTIONS.PROJECT_SCREEN.PROJECT_SCREEN,
    typeAction: NAME_ACTIONS.PROJECT_SCREEN.GET_DETAIL_PROJECT,
    data: {idProject},
  };
}
export function searchProject(searchText){
  console.log("SEARCH TEXTTTTTT-----------------------", searchText);
  return {
    type: NAME_ACTIONS.PROJECT_SCREEN.PROJECT_SCREEN,
    typeAction: NAME_ACTIONS.PROJECT_SCREEN.SEARCH_LIST_PROJECT,
    data: {searchText}
  }
}