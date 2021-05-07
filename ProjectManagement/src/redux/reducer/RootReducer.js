import {combineReducers} from 'redux';
import ProjectReducer from './ProjectReducer';
import AuthenticateReducer from './AuthenticateReducer';
import TaskReducer from './TaskReducer'
import UserReducer from './UserReducer'
import ProjectTypeReducer from './ProjectTypeReducer'
import TaskTypeReducer from './TaskTypeReducer'
import PartnerReducer from './PartnerReducer'
import CheckListTaskReducer from './CheckListTaskReducer'
import ChangeLanguageReducer from './ChangeLanguageReducer'
import CheckListTypeReducer from './CheckListTypeReducer'
import AttachmentReducer from './AttachmentReducer'
const RootReducer = combineReducers({
  AuthenticateReducer,TaskReducer, ProjectReducer,UserReducer,ProjectTypeReducer, TaskTypeReducer,PartnerReducer,CheckListTaskReducer,ChangeLanguageReducer,CheckListTypeReducer,AttachmentReducer
});

export default RootReducer;
