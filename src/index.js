import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import {createStore,compose,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './store/reducers/auth';
import './index.css';
import { AuthProvider } from "./contexts/AuthContext";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose

const store = createStore(reducer,composeEnhances(
  applyMiddleware(thunk)
));



ReactDOM.render(
  <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </AuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
