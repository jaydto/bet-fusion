import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import useWindowDimensions from "../../header/Dimensions";
import { StoreContext } from "../../../context/store";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import SelfExclusion from "../Accounts/component/SelfExclusion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFromLocalStorage } from "../../utils/local-storage";
import { setState } from "../../../redux/dataSlice";

const Footer = React.lazy(() => import("../../footer/footer"));

const ResponsibleGambling = React.memo(() => {
  const { width } = useWindowDimensions();
  const { state } = useContext(StoreContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("responsible_gambling");
  const handleTabSelect = (eventKey) => {
    setActiveTab(eventKey);
  };
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
  const show = useSelector((state) => state.data.show_menu);
  const dispatchRedux = useDispatch();

  const handleClose = () => {
    dispatchRedux(setState("show_menu", false));
  };

  useEffect(() => {
    if (show == true) handleClose();
  }, []);
  const userData = useSelector((state) => state.auth.user);
  const [user, setUser] = useState(getFromLocalStorage("user"));
  useEffect(() => {
    if (userData) {
      setUser(userData || getFromLocalStorage("user"));
    }
  }, [userData]);

  const preExpandedItems = [1,2,3,4,5,6,7]; // Add all the keys here
//   const generateUuid = () => uuidv4();

//   const preExpandedItems = items.map(() => generateUuid()); // Generate UUIDs for preExpanded

  return (
    <>
      <div
        className={
          width <= 575
            ? user
              ? "user_logged responsible-gambling"
              : "amt"
            : "amt"
        }
      >
        <div className="d-flex flex-row justify-content-between mt-5">
          <div className="home" style={{margin:"auto", maxWidth:"991px"}}>
            <div className="homepage" >
              <div className="col-md-12 primary-bg p-4 text-center">
                <div className={"d-flex align-items-center"}>
                  <span
                    className={
                      "spacing-backbutton remove-backbutton-on-desktop"
                    }
                    onClick={() => navigate("/")}
                  >
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      style={{
                        fontSize: "24px",
                        color: "var(--light)",
                        fontWeight: "700",
                        opacity: "0.7",
                      }}
                    />
                  </span>
                  <h4 className="inline-block">RESPONSIBLE GAMBLING POLICY</h4>
                </div>
              </div>
              <div className="col-md-12 mt-2 text-white p-2 line-mobile-spacing">
                Responsible Gambling is a key corporate strategy endorsed by
                CrashKali and championed by all staff. CrashKali recognizes the
                importance of putting in place practices and processes to
                achieve a high standard of gaming. We design proprietary
                communications and related collaterals to promote the importance
                of playing responsibly with the "PLAY RESPONSIBLY" message
                featured in all communications materials and incorporated into
                betting merchandise, marketing materials etc. Our information on
                games are factual and transparent and the betting gaming rules
                on products are always made available for our customers to
                assist them in making informed decisions. Other means are as
                follows
              </div>
              <div className="col-md-12 mt-2 text-white p-2 line-mobile-spacing">
                <p style={{}} className="mt-1 ">
                  This is a real-money gambling app. Please gamble responsibly
                  and only bet what you can afford. For gambling addiction help
                  and support, please contact CustomerCare at (+254701087777),
                  or visit (
                  <a
                    href="https://responsiblegambling.or.ke/"
                    target="_blank"
                    style={{ color: "var(--aqua-text)" }}
                  >
                    {" "}
                    Responsible Gambling Website
                  </a>{" "}
                  ).
                </p>
              </div>
              <Tabs
                variant={"tabs"}
                defaultActiveKey={activeTab}
                id=""
                className="background-primary mb-3 px-3"
                justify
                onSelect={handleTabSelect}
              >
                <Tab
                  eventKey="responsible_gambling"
                  title="Responsible Gambling"
                  className={"background-primary"}
                >
                  <div className="col-md-12 mt-2 text-white accordion-container">
                    <Accordion
                      allowMultipleExpanded={true}
                      allowZeroExpanded={true}
                      preExpanded={preExpandedItems}
                      //   defaultActiveKey={['1', '2', '3', '4', '5', '6', '7']} // Use the array of all keys
                    >
                      <AccordionItem uuid={preExpandedItems[0]}>
                        <AccordionItemHeading>
                          <AccordionItemButton className="accordion-button">
                            Protection of vulnerable gamblers
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="accordion-item-panel">
                          <p>
                            One of the most important areas of Responsible
                            Gambling is concerned with the protection of
                            vulnerable players. Some players may become addicted
                            to sports betting activities and by spending too
                            much money their normal lives are soon affected.
                            Among the main measures that we impose in the
                            industry, we can mention self-exclusion programs,
                            limits on the amount of money and time players can
                            spend on our gaming website. All the same, we
                            implement many other tools to assist players enjoy
                            responsible gaming sessions, such as the possibility
                            to set financial limits to their accounts. For
                            instance, to avoid potential hasten decisions, an
                            increase in their deposit limit will not take effect
                            until a period of 24 hours.
                          </p>
                        </AccordionItemPanel>
                      </AccordionItem>
                      <AccordionItem uuid={preExpandedItems[1]}>
                        <AccordionItemHeading>
                          <AccordionItemButton className="accordion-button">
                            Prevention of underage gambling
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="accordion-item-panel">
                          <p>
                            The prevention of underage gaming is one of the most
                            important aspects of responsible gambling and it
                            needs to be emphasized that individuals that have
                            not reached the legal age (18) must not be allowed
                            to gamble for real-money. CrashKali takes all the
                            necessary steps to make sure that underage gambling
                            activities do not take place on our website and that
                            the laws protecting minors in their targeted
                            jurisdictions are respected. As operators we present
                            a clear registration processes for all players and
                            mandatory verification steps to be followed to
                            ensure the age of gamblers.
                          </p>
                        </AccordionItemPanel>
                      </AccordionItem>
                      <AccordionItem uuid={preExpandedItems[3]}>
                        <AccordionItemHeading>
                          <AccordionItemButton className="accordion-button">
                            Safety measures against criminal activities
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="accordion-item-panel">
                          <p>
                            Gambling websites can be affected by online
                            criminals’ activities just like any other sites
                            dealing with e-commerce or financial transactions.
                            To accomplish their goals and obtain private and
                            financial data, online criminals deploy malicious
                            software that targets websites’ vulnerabilities. To
                            stop this growing tendency, we have inserted
                            procedures and software programs that detect and
                            block money laundering activities and hacking
                            devices.
                          </p>
                        </AccordionItemPanel>
                      </AccordionItem>
                      <AccordionItem uuid={preExpandedItems[4]}>
                        <AccordionItemHeading>
                          <AccordionItemButton className="accordion-button">
                            Information privacy
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="accordion-item-panel">
                          <p>
                            We protect our customers’ private details from
                            prying eyes. This is connected to the need of
                            keeping safe players’ private details from
                            unauthorized access that may occur due to illegal
                            online criminal attacks. By introducing several
                            strong policies to control access to important
                            private data, starting with gamblers’ names, their
                            addresses and phone numbers, CrashKali ensures
                            information privacy is respected and that we are in
                            line with regulators’ requirements.
                          </p>
                        </AccordionItemPanel>
                      </AccordionItem>
                      <AccordionItem uuid={preExpandedItems[5]}>
                        <AccordionItemHeading>
                          <AccordionItemButton className="accordion-button">
                            Online payment protection
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="accordion-item-panel">
                          <p>
                            We ensure that players access a reliable software
                            platform that protects our customers personal data
                            and financial details. This is an important reason
                            why we must give a major attention to choosing the
                            most appropriate gaming solution for the purposes of
                            our players to safely deposit, transfer and withdraw
                            money on our gambling website or mobile wallets.
                          </p>
                        </AccordionItemPanel>
                      </AccordionItem>
                      <AccordionItem uuid={preExpandedItems[6]}>
                        <AccordionItemHeading>
                          <AccordionItemButton className="accordion-button">
                            Ethical and responsible marketing
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="accordion-item-panel">
                          <p>
                            We comply with the relevant regulatory advertising
                            codes of practice which typically ensure that
                            advertisements are factually correct and do not
                            target underage or vulnerable gamblers, such as
                            players who have self-excluded themselves from
                            gambling. CrashKali seek permission from the customer
                            prior to engaging in direct marketing through use of
                            the customer’s personal details.
                          </p>
                        </AccordionItemPanel>
                      </AccordionItem>
                      <AccordionItem uuid={preExpandedItems[7]}>
                        <AccordionItemHeading>
                          <AccordionItemButton className="accordion-button">
                            Support
                          </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel className="accordion-item-panel">
                          <p>
                            If you need to talk to someone about a gambling
                            problem, contact our CustomerCare helpline at
                            +254701087777.
                          </p>
                        </AccordionItemPanel>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </Tab>
                <Tab
                  eventKey="self_exclusinon"
                  title="Self Exclusion"
                  className={"background-primary"}
                >
                  <SelfExclusion />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <div className={"footer-mobile-none"}>
        <Footer />
      </div>
    </>
  );
});

export default React.memo(ResponsibleGambling);