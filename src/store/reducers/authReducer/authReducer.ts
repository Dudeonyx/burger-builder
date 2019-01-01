import { actionTypes } from '../actions';
import { AuthAction, IauthReducerState } from './types';
import produce from 'immer';
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
  authFail: Error & { [x: string]: any };
  authLogout: never;
  setAuthRedirectUrl: string;
}
const authRobodux = robodux<IRAuthActions, IauthReducerState, IStore>({
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
authRobodux.selectors.getAuth;
// tslint:disable-next-line: no-console
console.log({ authRobodux });
export const { actions, reducer: rAuthReducer } = authRobodux;

const authReducer = produce((draft, action: AuthAction) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      draft.authenticating = true;
      draft.error = null;
      break;
    case actionTypes.AUTH_SUCCESS:
      draft.authenticating = false;
      draft.error = null;
      draft.userId = action.payload.localId;
      draft.idToken = action.payload.idToken;
      break;
    case actionTypes.AUTH_FAIL:
      draft.authenticating = false;
      draft.error = action.error;
      break;
    case actionTypes.AUTH_LOGOUT:
      draft.idToken = null;
      draft.userId = null;
      draft.displayName = null;
      break;
    case actionTypes.SET_AUTH_REDIRECT_URL:
      draft.authRedirectUrl = action.url;
      break;
    default:
      const _: never = action;
      break;
  }
}, initialState);

export default rAuthReducer;
