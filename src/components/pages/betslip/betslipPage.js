import React, { useContext, useEffect, useState } from "react";

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
import { Context } from "../../../context/store";

const BetslipPage = () => {
  const { height, width } = useWindowDimensions();
  const [tab, setTab] = useState("betslip-slip");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  let url = new URL(window.location);
  const [state, dispatch] = useContext(Context);
  const jp = url.searchParams.get("jackpot");
  const jackpot = jp == "true" ? true : false;
  const slipParam = url.searchParams.get("betslipValidationData");
  const jackpotParam = url.searchParams.get("jackpotData");
  console.log("slipParam", slipParam);
  console.log("jackpotParam", jackpotParam);
  const betslipValidationData =
    slipParam && JSON.parse(decodeURIComponent(slipParam));
  const jackpotData =
    jackpotParam && JSON.parse(decodeURIComponent(jackpotParam));

  console.log(
    "jackpot_param",
    jackpotData + "slipParam: " + betslipValidationData + "jackpot: " + jackpot
  );

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

    // console.log("tabs", new_tab)
    if (new_tab !== tab) {
      setTab(new_tab);
      setLoading(true);
    }
  });
  console.log("slip_check", jackpot);

  return (
    <>
      <Navbar
        expand="lg"
        className="my-0 ck pt-sm-0  pc  app-navbar top-nav "
        fixed="top"
        variant="dark"
        style={{position:"sticky", top:"0px"}} 
      >
        <Container
          fluid
          className={"d-flex justify-content-between mobile-change"}
        >
          <Navbar.Brand
            className="e logo align-self-start menu-control"
            title="Betnare"
          >
            <Link
              to={{ pathname: "/" }}
              className="col-4 resize-mobile"
              style={{ paddingTop: "5px" }}
            >
              <LazyLoadImage
                src={logo}
                alt="Betnare"
                title="Betnare"
                effects="blur"
                className={"image-size "}
              />
            </Link>

            {width <= 514 ? (
              <div
                className="col-1 button-toggle mx-2"
                style={{ width: "3.1rem" }}
              >
                <Navbar.Toggle
                  aria-controls={`offcanvasNavbar-expand-${"lg"}`}
                  className="px-3 py-3"
                  onClick={toggle}
                />
              </div>
            ) : (
              ""
            )}
          </Navbar.Brand>

          <Navbar.Offcanvas
            style={{
              width: "80%",
              height: "100%",
              zIndex: "9999",
              marginTop: "0px",
              overflowY: "auto",
            }}
            className="off-canvas background-primary p-0"
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="start"
          >
            <Offcanvas.Header
              closeButton
              className="text-white"
              closeVariant={"white"}
            >
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                <div className="col-3">
                  <div>
                    <LazyLoadImage
                      src={logo}
                      alt="Betnare"
                      title="Betnare"
                      effects="blur"
                    />
                  </div>
                </div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className={width <= 514 ? (user ? "" : "") : ""}>
              <SidebarMobile />
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
      
      <div
        className=" "
        style={{ height:"100%" }}
      >

        <div style={{position:"sticky",top:"45px",zIndex:"2000", width:"100%"}}>
        <SlipTabs tab={tab} />
      </div>
        <div className={"w-100 "}  style={{ height:"88vh" }}>
          <div className="bet-option-list w-100" id="" style={{ bottom: "0", height:"100%" }}>
            <div
              className="bet alu  block-shadow d-flex flex-column"
              style={{ height: "100%" }}
            >
              <div
                id="betslip"
                className={`betslip  slip-max-height `}
                style={{ height: "100%" }}
              >
                <div
                  className={ " d-flex flex-column w-100 justify-content-end"}
                  style={{ height: "100%" }}
                >
                
                  <Betslip
                    jackpot={jackpot ? true : false}
                    betslipValidationData={betslipValidationData}
                    jackpotData={jackpotData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Right betslipValidationData={betslipValidationData} jackpotData={ jackpotData} jackpot={jackpot?true:false}/>   
      </footer>
    </>
  );
};

export default BetslipPage;
