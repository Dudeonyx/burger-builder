import { actionTypes } from './index';
import { Dispatch } from 'redux';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (authData: any) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: {
      authData,
    },
  };
};
export const authFail = (error: Error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: {
      error,
    },
  };
};

export const authenticate = (email: string, password: string) => {
  return (dispatch: Dispatch) => {
    dispatch(authStart());
  };
};
