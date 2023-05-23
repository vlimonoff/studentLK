import { AUTH_LOGOUT, SET_USER_INFO } from './actionsTypes';

const preloadedState = JSON.parse(window.localStorage.getItem('user')) || { isAuthenticated: false };

const initialState = {
  ...preloadedState,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_INFO: {
      window.localStorage.setItem('user', JSON.stringify({ isAuthenticated: true, ...action.payload }));
      return { ...state, ...action.payload, isAuthenticated: true };
    }

    case AUTH_LOGOUT: {
      window.localStorage.removeItem('user');
      return { isAuthenticated: false };
    }

    default:
      return state;
  }
}
