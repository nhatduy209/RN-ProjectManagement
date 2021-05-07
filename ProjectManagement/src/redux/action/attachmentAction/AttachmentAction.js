import {NAME_ACTIONS} from './ActionName';

export function createAttachment(resId, modelname, content, filename) {
  return {
    type: NAME_ACTIONS.ATTACHMENT.ATTACHMENT,
    typeAction: NAME_ACTIONS.ATTACHMENT.CREATE_ATTACHMENT,
    data: {resId, modelname, content, filename},
  };
}