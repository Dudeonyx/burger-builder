import produce from 'immer';
import { IContactDataReducerState, IContactDataReducerActions } from './types';
import { actionTypes } from '../actions';
const initialState: IContactDataReducerState = {
  error: false,
  submitting: false,
  orders: {},
};

export const contactDataReducer = produce(
  (draft, action: IContactDataReducerActions) => {
    switch (action.type) {
      case actionTypes.BURGER_ORDER_SUCCESSFUL:
        draft.orders[action.payload.name] = action.payload.order;
        draft.submitting = false;
        draft.error = false;
        break;
      case actionTypes.BURGER_ORDER_FAILED:
        draft.error = action.payload.error;
        draft.submitting = false;
        break;
      case actionTypes.SET_BURGER_ORDER_SUBMITTING:
        draft.error = false;
        draft.submitting = true;
        break;
      default:
        const _: never = action;
        break;
    }
  },
  initialState,
);
