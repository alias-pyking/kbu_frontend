import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { BrowserRouter } from 'react-router-dom';
// import {createStore,compose,applyMiddleware} from 'redux';
// import {Provider} from 'react-redux';
// import thunk from 'redux-thunk';
// import reducer from './store/reducers/auth';
import './index.css';
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";


ReactDOM.render(
<BrowserRouter>
    <App/>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
