import axios from 'axios';
import { AUTH_LOGOUT, SET_USER_INFO } from './actionsTypes';

export const setUserInfo = (payload) => ({ type: SET_USER_INFO, payload });
export const storeLogout = () => ({ type: AUTH_LOGOUT });

export function loginUser({ login, password }) {
  return (dispatch) => {
    try {
      axios
        .post('http://localhost:4000/api/auth/login', { login, password })
        .then((response) => {
          if (response.status === 200) {
            dispatch(setUserInfo(response.data));
          }
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
}

export function logoutUser() {
  return (dispatch) => {
    try {
      axios
        .get('http://localhost:4000/api/auth/logout')
        .then((response) => { dispatch(storeLogout()); })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
}