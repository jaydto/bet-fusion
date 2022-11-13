import React, {useCallback, useEffect, useState} from 'react';
import HomeSvg from '../../assets/svg/home-icon.svg';
import VirtualSvg from '../../assets/svg/virtuals.svg';
import LiveSvg from '../../assets/svg/live.svg';
import ProfileSvg from '../../assets/svg/profile.svg';
import BetslipSvg from '../../assets/svg/betslip.svg';
import {getBetslip} from "../utils/betslip";
import makeRequest from "../utils/fetch-request";
import {Badge} from "react-bootstrap";

const MobileMenu = (props) => {
    console.log("props aere here ", props)
    const [liveSports, setLiveSports] = useState();
    const {jackpot, betslipValidationData, jackpotData} = props;
    const [betSlipMobile, setBetSlipMobile] = useState(false);

    const fetchData = useCallback(() => {
        let endpoint = "/v1/sports?live=1";
        makeRequest({url: endpoint, method: "get", data: null})
            .then(([c_status, c_result]) => {
                if (c_status === 200) {
                    setLiveSports(c_result?.data)
                }
            });
    }, []);

    useEffect(() => {
        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);
    let {betslip} = props;
    // console.log("Props bs", betslip)
    return (
        <div>
            {/*{console.log("betslip-values",betslip.length)}*/}
            <nav className="mobile-menu">
                <a href="/" className="bloc-icon">
                    <img src={HomeSvg} alt=""></img>
                    <p>Home</p>
                </a>
                <a href="/virtuals" className="bloc-icon">
                    <img src={VirtualSvg} alt=""></img>
                    <p>Virtuals</p>
                </a>
                <a href="/betslip" className="bloc-icon scaling">
                    <img src={BetslipSvg} alt=""></img>
                    <span className={'badge rounded-pill bg-dark'} style={{
                        float: "right",
                        color: "#fff",
                        position: "absolute",
                        marginRight: "1.5rem",
                        top: "1px"
                    }}>
                          {betslipValidationData?.length || 0}

                    </span>
                    <p>Slip </p>
                </a>
                {liveSports==null?   <a href="/live" className="bloc-icon">
                    <img src={LiveSvg} alt="">
                    </img>

                    <p>Live</p>

                </a>:""}
                {liveSports && Object.entries(liveSports).map(([index, livesport]) => (
                    <a href="/live" className="bloc-icon">
                        <img src={LiveSvg} alt="">
                        </img>
                        <span className={'badge rounded-pill bg-dark'} style={{
                            float: "right",
                            color: "#fff",
                            position: "absolute",
                            marginRight: "1.5rem",
                            top: "1px"
                        }}>
                                                                        {livesport.count}
                        </span>
                        <p>Live</p>

                    </a>))}
                <a href="/" className="bloc-icon">
                    <img src={ProfileSvg} alt=""></img>
                    <p>Me</p>
                </a>


            </nav>
        </div>
    )
}
export default MobileMenu;