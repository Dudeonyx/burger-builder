import { actionTypes } from '../../actions';

export interface IAuthResponse {
  kind: string;
  localId: string;
  idToken: string;
  email: string;
  displayName: string;
  registered: true;
  refreshToken: string;
  expiresIn: string;
}
export interface IauthReducerState {
  authenticating: boolean;
  error: Error & { [x: string]: any } | null;
  displayName: string | null;
  idToken: string | null;
  userId: string | null;
}
interface IAuthStart {
  type: typeof actionTypes.AUTH_START;
  payload?: null;
}
interface IAuthSuccess {
  type: typeof actionTypes.AUTH_SUCCESS;
  payload: {
    localId: string;
    idToken: string;
    displayName?: string;
  };
}
interface IAuthFail {
  type: typeof actionTypes.AUTH_FAIL;
  payload: {
    error: Error;
  };
}
interface IAuthLogout {
  type: typeof actionTypes.AUTH_LOGOUT;
  payload?: null;
}

export type AuthAction = IAuthStart | IAuthSuccess | IAuthFail | IAuthLogout;
