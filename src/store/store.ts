import {
  configureStore,
  getDefaultMiddleware,
  AnyAction,
} from '@redux-ts-starter-kit/core';
import {
  contactDataReducer,
  authReducer,
  ordersReducer,
  ingredientReducer,
} from './reducers/';
import { Action } from 'redux';

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
  ings: ReturnType<typeof ingredientReducer>;
  cData: ReturnType<typeof contactDataReducer>;
  ords: ReturnType<typeof ordersReducer>;
  auth: ReturnType<typeof authReducer>;
}

export const [store, kjkjj,] = configureStore({
  reducer: {
    ings: ingredientReducer,
    cData: contactDataReducer,
    ords: ordersReducer,
    auth: authReducer,
  },
  middleware: [...getDefaultMiddleware(),],
});

export default store;
