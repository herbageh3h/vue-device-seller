import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader, hanldeResponseWithLoginCheck } from './base.service';

const API_URL = BASE_API_URL + '/api/user';

class UserService {
  changeRole(role) {
    const req = axios.put(
      API_URL + '/change/' + role,
      {},
      { headers: authHeader() }
    );
    return hanldeResponseWithLoginCheck(req);
  }
}

export default new UserService();
