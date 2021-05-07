import { NAME_ACTIONS } from './ActionName';

export function LoginERP(db, userName, password, url) {
  return {
    type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN,
    typeAction: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_ERP,
    data: { db, userName, password, url }
  };
}
export function logout() {
  return {
    type: NAME_ACTIONS.LOGIN_SCREEN.LOGIN_SCREEN,
    typeAction: NAME_ACTIONS.LOGIN_SCREEN.LOGOUT,
    data: {}
  }
}