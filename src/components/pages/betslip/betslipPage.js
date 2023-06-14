import React, { useRef,useContext, useEffect, useState } from "react";

import Betslip from "../../right/betslip";
import Right from "../../right";

import { getFromLocalStorage } from "../../utils/local-storage";

import logo from "../../../assets/img/Logo.webp";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Navbar, Offcanvas } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import useWindowDimensions from "../../header/Dimensions";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import SlipTabs from "./tabs/slip-tabs";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCloudDownloadAlt} from "@fortawesome/free-solid-svg-icons/faCloudDownloadAlt";
import {faCoins} from "@fortawesome/free-solid-svg-icons/faCoins";
import KironSlip from "../../right/kironslip";
import {formatNumber} from "../../utils/betslip";

const BetslipPage = () => {
  const { height, width } = useWindowDimensions();
  const gaEventTracker = useAnalyticsEventTracker('Navigation');
  const [tab, setTab] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, ] = useState(getFromLocalStorage("user"));
  let url = new URL(window.location);
  const jp = url.searchParams.get("jackpot");
  const nL=url.searchParams.get("nare-league")
  const nare_league=nL=='true'?true:false
  const jackpot = jp == "true" ? true : false;
  const slipParam = url.searchParams.get("betslipValidationData");
  const jackpotParam = url.searchParams.get("jackpotData");
  const nareParams=url.searchParams.get('nare-league')
  const pathname = window.location.pathname;


  const betslipValidationData =
      slipParam && JSON.parse(decodeURIComponent(slipParam));
  const nareData=
      nareParams&&JSON.parse(decodeURIComponent(slipParam))

  const jackpotData =
      jackpotParam && JSON.parse(decodeURIComponent(jackpotParam));


  const [isOpen, setIsOpen] = useState(false);
  const expand = "lg";


  const toggle = () => {
    setIsOpen(!isOpen);
  };
  // console.log("slip-jackpot_slip", getJackpotBetslip())
  // console.log("slip-betslip_slip", getBetslip())

  useEffect(() => {
    let new_tab = "";

    if (window.location.href.includes("betslip-slip")) {
      new_tab = "betslip-slip";
    }

    if (window.location.href.includes("betslip-jackpot")) {
      new_tab = "betslip-jackpot";
    }

    if (window.location.href.includes("betslip-nare")) {
      new_tab = "betslip-nare";
    }

    // console.log("tabs", new_tab)
    if (new_tab !== tab) {
      setTab(new_tab);
      setLoading(true);
    }
  });
  console.log("tab_slip", tab);

  return (
      <>

        <Navbar expand="lg" className="mb-0 ck pc os app-navbar top-nav header-mobile-kiron" fixed="top" variant="dark">
          <Container fluid className={'d-flex justify-content-between mobile-change'}>
            <Navbar.Brand className={`e logo align-self-start menu-control d-flex justify-content-between w-100`} title="Betnare">
              <Link to={{pathname: "/"}} className="col-4 mt-3 resize-mobile" style={{ marginLeft:"-5px"}}>
                <img src={logo} alt="Betnare" title="Betnare" effects="blur"
                     className={"image-size "} style={user?{marginBottom:"0px" }:{marginBottom:"11px", width:'auto'}}/>
              </Link>

              {user &&
                  <div
                      className="col-md-6  d-flex  right justify-content-end align-items-center w-change2 gap-2 ipad-show"
                      style={{marginLeft: 'auto'}}>
                    <div>
                      <Link
                          to={{pathname: "/deposit"}}
                          className={"deposit-button size-font-user-action remove-from-small-screen"}>
                                          <span className="">
                                           <span className=" "> <FontAwesomeIcon
                                               icon={faCloudDownloadAlt}/></span>&nbsp;
                                            DEPOSIT
                                          </span>
                      </Link>
                    </div>
                    <div>

                      <div
                          className={"deposit-button size-font-user-action d-flex align-items-center"}
                          style={{marginRight: "12px"}}>
                                          <span className="text-warning">
                                           <span className=" "><FontAwesomeIcon icon={faCoins} className={"text-warning"}/>
                                               </span>&nbsp;
                                            KSH {formatNumber(user.balance) || 0}
                                          </span>
                      </div>
                    </div>

                    <div className="col-1 button-toggle space-button"
                         style={{width: "4.1rem", overflowY: "auto", marginLeft: '0px'}}>
                      <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`}
                                     className="px-3 py-3" onClick={toggle}/>
                    </div>
                  </div>}
              <>
                {!user&&<div className="col-sm-2 mobile-profile1 align-items-center gap-3 ipad-show" style={{marginLeft:'auto'}}>
                  <div className="remove-verify remove-verify-on-small">
                    <Link className="cg  login-color login-size btn bg-success text-light"
                          to={"/verify"} title="Verify Account"
                          onClick={() => gaEventTracker('Verify')}>
                      <span className="register-label text-light">Verify</span>
                    </Link>
                  </div>
                  <div className="">
                    <Link className="cg  login-color login-size btn bg-warning text-light"
                          to={"/signup"} title="Join now"
                          onClick={() => gaEventTracker('Register')}>
                      <span className="text-light ">Register</span>
                    </Link>
                  </div>

                  <Link to={"/login"} className="cg  login-color login-size btn" type="submit">
                    <span>Login</span>
                  </Link>

                  <div className="col-1 button-toggle space-button" style={{width: "4.1rem", overflowY:"auto",marginLeft:'0px'}}>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"lg"}`} className="px-3 py-3" onClick={toggle} />
                  </div>

                </div>}
              </>


            </Navbar.Brand>


            <Navbar.Offcanvas
                style={{width: "80%", height: "100%",zIndex: "9999", marginTop: "0px",overflowY:"auto"}}
                className='off-canvas background-primary p-0'
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start">
              <Offcanvas.Header closeButton className='text-white' closeVariant={"white"}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <div className="col-3">
                    <div>
                      <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"/>
                    </div>
                  </div>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className={(width<=575?user?"":"":"")}>
                <SidebarMobile/>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>


        <div
            className=" "
            style={{ overflow:'hidden' }}>
          <div className={"w-100 top-spacing-betslip "}  >
            <div className="bet-option-list w-100" id="" style={{ bottom: "0", height:"100%" }}>
              <div
                  className="bet alu  block-shadow d-flex flex-column"
              >
                <div style={{position:"sticky",top:"7rem", width:"100%"}}>
                  <SlipTabs tab={tab} />
                </div>
                <div
                    id="betslip"
                    className={`betslip  slip-max-height `}
                    style={{ height: "100%" }}
                >
                  <div
                      className={ " d-flex flex-column w-100 justify-content-end"}
                      style={{ height: "100%" }}
                  >

                    {nare_league ? <KironSlip kironValidation={nareData} kiron={nare_league||pathname=='/betslip-nare'}/> : <Betslip
                        jackpot={jackpot ? true : false}
                        betslipValidationData={betslipValidationData}
                        jackpotData={jackpotData}
                    />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<footer>*/}
        <div className={"styling-mobile-size"}>
          <Right betslipValidationData={betslipValidationData} jackpotData={ jackpotData} jackpot={jackpot?true:false}/>
        </div>
        {/*</footer>*/}
      </>
  );
};

export default React.memo(BetslipPage);
