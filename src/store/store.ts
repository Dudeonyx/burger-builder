import { createStore } from 'redux';
import { ingredientReducer } from './reducers/ingredientReducer';

export const store = createStore(
  ingredientReducer,
  undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);
