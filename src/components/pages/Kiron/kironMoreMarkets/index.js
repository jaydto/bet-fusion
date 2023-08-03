import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import { useDispatch,useSelector } from 'react-redux'; // Import useDispatch hook
import {nareLeagueMarkets, setState} from '../../../../redux/nareLeague';

import Button from "../../../utils/button";
import LinkSelect from "../../../utils/options";
import {StoreContext } from "../../../../context/store"


const KironMoreMarkets= React.memo(
    () => {
    const { state, dispatch } = useContext(StoreContext);
    const dispatchRedux=useDispatch()

    const [pathname, setPathname] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const hasSubTypeId = searchParams.has('sub_type_id');
        const subTypeId = getFromLocalStorage('kiron_search_data')?.sub_type_id || '3';
        const initialPathname = `sub_type_id=${subTypeId}`;

        if (hasSubTypeId) {
            return window.location.search;
        } else {
            return initialPathname;
        }
    });

    const options=useSelector((state)=>state.nareLeague.market_options)||getFromLocalStorage('kiron-more')
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hasSubTypeId = searchParams.has('sub_type_id');
        const subTypeId = getFromLocalStorage('kiron_search_data')?.sub_type_id || '3';
        const updatedPathname = hasSubTypeId ? location.search : `sub_type_id=${subTypeId}`;
        setPathname(updatedPathname);
    }, [location.search]);
    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('kiron-more');


        if (!cached_competitions) {
            dispatchRedux(nareLeagueMarkets())
        }

    }, []);

    useEffect(() => {
        const abort = new AbortController();
        fetchData();

        return () => {
            abort.abort()
        };
    }, [])
    const handleMarketChoice=(market)=>{
        dispatchRedux(setState('active_market',market))
    }

    return (
        options&&
        <div className="market-option">
            <div className="tabcontent pt-2 pb-2">
                <div className="sport_dropdowns">
                    <div className="double-chance-market text-start" style={{marginLeft:'1rem'}}>
                        <Button  to={`/nare-league?sub_type_id=3`} type="button" choice={pathname.includes(`sub_type_id=3`)&& 'kiron-more-button-color '} className={`more-market-button btn size-market-kiron size-market-kiron ${pathname.includes(`sub_type_id=3`)&& 'kiron-more-button-color more-market-default '} `} onClick={()=>handleMarketChoice(3)}>1X2</Button>
                    </div>
                    <div className="double-chance-market text-center">
                        <Button  to={`/nare-league?sub_type_id=14`} choice={pathname.includes(`sub_type_id=14`)&& 'kiron-more-button-color '}type="button" className={`more-market-button btn remove-on-smaller-screen size-market-kiron  ${pathname.includes(`sub_type_id=14`)&& 'kiron-more-button-color '} `} onClick={()=>handleMarketChoice(14)}>Goal/No Goal</Button>
                    </div>
                    <div className="double-chance-market text-center">
                        <Button  to={`/nare-league?sub_type_id=8`} type="button" choice={pathname.includes(`sub_type_id=8`)&& 'kiron-more-button-color '} className={`more-market-button btn remove-on-smaller-screen size-market-kiron  ${pathname.includes(`sub_type_id=8`)&& 'kiron-more-button-color '} `}onClick={()=>handleMarketChoice(8)}>Over/Under 2.5</Button>
                    </div>
                    <div className="double-chance-market mx-3">

                        <div className="select">
                            <LinkSelect options={options}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default React.memo(KironMoreMarkets);


