import React, {Suspense, useCallback, useContext, useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import store from "./redux/store";
import {BrowserRouter} from 'react-router-dom'
import reportWebVitals from './reportWebVitals';
import './assets/css/application.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/tolkits.css';
import './assets/css/sidebar-menu.css';
import './index.css';
import './assets/css/newCss.css'
import './assets/css/Themes.css'
import {StoreProvider} from "./context/store";
import Loading from "./components/loading/LoadingSuspense";
import { createRoot } from 'react-dom/client';

// import ReactPixel from 'react-facebook-pixel';
// import "firebase/messaging"; // Import the FCM module

// const TRACKING_ID = "G-5NLSN9BLN4";
// ReactGA.initialize(TRACKING_ID);

// const TRACKING_PIXEL_ID = "1297171947681785";
// ReactPixel.init(TRACKING_PIXEL_ID);
const App=React.lazy(()=>import("./App"));

const container = document.getElementById("app");
createRoot(container).render(
    <StoreProvider>
        <Provider store={store}>
        <BrowserRouter>
            <Suspense fallback={<Loading/>}>
                <App/>
            </Suspense>
        </BrowserRouter>
        </Provider>
    </StoreProvider>
);

reportWebVitals();
