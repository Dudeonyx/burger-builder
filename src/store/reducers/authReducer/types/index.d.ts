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
  authRedirectUrl: string;
}
interface IAuthStart {
  type: typeof actionTypes.AUTH_START;
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
    error: Error;
}
interface IAuthLogout {
  type: typeof actionTypes.AUTH_LOGOUT;
}
interface IAuthRedirectUrl {
  type: typeof actionTypes.SET_AUTH_REDIRECT_URL;
  url: string;
}

export type AuthAction = IAuthStart | IAuthSuccess | IAuthFail | IAuthLogout|IAuthRedirectUrl;
