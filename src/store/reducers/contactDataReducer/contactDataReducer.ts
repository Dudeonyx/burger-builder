import produce from 'immer';
import { IContactDataReducerState } from './types';
import robodux from 'robodux-alt';
import { IDbOrder } from '../ordersReducer/types';

const initialState: IContactDataReducerState = {
  error: false,
  submitting: false,
  orders: {},
};

export const {
  actions: contactDataActions,
  reducer: contactDataReducer,
  selectors: { getCData },
} = robodux({
  actions: {
    burgerOrderSuccessful: (
      state,
      payload: {
        name: string;
        order: IDbOrder;
      },
    ) => {
      state.orders[payload.name] = payload.order;
      state.submitting = false;
      state.error = false;
    },
    burgerOrderFailed: (state, error: Error) => {
      state.error = error;
      state.submitting = false;
    },
    setBurgerOrderSubmitting: (state, payload: never) => {
      state.error = false;
      state.submitting = true;
    },
  },
  initialState,
  slice: 'cData',
});
