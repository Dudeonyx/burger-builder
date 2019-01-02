import { IordersReducerState, IDbOrders } from './types';
import robodux, { createSliceAlt } from 'robodux-alt';
import { IStore } from '../../store';

const initialState: IordersReducerState = {
  orders: null,
  loading: false,
  error: null,
};

const ordersRobodux = createSliceAlt({
  slice: 'ords',
  initialState,
  actions: {
    setOrders: (state, orders: IDbOrders, _:IStore) => {
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
export default ordersReducer;

/* export const ordersReducer = produce((draft, action: IordersReducerAction) => {
  switch (action.type) {
    case actionTypes.SET_ORDERS_ERROR:
      draft.error = action.payload.error;
      draft.loading = false;
      break;
    case actionTypes.SET_ORDERS_LOADING:
      draft.loading = true;
      draft.error = null;
      break;
    case actionTypes.SET_ORDERS:
      // draft.orders = action.payload.orders;
      draft.error = null;
      draft.orders = action.payload.orders;
      draft.loading = false;
      break;
    default:
      const _: never = action;
      break;
  }
}, initialState); */
