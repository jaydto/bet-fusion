import React, {useContext, useEffect} from "react";

import {render} from "react-dom";

import {
    BrowserRouter,
    Route, Routes,
    Navigate
} from 'react-router-dom'

import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/application.css';
import './assets/css/tolkits.css';
import './assets/css/sidebar-menu.css';
import './index.css';
import Store, { Context }  from './context/store';
import Index  from './components/index';
import CompetitionsMatches  from './components/competition-matches';
import MatchAllMarkets  from './components/all-markets';
import Jackpot  from './components/jackpot';
import HowToPlay from './components/pages/HowToPlay'
import TermsAndConditions from './components/pages/terms-and-conditions/index'
import CookiePolicy from './components/pages/cookie-policy/index'
import DisputeResolution from './components/pages/dispute-resolution/index'
import ResponsibleGambling from './components/pages/responsible-gambling'
import AntimoneyLaundering from './components/pages/anti-money-laundering'
import PrivacyPolicy from './components/pages/privacy-policy/index'


const container = document.getElementById("app");
render((
    <Store>
        <BrowserRouter>
            <Routes>
               <Route exact path = "/" element = { <Index /> }  />
               <Route exact path = "/highlights" element = { <Index /> }  />
               <Route exact path = "/upcoming" element = { <Index /> }  />
               <Route exact path = "/tomorrow" element = { <Index /> }  />
               <Route exact path = "/competition/:id" element = { <CompetitionsMatches /> }  />
               <Route exact path = "/match/:id" element = { <MatchAllMarkets /> }  />
               <Route exact path = "/jackpot" element = { <Jackpot /> }  />
               <Route exact path="/privacy-policy" element={<PrivacyPolicy/>}/>
               <Route exact path="/anti-money-laundering" element={<AntimoneyLaundering/>}/>
               <Route exact path="/responsible-gambling" element={<ResponsibleGambling/>}/>
               <Route exact path="/dispute-resolution" element={<DisputeResolution/>}/>
               <Route exact path="/cookie-policy" element={<CookiePolicy/>}/>
               <Route exact path="/terms-and-conditions" element={<TermsAndConditions/>}/>
               <Route exact path="/how-to-play" element={<HowToPlay/>}/>
            </Routes>
        </BrowserRouter>
    </Store>
), container);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
