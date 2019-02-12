import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './containers/App/App';
import './index.css';
// import './normalize.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { checkPriorAuth } from './store/actions';

// (window as any).React = React;
React;
store.dispatch(checkPriorAuth());

const app = (
  <Provider store={store}>
    <Router basename="/burger-builder">
      <Route component={App} />
    </Router>
  </Provider>
);

// ReactDOM.render(<div>jhkjhkjhkjhkhjkj</div>, document.getElementById('root'));
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
