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
