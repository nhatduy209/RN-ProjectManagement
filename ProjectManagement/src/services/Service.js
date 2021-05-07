import _ from 'underscore';
import axios from 'axios';
import { dataStatus, userProfile } from '../utility/config';
class Service {
    callPostAPI = async (params, subUrl = '') => {
        try {
            const url = userProfile.url + subUrl
            const newparams = {
                params: params
            }
            console.log(`URL: ${url} - Params: ${JSON.stringify(newparams)}`)
            const response = await axios.post(url, newparams);
            console.log("SERVICE: ", response)
            if (typeof (response.data) === 'object' && 'error' in response.data) {
                return {
                    status: dataStatus.FAILED,
                    message: response.data.error.message
                }
            } else {
                return {
                    status: dataStatus.SUCCESS,
                    data: response.data.result
                }
            }
        } catch (error) {
            console.log(`Error when call API: `, error);
            return {
                status: dataStatus.FAILED,
                message: 'Call API error'
            }
        }
    }
    callGetAPI = async (params, subUrl = '') => {
        try {
            const url = userProfile.url + subUrl
            const newparams = {
                params: params
            }
            const response = await axios.get(url, newparams);
            if (typeof (response) === 'object' && 'error' in response) {
                return {
                    status: dataStatus.FAILED,
                    message: response.error.data.message
                }
            }
            else {
                return {
                    status: dataStatus.SUCCESS,
                    data: response.result
                }
            }
        } catch (error) {
            console.log(`Error when call API: `, error)
            return {
                status: dataStatus.FAILED,
                message: 'Call API error'
            }
        }
    }
}

export default Service;