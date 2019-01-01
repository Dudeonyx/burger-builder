import { IauthReducerState } from './types';
import robodux from 'robodux-alt';
import { IStore } from '../../store';

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
const authRobodux = robodux<IauthReducerState, IRAuthActions, IStore>({
  slice: 'auth',
  actions: {
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

export const { reducer: authReducer, actions: authActions } = authRobodux;

export default authReducer;
