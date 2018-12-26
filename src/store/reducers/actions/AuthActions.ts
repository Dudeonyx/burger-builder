import { actionTypes } from './index';
import { Dispatch } from 'redux';
import axios from 'axios';
import { AuthAction, IAuthResponse } from '../authReducer/types';

export const authStart = (): AuthAction => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = ({
  displayName,
  idToken,
  localId,
}: IAuthResponse): AuthAction => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      displayName,
      idToken,
      localId,
    },
  };
};
export const authFail = (error: Error): AuthAction => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error,
    },
  };
};
export const authLogout = (): AuthAction => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const authTimeout = (expiresIn: string) => {
  return (dispatch: Dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, parseInt(expiresIn, 10) * 1000);
  };
};
const baseAuthUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/';
const API_KEY = 'AIzaSyBwcMch0YFm-eOcVzSNj8ecthH2t4_72FA';
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
