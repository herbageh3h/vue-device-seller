import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader, hanldeResponseWithLoginCheck } from './base.service';

const API_URL = BASE_API_URL + '/api/device';

class DeviceService {
    saveDevice(device) {
        const req = axios.post(API_URL, device, {headers: authHeader()});
        return hanldeResponseWithLoginCheck(req);
    }

    deleteDevice(device) {
        const req = axios.delete(API_URL + '/' + device.id, {headers: authHeader()});
        return hanldeResponseWithLoginCheck(req);
    }

    getAllDevices() {
        return axios.get(API_URL);
    }
}

export default new DeviceService();
