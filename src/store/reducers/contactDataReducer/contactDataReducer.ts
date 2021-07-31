import { IContactDataReducerState } from "./types";
import { IDbOrder } from "../ordersReducer/";
import { CasesBuilder, createSlice } from "@redux-ts-starter-kit/slice";

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
  setBurgerOrderSubmitting: undefined;
}

export const {
  actions: contactDataActions,
  reducer: contactDataReducer,
  selectors: cDataSelectors,
} = createSlice<
  "cData",
  CasesBuilder<IContactDataReducerState, CDataActions>,
  IContactDataReducerState
>({
  name: "cData",
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
    setBurgerOrderSubmitting: (state) => {
      state.error = false;
      state.submitting = true;
    },
  },
  initialState,
});
