import { IordersReducerState as IOrdersReducerState, IDbOrders } from './types';
import { createSlice } from '@redux-ts-starter-kit/core';
import { IStore } from '../../';

const initialState: IOrdersReducerState = {
  orders: null,
  loading: false,
  error: null,
};

interface IOrdersActions {
  setOrders: IDbOrders;
  setOrdersError: Error;
  setOrdersLoading: never;
}

const ordersRobodux = createSlice<IOrdersActions, IOrdersReducerState, IStore>({
  slice: 'ords',
  initialState,
  cases: {
    setOrders: (state, orders) => {
      state.error = null;
      state.orders = orders;
      state.loading = false;
    },
    setOrdersError: (state, error) => {
      state.error = error;
      state.loading = false;
    },
    setOrdersLoading: state => {
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
