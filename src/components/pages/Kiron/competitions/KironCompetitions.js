import React, {useCallback, useEffect, useState} from 'react';
import {Link, useLocation,} from "react-router-dom";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {getFromLocalStorage} from "../../../utils/local-storage";
import "./competition.css"
import {useDispatch, useSelector} from 'react-redux'; // Import useDispatch hook
import {nareLeagueCompetitions, setState} from '../../../../redux/nareLeague';

const KironCompetitions = React.memo(
    () => {
        const dispatchRedux = useDispatch()
        const active_competition = useSelector((state) => state.nareLeague.competition_id)
        const pathLocation = window.location.pathname
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
            const competition = getFromLocalStorage('kiron_search_data')?.competition_id || '2';
            const updatedPathname = hasCompetitionId ? location.search : `competition_id=${competition}`;
            setPathname(updatedPathname);
        }, [location.search]);

        const fetchData = useCallback(async () => {
            let cached_competitions = getFromLocalStorage('kiron-competitions');

            if (!cached_competitions) {
                dispatchRedux(nareLeagueCompetitions())
            }

        }, []);

        const competitionData = useSelector((state) => state.nareLeague.competitions_data) || getFromLocalStorage('kiron-competitions')
        const error = useSelector((state) => state.nareLeague.error)

        useEffect(() => {
            const abort = new AbortController();
            fetchData();

            return () => {
                abort.abort()
            };
        }, []);

        const refreshPage = () => {
            window.location.reload()
        }

        const setActiveCompetition = (id) => {
            dispatchRedux(setState('competition_id', id))
        }

        return (
            competitionData &&
            <div className="app-countries-icons mt-4">
                <div className="container-fluid">
                    <div className="d-flex">
                        {error ?
                            <div className={'error-periods'} onClick={refreshPage}>
                                {/*{window.location.reload()}*/}
                                <div className={'error-message-periods'}>{error}</div>
                            </div> :
                            competitionData?.map((kiron_options, index) => (
                                <div key={index} className="league-countries">
                                    <div
                                        className={`country-flag-icon ${(pathname.includes(`competition_id=${kiron_options?.competition_id}`)) ? ' active-league ' : " "} justify-content-center`}>
                                        <Link
                                            to={`${pathLocation.includes('bet-history') ? '/nare-league' : pathLocation}?competition_id=${kiron_options?.competition_id||active_competition}`}
                                            onClick={() => setActiveCompetition(kiron_options?.competition_id)}>
                                <span className="icon">
                                   <LazyLoadImage
                                       className=""
                                       src={kiron_options?.image_url}
                                       alt=""
                                       style={{maxHeight: "25px"}}
                                   />
                                </span>
                                            <span className="country-name">{kiron_options?.competition_name}</span>
                                        </Link>
                                    </div>

                                </div>))}

                    </div>

                </div>
            </div>

        )
    });

export default React.memo(KironCompetitions);


