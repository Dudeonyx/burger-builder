import { actionTypes } from './index';
import { Dispatch } from 'redux';
import axios from 'axios';
import {
  IAuthResponse,
  IAuthRedirectUrl,
  IAuthFail,
  IAuthLogout,
  IAuthSuccess,
  IAuthStart,
} from '../authReducer/types';
import { API_KEY } from '../../../shared/API_KEY';

export const authStart = (): IAuthStart => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = ({
  displayName = '',
  idToken,
  localId,
}: {
  idToken: string;
  localId: string;
  displayName?: string;
}): IAuthSuccess => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      displayName,
      idToken,
      localId,
    },
  };
};
export const authFail = (error: Error): IAuthFail => {
  return {
    type: actionTypes.AUTH_FAIL,
    error,
  };
};
export const authLogout = (): IAuthLogout => {
  localStorage.removeItem('expiryDate');
  localStorage.removeItem('idToken');
  localStorage.removeItem('localId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const authTimeout = (expiresIn: string | number) => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, +expiresIn * 1000);
  };
};

export const setAuthRedirectUrl = (url: string): IAuthRedirectUrl => ({
  type: actionTypes.SET_AUTH_REDIRECT_URL,
  url,
});

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
