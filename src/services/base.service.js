import Router from '../router';
import Store from '../store';

export const authHeader = () => {
  const { currentUser } = Store.state;

  return {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + currentUser?.token,
  };
};

export const hanldeResponseWithLoginCheck = (promise) => {
  return promise
    .then((data) => {
      return data;
    })
    .catch((err) => {
      const status = err?.response?.status;

      if (status === 403 || status === 401 || status === 500) {
        Store.dispatch('clearUser').then(() => {
          Router.push({ name: 'login' }).catch((e) => console.log(e));
        });
      }

      return Promise.reject(err);
    });
};
