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
  IauthReducerState,
  IordersReducerState,
  IContactDataReducerState,
  IingredientReducerState,
} from './reducers/';

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
  auth: IauthReducerState;
}

export const [store, kjkjj,] = configureStore<IStore>({
  reducer: {
    ings: ingredientReducer,
    cData: contactDataReducer,
    ords: ordersReducer,
    auth: authReducer,
  },
  middleware: [...getDefaultMiddleware(),],
});

export default store;
