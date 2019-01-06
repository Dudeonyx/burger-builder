import { IordersReducerState, IDbOrders } from './types';
import { createSlice } from '@redux-ts-starter-kit/core';
import { IStore } from '../../';

const initialState: IordersReducerState = {
  orders: null,
  loading: false,
  error: null,
};

const ordersRobodux = createSlice({
  slice: 'ords',
  initialState,
  cases: {
    setOrders: (state, orders: IDbOrders, _: IStore) => {
      state.error = null;
      state.orders = orders;
      state.loading = false;
    },
    setOrdersError: (state, error: Error) => {
      state.error = error;
      state.loading = false;
    },
    setOrdersLoading: (state, n: never) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  reducer: ordersReducer,
  actions: ordersActions,
  selectors: ordersSelectors,
} = ordersRobodux;
