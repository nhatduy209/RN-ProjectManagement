import { ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { mergeMap, filter, map, takeUntil, catchError } from 'rxjs/operators';

import { NAME_ACTIONS } from '../../action/attachmentAction/ActionName';
import { NAME_EPICS } from './NameEpic';
import AttachmentBussiness from '../../../business/AttachmentBussiness'
let messageError = {};
const resolver = (action) => {
    const attachmentBusiness = new AttachmentBussiness();
    return new Promise((resolve, reject) => {
        switch (action.typeAction) {
            case NAME_ACTIONS.ATTACHMENT.CREATE_ATTACHMENT:
                attachmentBusiness.createAttach(action.data,success => {
                    resolve({
                        actionType: NAME_ACTIONS.ATTACHMENT.CREATE_ATTACHMENT,
                        data: success
                    });
                }, failed => {
                    messageError = failed;
                    reject(new Error(NAME_ACTIONS.ATTACHMENT.CREATE_ATTACHMENT_FAILED));
                })
                break;
            default:
                console.error('Error when resolver Attachment Epic.');
                break;
        }
    });
};

const dispatch = (data) => {
    switch (data.actionType) {
        case NAME_ACTIONS.ATTACHMENT.CREATE_ATTACHMENT:
            return {
                type: NAME_EPICS.EPIC_ATTACHMENT.EPIC_CREATE_ATTACHMENT,
                data: data.data
            };
       
        default:
            console.error('Error when dispatch Attachment Epic.');
            return new Error('Error when dispatch Attachment Epic.');
    }
};

const dispatchError = (error, action) => {
    switch (error.message) {
        case NAME_ACTIONS.ATTACHMENT.CREATE_ATTACHMENT_FAILED:
            return {
                type: NAME_EPICS.EPIC_ATTACHMENT.EPIC_CREATE_ATTACHMENT_FAILED,
                data: messageError
            }
        default:
            console.error('Error when dispatch error Attachment Epic.');
            return new Error('Error when dispatch error Attachment Epic.');
    }
};

const AttachmentEpic = (action$) =>
    action$.pipe(
        ofType(NAME_ACTIONS.ATTACHMENT.ATTACHMENT),
        mergeMap((action) =>
            from(resolver(action)).pipe(
                map((success) => dispatch(success)),
                catchError((error) => of(dispatchError(error, action))),
                takeUntil(action$.pipe(filter((pipeAction) => pipeAction.type === 'CANCEL')))
            )
        )
    );
export default AttachmentEpic;