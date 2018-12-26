import { actionTypes } from '../actions';
import { AuthAction } from './types';
import produce from 'immer';

const initialState = {
  authenticating: false,
};

const authReducer = produce((draft, { type, payload }: AuthAction) => {
  switch (type) {
    case actionTypes.AUTH_START:
      draft.authenticating = true;
      break;
    case actionTypes.AUTH_SUCCESS:
      draft.authenticating = false;
      break;
    case actionTypes.AUTH_FAIL:
      draft.authenticating = false;
      break;
    default:
      const _: never = type;
      break;
  }
}, initialState);

export default authReducer;
