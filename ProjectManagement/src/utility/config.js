import { Dimensions } from 'react-native';
export const subHost = {
    call_kw: '/web/dataset/call_kw',
    authenticate: '/web/session/authenticate',
    logout: '/web/session/destroy',
    call_button: '/web/dataset/call_button',
}

//TODO: Get dynamic database.
export const userProfile = {
    uid:0,
    username: "",
    company:"",
    url:"",
    tz:"",
    lang:"",
    db:"xboss_uat",
    companyId:0
}

export const dataStatus = {
    NONE: 'NONE',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED'
}

export const userDemo = {
    username: "giangnamtran@hhdgroup.com",
    password: "123456789",
    url:''
}

export const maxWidthScreen = Dimensions.get('window').width;
