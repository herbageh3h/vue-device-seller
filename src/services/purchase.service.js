import { BASE_API_URL } from '../common/constants';
import axios from 'axios';
import { authHeader, hanldeResponseWithLoginCheck } from './base.service';

const API_URL = BASE_API_URL + '/api/purchase';

class PurchaseService {
  savePurchase(purchase) {
    const req = axios.post(API_URL, purchase, { headers: authHeader() });
    return hanldeResponseWithLoginCheck(req);
  }

  getAllPurchaseItems() {
    const req = axios.get(API_URL, { headers: authHeader() });
    return hanldeResponseWithLoginCheck(req);
  }
}

export default new PurchaseService();