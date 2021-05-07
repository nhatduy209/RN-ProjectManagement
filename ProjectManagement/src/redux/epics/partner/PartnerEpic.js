import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/partnerAction/ActionName';
import { NAME_EPICS } from './NameEpic';
import PartnerBusiness from '../../../business/PartnerBusiness'
let messageError = {};
const resolver = (action) => {
    const partnerBusiness = new PartnerBusiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.PARTNER_SCREEN.GET_LIST_PARTNER:
                partnerBusiness.getListPartner(success => {
                    resolve({
                        actionType: NAME_ACTIONS.PARTNER_SCREEN.GET_LIST_PARTNER,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PARTNER_SCREEN.GET_LIST_PARTNER));
                })
                break;
            case NAME_ACTIONS.PARTNER_SCREEN.SEARCH_PARTNER:
                partnerBusiness.searchPartner(action.data, success => {
                    resolve({
                        actionType: NAME_ACTIONS.PARTNER_SCREEN.SEARCH_PARTNER,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.PARTNER_SCREEN.SEARCH_PARTNER_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Partner Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.PARTNER_SCREEN.GET_LIST_PARTNER:
            return {
                type: NAME_EPICS.EPIC_PARTNER_SCREEN.EPIC_GET_LIST_PARTNER,
                data: data.data
            };
        case NAME_ACTIONS.PARTNER_SCREEN.SEARCH_PARTNER:
            return {
                type: NAME_EPICS.EPIC_PARTNER_SCREEN.EPIC_SEARCH_PARTNER,
                data: data.data
            };
        default:
            console.error('Error when dispatch Partner Epic.');
            return new Error('Error when dispatch Partner Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.PARTNER_SCREEN.GET_LIST_PARTNER_FAILED:
            return {
                type: NAME_EPICS.EPIC_PARTNER_SCREEN.EPIC_GET_LIST_PARTNER_FAILED,
                data: messageError
            }
        case NAME_ACTIONS.PARTNER_SCREEN.SEARCH_PARTNER_FAILED:
            return {
                type: NAME_EPICS.EPIC_PARTNER_SCREEN.EPIC_SEARCH_PARTNER_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Partner Epic.');
            return new Error('Error when dispatch error Partner Epic.');
    }
};

const PartnerEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.PARTNER_SCREEN.PARTNER_SCREEN),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default PartnerEpic;