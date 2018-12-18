import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './containers/App/App';
import './index.css';
import './normalize.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import { ingredientReducer } from './store/reducers/ingredientReducer';

const store = createStore(
  ingredientReducer,
  undefined,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

const app = (
  <Provider store={store}>
    <BrowserRouter basename="/burger-builder">
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
