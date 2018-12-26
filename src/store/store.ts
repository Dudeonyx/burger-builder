import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import { ingredientReducer } from './reducers/ingredientReducer/ingredientReducer';
import { contactDataReducer } from './reducers/contactDataReducer/contactDataReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { ordersReducer } from './reducers/ordersReducer/ordersReducer';
import authReducer from './reducers/authReducer/authReducer';

const rootReducer = combineReducers({
  ings: ingredientReducer,
  cData: contactDataReducer,
  ords: ordersReducer,
  auth: authReducer,
});

const logger = (myStore: { getState: () => any }) => {
  return (next: (arg0: Action) => any) => {
    return (action: Action) => {
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

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);
