import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import './index.css';
import App from './App';
import configureStore from './store';
import * as sessionActions from './store/session';
import csrfFetch, { restoreCSRF } from './store/csrf';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <QueryParamProvider adapter={ReactRouter5Adapter}>
          <App />
        </QueryParamProvider>
      </BrowserRouter>
    </Provider>
  );
}

if (sessionStorage.getItem("X-CSRF-Token") === null) {
  restoreCSRF().then(renderApplication);
} else {
  renderApplication();
}