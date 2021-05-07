import { combineEpics } from 'redux-observable';
import AuthenticationEpic from '../epics/authentication/AuthenticationEpic';
import TaskEpic from '../epics/task/TaskEpic';
import ProjectEpic from '../epics/project/ProjectEpic'
import UserEpic from '../epics/user/UserEpic'
import ProjectTypeEpic from '../epics/project-type/ProjectTypeEpic'
import TaskTypeEpic from '../epics/task-type/TaskTypeEpic'
import PartnerEpic from '../epics/partner/PartnerEpic'
import CheckListEpic from '../epics/check-list-task/CheckListEpic'
import AttachmentEpic from '../epics/attachment/AttachmentEpic'
export default combineEpics(
    AuthenticationEpic, TaskEpic, ProjectEpic,UserEpic, ProjectTypeEpic, TaskTypeEpic,PartnerEpic,CheckListEpic,AttachmentEpic
)