import { actionTypes } from './index';
import { Dispatch } from 'redux';
import axios from 'axios';
import { IAuthResponse } from '../authReducer/types';
import { API_KEY } from '../../../shared/API_KEY';
import { authActions } from '../authReducer/authReducer';

const {
  authLogout,
  authStart,
  authSuccess,
  authFail,
  setAuthRedirectUrl,
} = authActions;

export { setAuthRedirectUrl, authLogout };

const authTimeout = (expiresIn: string | number) => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, +expiresIn * 1000);
  };
};

const baseAuthUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const loginPath = 'verifyPassword?key=';
const signUpPath = 'signupNewUser?key=';
export const authenticate = (
  email: string,
  password: string,
  isSignup: boolean,
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authStart());
      const authData = {
        email,
        password,
        returnSecureToken: true,
      };
      const url = `${baseAuthUrl}${
        isSignup ? signUpPath : loginPath
      }${API_KEY}`;
      const response = await axios.post<IAuthResponse>(url, authData);
      const { data } = response;
      const { expiresIn } = data;

      const expiryDate = new Date(new Date().getTime() + +expiresIn * 1000);
      localStorage.setItem('expiryDate', expiryDate.toString());
      localStorage.setItem('idToken', data.idToken);
      localStorage.setItem('localId', data.localId);
      dispatch(authSuccess(data));
      dispatch(authTimeout(expiresIn) as any);
      // tslint:disable-next-line: no-console
      console.log(response);
    } catch (error) {
      dispatch(authFail(error));
      // tslint:disable-next-line: no-console
      console.error('[authenticate Action Error]', error);
    }
  };
};

export const checkPriorAuth = () => (dispatch: Dispatch) => {
  const idToken = localStorage.getItem('idToken');
  if (!idToken) {
    dispatch(authLogout());
  } else {
    const expiry = localStorage.getItem('expiryDate');
    const expiryDate = new Date(expiry != null ? expiry : '');
    const localId = localStorage.getItem('localId');
    if (expiryDate > new Date() && localId != null) {
      dispatch(authSuccess({ idToken, localId }));
      dispatch(authTimeout(
        (expiryDate.getTime() - new Date().getTime()) / 1000,
      ) as any);
    } else {
      dispatch(authLogout());
    }
  }
};
