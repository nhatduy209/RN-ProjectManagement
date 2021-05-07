import { dataStatus, userProfile } from '../utility/config';
import AuthenticateService from '../services/AuthenticateService'
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'underscore';
import {
    GoogleSignin,
    statusCodes,
} from '@react-native-google-signin/google-signin';
export default class LoginBusiness {

    onSaveUserInfo = async value => {
        await AsyncStorage.setItem('userInfo', JSON.stringify(value)).catch(
            error => {
                console.error('Error when save list user');
                return false;
            },
        );
        return true;
    };

    onGetListUser = async () => {
        const listUser = await AsyncStorage.getItem('userInfo');
        if (listUser !== null) {
            return JSON.parse(listUser);
        } else {
            return [];
        }
    };

    loginERP = async (data, success, failed) => {
        try {
            const { db, userName, password, url } = data
            userProfile.url = 'https://' + url
            const authenticate = new AuthenticateService();
            const result = await authenticate.loginERP(db, userName, password);
            if (result.status === dataStatus.SUCCESS) {
                const data = result.data;
                const userProfileCustom = {
                    uid: data.uid,
                    avatar: `${userProfile.url}/web/image?model=res.users&id=${data.uid}&field=image`,
                    userName: data.name,
                    companyName: data.user_companies.current_company[1],
                    companyId : data.user_companies.current_company[0]
                }

                const userInfo = {
                    uid: data.uid,
                    name: userName,
                    url: url,
                };
                let listUser = await this.onGetListUser();
                if (_.findIndex(listUser, { uid: userProfileCustom.uid }) === -1) {
                    listUser.push(userInfo);
                    this.onSaveUserInfo(listUser).then(async resp => {
                        if (resp) {
                            console.log('List user: ', listUser);
                        } else {
                            console.log('Error');
                        }
                    });
                }
                userProfile.uid = data.uid
                userProfile.company = data.user_companies.current_company[1]
                userProfile.username = data.name
                userProfile.tz = data.user_context.tz
                userProfile.lang = data.user_context.lang
                userProfile.companyId = data.user_companies.current_company[0]
                success({
                    status: dataStatus.SUCCESS,
                    message: 'Get data success',
                    data: userProfileCustom
                });
            } else {
                failed(result);
            }

        } catch (error) {
            failed(error);
        }
    };
    logout = async (success, failed) => {
        try {
            const authenticate = new AuthenticateService();
            const res = await authenticate.logoutERP()
            success(res)
        } catch (error) {
            failed(error)
        }
    }

    // 1 func login by google API
    signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const userInfor = await GoogleSignin.signIn();
            const token = await GoogleSignin.getTokens();
            console.log(token);
            console.log(userInfor);
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log(2);
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log(3);
                // operation (e.g. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log(4);
            } else {
                // some other error happened
                console.log(5);
            }
        }
    };
}
