import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import twentyPercentDepositBonus from "../../../assets/img/banner/products/Bet_Nare_gift_Mobile.webp";
import firstDeposit from "../../../assets/img/banner/products/Firstdeposit.jpeg";
import multibetCashback from "../../../assets/img/banner/products/Bet_Nare_100_Cashback_Mobile.webp";
import karibuGiftWallet from "../../../assets/img/banner/products/Bet_Nare_3000_karibu_gift_Mobile.webp";
import DepositBonus from "../../../assets/img/banner/products/365.webp";

import {Table} from "react-bootstrap";
import PromoCards from "./PromoCards";
import {getFromLocalStorage} from "../../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import {ToastContainer} from "react-toastify";

const Header = React.lazy(() => import('../../header/header'));

const Promo = () => {
    const url = new URL(window.location);
    let id = url.searchParams.get("id");
    const navigate = useNavigate()
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [user] = useState(getFromLocalStorage("user"));

    const banners = [
        {src: twentyPercentDepositBonus, id: 4},
        {src: firstDeposit, id: 3},
        {src: multibetCashback, id: 2},
        {src: karibuGiftWallet, id: 1},
        {src: DepositBonus, id: 9},
    ];

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await import("./promo.json");
                const item = response.default.find((item) => item.id === parseInt(id));
                setData(item);
            } catch (error) {
                setError(error);
            }
            setLoading(false);
        };
        fetchData();
    }, [parseInt(id)]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }

    if (!data) {
        return null;
    }

    const item = data;

    return (
        <>
            <Header/>
            <ToastContainer/>
            <div>
                <div className="d-flex flex-row">
                    <div className="gz home promotions-app-top"
                         style={{width: "100%", background: 'var(--betnare-primary)'}}>
                        <div className="homepage desktop-promotions-info">
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col-md-12 d-flex align-items-center my-3">
                                    <span className={'px-3 col-2'} onClick={() => navigate(-1)}>
                                             <FontAwesomeIcon icon={faAngleLeft} style={{
                                                 fontSize: "24px",
                                                 color: 'var(--light)',
                                                 fontWeight: '700',
                                                 opacity: '0.7'
                                             }}/>
                                            </span>
                                    <div
                                        className="shadow-sm d-flex justify-content-center col-10 p-2 shadow-sm promotion-header text-white">
                                        BETNARE PROMOTIONS
                                    </div>
                                </div>
                                <div className="col">
                                    <div
                                        className={
                                            "row text-white p-2 shadow-sm d-flex justify-content-center promo-container flex-column"
                                        }
                                    >
                                        <div className="col-md-12  shadow-lg promotion">
                                            <div className="d-flex flex-column promo-inner-promo-item">
                                                <h5
                                                    className="bold border-bottom d-flex justify-content-center"
                                                    style={{color: "#ea5d0b"}}
                                                >
                                                    {item?.name}
                                                </h5>
                                                {banners.map((banner) =>
                                                    banner.id === parseInt(id) &&
                                                    <img
                                                        src={banner.src}
                                                        className={"rounded  "}
                                                    />
                                                )}
                                                {item?.heading && <span>
                          <u
                              className="bold border-bottom d-flex justify-content-center"
                              style={{color: "#ea5d0b"}}
                          >
                            {item?.heading}
                          </u>
                        </span>}
                                                {item?.intro && <p>
                                                    {item?.intro.split("\n").map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}
                                                            <br/>
                                                        </React.Fragment>
                                                    ))}
                                                </p>}
                                                <ul>
                                                    {item?.instructions &&
                                                        <p
                                                            className="bold border-bottom d-flex justify-content-center"
                                                            style={{color: "#ea5d0b"}}
                                                        >
                                                            {item?.instructions}
                                                        </p>}
                                                    {item?.description && <>{item?.description.split("\n").map((line, index) => (
                                                        <React.Fragment key={index}>
                                                            {line}
                                                            <br/>
                                                        </React.Fragment>
                                                    ))}</>}
                                                </ul>
                                                {item?.headingBooster && <span>
                          <u
                              className="bold border-bottom d-flex justify-content-center"
                              style={{color: "#ea5d0b"}}
                          >
                            {item?.headingBooster}
                          </u>
                        </span>}
                                                <ul>
                                                    {item?.boosterDescription && (
                                                        <>
                                                            {item?.boosterDescription?.split("\n").map((line, index) => (
                                                                <React.Fragment key={index}>
                                                                    {line}
                                                                    <br/>
                                                                </React.Fragment>
                                                            ))}
                                                        </>
                                                    )}

                                                    {item?.nb && (
                                                        <p className={"text-center lead"}>
                              <span>
                                <u
                                    className="bold  "
                                    style={{color: "#ea5d0b"}}
                                >
                                  {" "}
                                    NB:
                                </u>
                              </span>
                                                            {item?.nb}
                                                        </p>
                                                    )}
                                                </ul>
                                                <br/>
                                                {item?.tableData && (
                                                    <Table
                                                        bordered
                                                        responsive
                                                        className={"text-white"}
                                                        style={{backgroundColor: "#1f2f38"}}
                                                    >
                                                        <thead>
                                                        <tr>
                                                            {item.tableData.headings.map((heading) => (
                                                                <th key={heading}>{heading}</th>
                                                            ))}
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {item.tableData.rows.map((row, index) => (
                                                            <tr key={index}>
                                                                {row.map((cell, index) => (
                                                                    <td key={index}>{cell}</td>
                                                                ))}
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                )}
                                                {item?.example && (
                                                    <>
                                                        <h5>
                                                            <u
                                                                className="bold border-bottom d-flex justify-content-center"
                                                                style={{color: "#ea5d0b"}}
                                                            >
                                                                {item.exampleHeading}
                                                            </u>
                                                        </h5>
                                                        <p>{item?.example}</p>
                                                    </>
                                                )}

                                                <div className="col-md-12">
                          <span>
                            <u
                                className="bold border-bottom d-flex justify-content-center"
                                style={{color: "#ea5d0b"}}
                            >
                              {item?.termsHeading}
                            </u>
                          </span>
                                                    <div>
                                                        {item?.termsContent?.split("\n").map((line, index) => (
                                                            <React.Fragment key={index}>
                                                                {line}
                                                                <br/>
                                                            </React.Fragment>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <PromoCards/>

                                        <div className="col-md-2  d-flex flex-row shadow-lg mt-2 promotion d-none">
                                            <div className="col-md-12 promo-inner">
                                                <div className="d-flex flex-column">
                                                    <h5>BETNARE NGWARE</h5>
                                                    {/*<img src={ngware} className={'rounded '}/>*/}
                                                    <span>
                            Monday promotion. BetNare Ngware, anzisha Wiki na
                            Thao.
                          </span>

                                                    <div className="col-md-12">
                            <span>
                              <u>Entry Requirements</u>
                            </span>
                                                        <ol>
                                                            ✅ This promotion will be running every Monday for
                                                            the Month Of October 2022.
                                                            <br/>
                                                            ✅ Place a bet with 50/= or more between 6am and
                                                            12 pm.
                                                            <br/>
                                                            ✅ Like the social media post in any of our
                                                            channels.
                                                            <br/>
                                                            <strong>
                                <span>
                                  <u
                                      className="bold "
                                      style={{color: "#ea5d0b"}}
                                  >
                                    {" "}
                                      NB:
                                  </u>
                                </span>
                                                                Kindly NOTE that the WINS will be credited on
                                                                your BetNare Account. You can Play with or
                                                                Withdraw the Funds.
                                                            </strong>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2  d-flex flex-row shadow-lg mt-2 promotion d-none">
                                            <div className="col-md-12 promo-inner">
                                                <div className="d-flex flex-column">
                                                    <h5>LALA KICHAMPE</h5>
                                                    {/*<img src={lala} className={'rounded '}/>*/}
                                                    <span>
                            This promotion will run on every Wednesday of the
                            Month of October, 8pm to 10pm.
                          </span>

                                                    <div className="col-md-12">
                            <span>
                              <u>Entry Requirements</u>
                            </span>
                                                        <ol>
                                                            ✅ BetNare will Award 4 lucky winners with Ksh.
                                                            2000 each, 2 winners each hour from 8 pm to 10 pm.{" "}
                                                            <br/>
                                                            ✅ Place a bet with 50/= or more between 8pm and
                                                            10 pm
                                                            <br/>✅ Like the social media post in any of our
                                                            channels
                                                            <strong>
                                <span>
                                  <u
                                      className="bold "
                                      style={{color: "#ea5d0b"}}
                                  >
                                    {" "}
                                      NB:
                                  </u>
                                </span>
                                                                Kindly NOTE that the WINS will be credited on
                                                                your BetNare accounts. You can Play with or
                                                                Withdraw the Funds
                                                            </strong>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2  d-flex flex-row shadow-lg mt-2 promotion d-none">
                                            <div className="col-md-12 promo-inner">
                                                <div className="d-flex flex-column">
                                                    <h5>Furahia Rush Hour kiBetNare</h5>
                                                    {/*<img src={rushHour} className={'rounded '}/>*/}
                                                    <div className="col-md-12">
                                                        ✅ This promotion will run every Friday for the
                                                        Month Of October 2022, 3pm to 7pm
                                                        <br/>
                                                        ✅Award 3 Lucky winners with Ksh. 3000 each.
                                                        <br/>
                                                        ✅Award a winner every two hours from 3pm to 7pm.
                                                        <br/>
                                                    </div>

                                                    <div className="col-md-12">
                            <span>
                              <u>Entry Requirements</u>
                            </span>
                                                        <ol>
                                                            ✅Entry requirements:
                                                            <br/>
                                                            ✅ Place a bet with 50/= or more between 3pm and
                                                            7pm
                                                            <br/>
                                                            ✅ Like the social media post in any of our
                                                            channels
                                                            <br/>
                                                            <strong>
                                                                Kindly NOTE that the WINS will be credited on
                                                                your BetNare accounts. You can Play with or
                                                                Withdraw the Funds
                                                            </strong>
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-2  d-flex flex-row shadow-lg mt-2 promotion d-none">
                                            <div className="col-md-12 promo-inner">
                                                <div className="d-flex flex-column">
                                                    <h5 className={"text-uppercase"}>Angukia Rent</h5>
                                                    {/*<img src={rent} className={'rounded '}/>*/}
                                                    <div className="col-md-12">
                                                        ✅ The Angukia rent draw will be conducted on Monday
                                                        31st October.
                                                        <br/>
                                                        ✅BetNare will Award 1 lucky winner with KSh. 30,000
                                                        who’d participated in any of the running October
                                                        Promotions.
                                                        <br/>
                                                        <strong className={"text-uppercase"}>
                                                            Entry requirements:
                                                        </strong>
                                                        <br/>
                                                        ✅ Place a bet with 50/= or more between 3rd October
                                                        and 31st October at 12noon
                                                        <br/>
                                                        ✅ Follow/Like any of our social media channels
                                                        <br/>✅
                                                        <strong>
                                                            Kindly NOTE that the WINS will be credited on your
                                                            BetNare accounts. You can Play with or Withdraw
                                                            the Funds
                                                        </strong>
                                                    </div>
                                                    {/*<div className="col-md-12 d-flex flex-row shadow-lg mt-2 promotion">*/}
                                                    {/*    <div className="col-md-12">*/}
                                                    {/*        <div className="d-flex flex-column">*/}
                                                    {/*            <h5 className={'text-uppercase'}>*/}
                                                    {/*                Open to all NEW and Existing customers.*/}
                                                    {/*                It is Christmas come early in BetNare, 5 JOGOOS & 2 MBUZI’s UP*/}
                                                    {/*                FOR GRABS DAILY*/}
                                                    {/*            </h5>*/}
                                                    {/*            /!*<img src={krisi} className={' promo-inner '}/>*!/*/}
                                                    {/*            <div className="col-md-12">*/}
                                                    {/*                ✅*/}
                                                    {/*                This applies to both Multibets and Single bets.*/}
                                                    {/*                <br/>*/}
                                                    {/*                ✅*/}
                                                    {/*                The promotion is Open for a customer once you place a bet*/}
                                                    {/*                (Any type of bet).*/}
                                                    {/*                <br/>*/}

                                                    {/*                ✅*/}
                                                    {/*                No Minimum odds or Number of legs are required for One to*/}
                                                    {/*                qualify for the award*/}
                                                    {/*                <br/>*/}

                                                    {/*                ✅*/}
                                                    {/*                Daily winners will receive different prizes credited into*/}
                                                    {/*                their BetNare account. This can be WITHDRAWN directly via Mpesa*/}
                                                    {/*                <br/>*/}
                                                    {/*                ✅Winners are chosen randomly by the BetNare promotion systems*/}
                                                    {/*                <br/>*/}
                                                    {/*                ✅JOGOOS up for grabs daily when you stake using KES29/= or*/}
                                                    {/*                MORE*/}
                                                    {/*                <br/>*/}
                                                    {/*                ✅*/}
                                                    {/*                MBUZIS up for grabs daily when you stake using KES49/= or MORE*/}
                                                    {/*                <br/>*/}
                                                    {/*                ✅*/}
                                                    {/*                Promo runs from the 10th December 2022 to 25th December 2022.*/}
                                                    {/*                <br/>*/}
                                                    {/*                ✅*/}
                                                    {/*                General BetNare terms and conditions apply.*/}
                                                    {/*            </div>*/}
                                                    {/*        </div>*/}
                                                    {/*    </div>*/}
                                                    {/*</div>*/}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Promo;
