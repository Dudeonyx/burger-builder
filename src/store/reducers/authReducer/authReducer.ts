import { IauthReducerState } from './types';
import { createSlice } from '@redux-ts-starter-kit/core';
import { IStore } from '../../';

const initialState: IauthReducerState = {
  authenticating: false,
  error: null,
  idToken: null,
  userId: null,
  displayName: null,
  authRedirectUrl: '/',
};
interface IRAuthActions {
  authStart: never;
  authSuccess: { localId: string; idToken: string };
  authFail: Error;
  authLogout: never;
  setAuthRedirectUrl: string;
}
const authSlice = createSlice<IRAuthActions, IauthReducerState, IStore>({
  slice: 'auth',
  cases: {
    authStart: state => {
      state.authenticating = true;
      state.error = null;
    },
    authSuccess: (state, payload) => {
      state.authenticating = false;
      state.error = null;
      state.userId = payload.localId;
      state.idToken = payload.idToken;
    },
    authFail: (state, payload) => {
      state.authenticating = false;
      state.error = payload;
    },
    authLogout: state => {
      state.idToken = null;
      state.userId = null;
      state.displayName = null;
    },
    setAuthRedirectUrl: (state, payload) => {
      state.authRedirectUrl = payload;
    },
  },
  initialState,
});

export const {
  reducer: authReducer,
  actions: authActions,
  selectors: authSelectors,
} = authSlice;

export default authReducer;
