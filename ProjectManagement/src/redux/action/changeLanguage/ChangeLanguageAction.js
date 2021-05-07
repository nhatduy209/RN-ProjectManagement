import {NAME_ACTIONS} from './ActionName'

export function changeLanguage(language)
{       console.log('language----------------------', language)
    return {
        type: NAME_ACTIONS.CHANGE_LANGUAGE.CHANGE_LANGUAGE,
        data : language,
    }
}