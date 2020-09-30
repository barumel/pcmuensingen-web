import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { throttle } from 'lodash';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './Store';
import rootReducer from './reducers';
import sagas from './sagas';
import { saveState } from './LocalStorage';

/*
Configure store and subscribe persist
 */
const store = configureStore(rootReducer, sagas);
// persist parts of the state to the local storage
// because this is expensiv, we do it only once per second
store.subscribe(throttle(() => {
  // add sub-parts of the state here to persist them over reloads
  saveState({
    environment: store.getState().environment,
    user: store.getState().user
  }, localStorage);
}, 1000));

function render(App) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    render(NextApp);
  });
}
