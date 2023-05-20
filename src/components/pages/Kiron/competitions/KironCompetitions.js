import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation,} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {getFromLocalStorage, setLocalStorage} from "../../../utils/local-storage";
import makeRequest from "../../../utils/fetch-request";
import useAnalyticsEventTracker from "../../../analytics/useAnalyticsEventTracker";
import "./competition.css"



const KironCompetitions = (props) => {
    const {playgame}=props;
    let [kiron, setKiron] = useState(getFromLocalStorage('kiron-competitions'));
    const pathLocation=window.location.pathname

    const gaEventTracker = useAnalyticsEventTracker('Navigation');
    const [pathname, setPathname] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const hasCompetitionId = searchParams.has('competition_id');
        const competition = getFromLocalStorage('kiron_search_data')?.competition_id || '1';
        const initialPathname = `competition_id=${competition}`;

        if (hasCompetitionId) {
            return window.location.search;
        } else {
            return initialPathname;
        }
    });

    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const hasCompetitionId = searchParams.has('competition_id');
        const competition = getFromLocalStorage('kiron_search_data')?.competition_id  || '2';
        const updatedPathname = hasCompetitionId ? location.search : `competition_id=${competition}`;
        setPathname(updatedPathname);
    }, [location.search]);

    const fetchData = useCallback(async () => {
        let cached_competitions = getFromLocalStorage('kiron-competitions');
        let endpoint = "/v1/nare-league/competitions";
        let method="POST"

        if (!cached_competitions) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: method, data: null}),
            ]);
            let [c_status, c_result] = competition_result
            // console.log('kirons',c_result)
            if (c_status === 200) {
                setKiron(c_result);
                setLocalStorage('kiron-competitions', c_result);
            } else {
                fetchData()
            }
        } else {
            setKiron(cached_competitions);
        }

    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, []);



    return (
        kiron&&
        <div className="app-countries-icons mt-2">
            <div className="container-fluid">
                <div className="d-flex">
                    {kiron?.map((kiron_options, index) => (
                    <div key={index} className="league-countries">
                        <div className={`country-flag-icon ${(pathname.includes(`competition_id=${kiron_options?.competition_id}`))?' active-league ':" "} justify-content-center`}>
                            <Link to={`${pathLocation}?competition_id=${kiron_options.competition_id}`}>
                                <span className="icon">
                                   <LazyLoadImage
                                       className=""
                                       src={kiron_options?.image_url}
                                       alt=""
                                       style={{maxHeight: "25px"}}
                                   />
                                </span>
                                <span className="country-name">{kiron_options.competition_name}</span>
                            </Link>
                        </div>

                    </div>))}

                </div>

            </div>
        </div>

    )
};

export default React.memo(KironCompetitions);


