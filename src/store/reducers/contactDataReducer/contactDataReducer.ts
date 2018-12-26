import produce from 'immer';
import { IContactDataReducerState, IContactDataReducerActions } from './types';
import { actionTypes } from '../actions';
import { generateOrder } from './utilities';
import { IDbOrder } from '../ordersReducer/types';
import { updateform } from '../../../components/UI/Input/InputUtilities';
const initialState: IContactDataReducerState = {
  error: false,
  submitting: false,
  orders: {},
};

export const contactDataReducer = produce(
  (draft, action: IContactDataReducerActions) => {
    switch (action.type) {
      case actionTypes.ORDER_SUCCESSFUL:
        draft.orders[action.payload.name] = action.payload.order;
        draft.submitting = false;
        draft.error = false;
        break;
      case actionTypes.ORDER_FAILED:
        draft.error = action.payload.error;
        draft.submitting = false;
        break;
        case actionTypes.SET_ORDER_SUBMITTING:
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
