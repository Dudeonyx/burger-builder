import { actionTypes } from '../actions';
import { AuthAction, IauthReducerState } from './types';
import produce from 'immer';

const initialState: IauthReducerState = {
  authenticating: false,
  error: null,
  idToken: null,
  userId: null,
  displayName: null,
};

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
      draft.error = action.payload.error;
      break;
    case actionTypes.AUTH_LOGOUT:
      draft.idToken = null;
      draft.userId = null;
      draft.displayName = null;
      break;
    default:
      const _: never = action;
      break;
  }
}, initialState);

export default authReducer;
