import {NAME_ACTIONS} from '../action/changeLanguage/ActionName';

const initialState = {
    language: 'vi'
};

const languageReducer = (state = initialState, action) => {
    switch (action.type) {
        case NAME_ACTIONS.CHANGE_LANGUAGE.CHANGE_LANGUAGE: {
            state = {
                language: action.data,
            }
            break;
        }
        default:
            break;
    }
    return state;
};

export default languageReducer;