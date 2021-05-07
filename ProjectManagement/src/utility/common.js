import { userProfile } from './config';
import { request, checkMultiple, PERMISSIONS, RESULTS } from 'react-native-permissions';
import _, { result } from 'underscore';

class common {
  static getUserAvartar(uid) {
    return `${userProfile.url}/web/image?model=res.users&id=${uid}&field=image`;
  }
  static getPartnerAvartar(uid) {
    return `${userProfile.url}/web/image?model=res.partner&id=${uid}&field=image`;
  }
  static async checkPermissions() {
    let flag = false
    const statuses = await checkMultiple([PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE])
   
    switch (statuses[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]) {
      case RESULTS.UNAVAILABLE:

      case RESULTS.BLOCKED:

      case RESULTS.GRANTED:
        flag = true
      case RESULTS.DENIED:
        const result = this.requestPermissionsssss(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)
        if (result === RESULTS.GRANTED)
          this.flag = true

        break;

    }
    switch (statuses[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]) {
      case RESULTS.UNAVAILABLE:

      case RESULTS.BLOCKED:

      case RESULTS.GRANTED:
        flag = true
      case RESULTS.DENIED:
        const result = this.requestPermissionsssss(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        if (result === RESULTS.GRANTED)
          this.flag = true

        break;
    }
    return flag


  }
  static async requestPermissionsssss(permissionname) {
    try {
      const result = await request(permissionname)
      return result
    } catch (error) {
      console.log(error)
    }
  }

  static convertArrayToString = (array = [0,''], isId= false) => {
    if(!_.isUndefined(array)){
      if(isId){
        return array[0];
      }
        return array[1]
    }
  }
}
export default common;
