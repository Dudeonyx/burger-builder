export interface IAuthResponse {
  readonly kind: string;
  readonly localId: string;
  readonly idToken: string;
  readonly email: string;
  readonly displayName: string;
  readonly registered: true;
  readonly refreshToken: string;
  readonly expiresIn: string;
}
export interface IAuthReducerState {
  readonly authenticating: boolean;
  readonly error: Error & { [x: string]: any } | null;
  readonly displayName: string | null;
  readonly idToken: string | null;
  readonly userId: string | null;
  readonly authRedirectUrl: string;
}
