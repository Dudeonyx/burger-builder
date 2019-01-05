import {configureStore, 
  getDefaultMiddleware,
} from '@redux-ts-starter-kit/core';
import { ordersReducer } from './reducers/ordersReducer/ordersReducer';
import authReducer from './reducers/authReducer/authReducer';
import contactDataReducer from './reducers/contactDataReducer';
import ingredientReducer from './reducers/ingredientReducer';
import { AnyAction } from 'redux';

export interface IStore {
  ings: ReturnType<typeof ingredientReducer>;
  cData: ReturnType<typeof contactDataReducer>;
  ords: ReturnType<typeof ordersReducer>;
  auth: ReturnType<typeof authReducer>;
}

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

export const [store,] = configureStore<IStore>({
  reducer: {
    ings: ingredientReducer,
    cData: contactDataReducer,
    ords: ordersReducer,
    auth: authReducer,
  },
  middleware: [...getDefaultMiddleware(),],
});

export default store;
