import { IContactDataReducerState } from './types';
import { createSlice } from '@redux-ts-starter-kit/core';
import { IDbOrder } from '../ordersReducer/';

const initialState: IContactDataReducerState = {
  error: false,
  submitting: false,
  orders: {},
};

interface CDataActions {
  burgerOrderSuccessful: {
    name: string;
    order: IDbOrder;
  };
  burgerOrderFailed: Error;
  setBurgerOrderSubmitting: never;
}

export const {
  actions: contactDataActions,
  reducer: contactDataReducer,
  selectors: cDataSelectors,
} = createSlice<CDataActions, IContactDataReducerState, 'cData'>({
  slice: 'cData',
  cases: {
    burgerOrderSuccessful: (state, payload) => {
      state.orders[payload.name] = payload.order;
      state.submitting = false;
      state.error = false;
    },
    burgerOrderFailed: (state, error) => {
      state.error = error;
      state.submitting = false;
    },
    setBurgerOrderSubmitting: state => {
      state.error = false;
      state.submitting = true;
    },
  },
  initialState,
});
