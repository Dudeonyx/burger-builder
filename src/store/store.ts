import { configureStore } from '@redux-ts-starter-kit/core';
import {
  contactDataReducer,
  authReducer,
  ordersReducer,
  ingredientReducer,
  IAuthReducerState,
  IordersReducerState,
  IContactDataReducerState,
  IingredientReducerState,
} from './reducers/';
import { AnyAction } from 'redux';

const logger = (myStore: { getState: () => any }) => {
  return (next: (arg0: AnyAction) => any) => {
    return (action: AnyAction) => {
      // tslint:disable-next-line:no-console
      console.log('[Middleware logger] action: ', action);
      const result = next(action);
      // tslint:disable-next-line:no-console
      console.log('[Middleware logger] store: ', myStore.getState());
      // tslint:disable-next-line:no-console
      console.log('--------------[Middleware logger] DONE--------------');
      return result;
    };
  };
};
export interface IStore {
  ings: IingredientReducerState;
  cData: IContactDataReducerState;
  ords: IordersReducerState;
  auth: IAuthReducerState;
}

export const store = configureStore<IStore>({
  reducer: {
    ings: ingredientReducer,
    cData: contactDataReducer,
    ords: ordersReducer,
    auth: authReducer,
  },
});

export default store;
