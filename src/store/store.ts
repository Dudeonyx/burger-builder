import { createStore, combineReducers } from 'redux';
import { ingredientReducer } from './reducers/ingredientReducer/ingredientReducer';
import { contactDataReducer } from './reducers/contactDataReducer/contactDataReducer';

const rootReducer = combineReducers({
  ings: ingredientReducer,
  cData: contactDataReducer,
});

export const store = createStore(
  rootReducer,
  undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
