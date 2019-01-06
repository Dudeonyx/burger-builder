import { IContactDataReducerState } from './types';
import { createSlice } from '@redux-ts-starter-kit/core';
import { IDbOrder } from '../ordersReducer/';
import { IStore } from '../../store';

const initialState: IContactDataReducerState = {
  error: false,
  submitting: false,
  orders: {},
};

export const {
  actions: contactDataActions,
  reducer: contactDataReducer,
  selectors: cDataSelectors,
} = createSlice({
  slice: 'cData',
  cases: {
    burgerOrderSuccessful: (
      state,
      payload: {
        name: string;
        order: IDbOrder;
      },
      _: IStore,
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
});
