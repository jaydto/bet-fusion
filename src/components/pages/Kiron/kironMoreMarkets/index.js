import React, {useCallback, useContext, useEffect, useState} from 'react';
import { useLocation} from "react-router-dom";
import 'react-lazy-load-image-component/src/effects/blur.css';
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";

import Button from "../../../utils/button";
import LinkSelect from "../../../utils/options";
import {Context} from "../../../../context/store";


const KironMoreMarkets= (props) => {
    const [options, setOptions] = useState(getFromLocalStorage('kiron-more'));
    const [state,dispatch]=useContext(Context)

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
        let endpoint = "/v1/nare-league/markets";
        let method="POST"

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: method, data: null}),
            ]);
            let [c_status, c_result] = competition_result
            // console.log('kirons',c_result)
            if (c_status === 200) {
                // setKiron(c_result);
                const labeledOptions = c_result.map(option => ({
                    to: "sub_type_id="+option.market_id,
                    label: option?.description
                }));


                setOptions(labeledOptions);

                setLocalStorage('kiron-more', labeledOptions);
            } else {
                fetchData()
            }
        } else {
            setOptions(cached_competitions);
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [])
    const handleMarketChoice=(market)=>{
        // dispatch({ type: "SET", key: 'marketActive', payload:market })
        dispatch({ type: "SET", key: 'start_fetching_match', payload: true })
    }
    // useEffect(()=>{
    //     if(state?.marketActive){
    //
    //     }
    //
    // },[state?.marketActive])

    return (
        options&&

        <div className="market-option">
            <div className="tabcontent pt-2 pb-2">
                <div className="sport_dropdowns">
                    <div className="double-chance-market text-start" style={{marginLeft:'1rem'}}>
                        <Button  to={`/nare-league?sub_type_id=3`} type="button" className={`more-market-button btn size-market-kiron size-market-kiron ${pathname.includes(`sub_type_id=3`)&& 'kiron-more-button-color '} `} onClick={()=>handleMarketChoice(3)}>1X2</Button>
                    </div>
                    <div className="double-chance-market text-center">
                        <Button  to={`/nare-league?sub_type_id=14`} type="button" className={`more-market-button btn remove-on-smaller-screen size-market-kiron  ${pathname.includes(`sub_type_id=14`)&& 'kiron-more-button-color '} `} onClick={()=>handleMarketChoice(14)}>Goal/No Goal</Button>
                    </div>
                    <div className="double-chance-market text-center">
                        <Button  to={`/nare-league?sub_type_id=8`} type="button" className={`more-market-button btn remove-on-smaller-screen size-market-kiron  ${pathname.includes(`sub_type_id=8`)&& 'kiron-more-button-color '} `}onClick={()=>handleMarketChoice(8)}>Over/Under 2.5</Button>
                    </div>
                    <div className="double-chance-market text-center">

                        <div className="select ">
                            <LinkSelect options={options}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default React.memo(KironMoreMarkets);


