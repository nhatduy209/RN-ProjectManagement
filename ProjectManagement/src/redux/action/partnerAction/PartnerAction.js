import {NAME_ACTIONS} from './ActionName'

export function getListPartner(){
    return {
      type: NAME_ACTIONS.PARTNER_SCREEN.PARTNER_SCREEN,
      typeAction: NAME_ACTIONS.PARTNER_SCREEN.GET_LIST_PARTNER,
      data: {}
    }
}
export function searchPartner(searchText){
  return {
    type: NAME_ACTIONS.PARTNER_SCREEN.PARTNER_SCREEN,
    typeAction: NAME_ACTIONS.PARTNER_SCREEN.SEARCH_PARTNER,
    data: {
      searchText: searchText
    }
  }
}