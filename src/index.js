import React, {useEffect, useCallback, Suspense} from "react";
import {render} from "react-dom";

import {
    BrowserRouter, Navigate,
    Route,
    Routes,
    useNavigate,
} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/application.css';
import './assets/css/tolkits.css';
import './assets/css/sidebar-menu.css';
import './index.css';
import './assets/css/sidebar-menu.css';
import Store from './context/store';
import ReactGA from 'react-ga4';

import App from "./App";

const TRACKING_ID = "G-5NLSN9BLN4";
ReactGA.initialize(TRACKING_ID);


const container = document.getElementById("app");
render((
    <Store>
        <BrowserRouter>
            <Suspense fallback={<p> Loading ... </p>}>
              <App/>
            </Suspense>
        </BrowserRouter>
    </Store>
), container);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
