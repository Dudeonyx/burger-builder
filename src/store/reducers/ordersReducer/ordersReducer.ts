import { IordersReducerState as IOrdersReducerState, IDbOrders } from "./types";
import { CasesBuilder, createSlice } from "@redux-ts-starter-kit/slice";

const initialState: IOrdersReducerState = {
  orders: null,
  loading: false,
  error: null,
};

interface OrdersActions {
  setOrders: IDbOrders;
  setOrdersError: Error;
  setOrdersLoading: undefined;
}

const ordersSlice = createSlice<
  "ords",
  CasesBuilder<IOrdersReducerState, OrdersActions>,
  IOrdersReducerState
>({
  name: "ords",
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
    setOrdersLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
  },
});

export const {
  reducer: ordersReducer,
  actions: ordersActions,
  selectors: ordersSelectors,
} = ordersSlice;
