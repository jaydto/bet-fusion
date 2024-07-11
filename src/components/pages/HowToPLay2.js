import React, { useContext, useEffect } from "react";

import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";
import "../test.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../redux/dataSlice";

const Footer = React.lazy(() => import("../footer/footer"));
const SideBar = React.lazy(() => import("../sidebar/awesome/Sidebar"));
const Right = React.lazy(() => import("../right/index"));

const HowToPlay = React.memo((props) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigate = useNavigate();

  const show = useSelector((state) => state.data.show_menu);
  const dispatchRedux = useDispatch();

  const handleClose = () => {
    dispatchRedux(setState("show_menu", false));
  };

  useEffect(() => {
    if (show == true) handleClose();
  }, []);
  return (
    <div className={"flex-item"}>
      <div className="flex-container height-default-body top-diff-pages">
        <div className="item2" style={{ width: "100%" }}>
          <div className=" home" style={{ margin: "auto", width: "991px" }}>
            <div className="homepage">
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
                  <h4 className="inline-block"> HOW TO PLAY </h4>
                  
                </div>
              </div>
              <div
                className="col-md-12 mt-2 card"
                style={{ background: "var(--bet-history)" }}
              ></div>
              <div className="col-md-12 py-2 px-1 w-100 text-white accordion-container">
              <Accordion
                  preExpanded={["1"]}
                  allowMultipleExpanded={true}
                  className="size-accordion"
                >
                  <AccordionItem uuid={"1"}>
                    <AccordionItemHeading>
                      <AccordionItemButton className="accordion-button px-2 pt-1">
                      <h2 className="px-3">Play Games</h2>

                      </AccordionItemButton>
                    </AccordionItemHeading>

                    <AccordionItemPanel className="accordion-item-panel px-1 py-1">
                    <Accordion  allowZeroExpanded>

                        <AccordionItem uuid={"1"}>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion-button">
                              Registration 
                            </AccordionItemButton>
                          </AccordionItemHeading>

                          <AccordionItemPanel className="accordion-item-panel px-1 py-1">
                            <Accordion
                              preExpanded={["13"]}
                              allowZeroExpanded
                              className={"px-1"}
                            >
                              <AccordionItem uuid={"13"}>
                                <AccordionItemHeading>
                                  <AccordionItemButton className="accordion-button">
                                    Why should I register with CrashKali?
                                  </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="accordion-item-panel">
                                  <p>
                                    Registration allows you to open a CrashKali
                                    account free of charge and under no
                                    obligation. Your CrashKali account will help
                                    you manage your bets and other account
                                    details. You need to deposit actual money
                                    into your account before you can place bets.
                                  </p>
                                </AccordionItemPanel>
                              </AccordionItem>
                              <AccordionItem>
                                <AccordionItemHeading>
                                  <AccordionItemButton className="accordion-button">
                                    How do I Register with CrashKali?
                                  </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel className="accordion-item-panel">
                                  <p>
                                    Step 1 Please visit www.CrashKali.com and
                                    click on the Register Now link on the top
                                    RIGHT corner of the website. Please read the
                                    Terms and Conditions and fill in all the
                                    fields and click the Get verification code
                                    button or alternatively you can skip this
                                    step if you have a code already.
                                  </p>
                                  <p>
                                    Fill in your phone number and the
                                    registration code SENT TO YOUR MOBILE NO.
                                  </p>
                                  <p>
                                    A confirmation message appears to confirm
                                    that your registration was successful.
                                    CrashKali!
                                  </p>
                                </AccordionItemPanel>
                              </AccordionItem>
                            </Accordion>
                          </AccordionItemPanel>
                        </AccordionItem>
                       
        
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion-button">
                              How do I withdraw cash from my CrashKali account?
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="accordion-item-panel">
                            Getting your money out is as simple as putting your
                            money in. Hopefully you will have made some
                            successful wagers and you want to transfer money to
                            your mobile money. Click on the withdrawal link on
                            the top right panel of the web site.
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion-button">
                              How do I check My Balance?
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="accordion-item-panel">
                            This is display on the top right pane of the
                            website. The top right pane displays the Cash
                            Balance and Bonus Wallet balances.
                          </AccordionItemPanel>
                        </AccordionItem>

                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion-button">
                              How do I log into my CrashKali account?
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="accordion-item-panel">
                            Once you have registered you can access your CrashKali
                            account by entering your phone number as USERNAME
                            and  PASSWORD as PASSWORD
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion-button">
                              How do I check my transaction from my CrashKali
                              account?
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="accordion-item-panel">
                            When you log in with your account username and
                            password, and click on "Transactions" you will see
                            all your transactions. You can choose filter from
                            date to date.{" "}
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion-button">
                              How do I check my bets from my CrashKali account?
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="accordion-item-panel">
                            When you log in with your account username and
                            password, and click on "Transactions" you will see
                            all your transactions. You can choose filter from
                            date to date.{" "}
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion-button">
                              Virtual League.
                            </AccordionItemButton>
                          </AccordionItemHeading>

                          <AccordionItemPanel className="accordion-item-panel">
                            <p>
                              Why wait 90 Minutes when you can play Virtuals and
                              WIN Big in Minutes? CrashKali offers a variety of
                              Virtual games ranging from; Fantastic football
                              league, Horse racing , Force 1 racing , Greyhound
                              racing and Penalty shootout. Log into
                              https://CrashKali.com/ to get the Virtual
                              experience. Stake low, Win High & Fast with
                              CrashKali Virtuals.
                            </p>
                          </AccordionItemPanel>
                        </AccordionItem>

                       
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton className="accordion-button">
                              What is the CrashKali Customer care number?
                            </AccordionItemButton>
                          </AccordionItemHeading>

                          <AccordionItemPanel className="accordion-item-panel">
                            <p>
                              CrashKali offers Customer Care support round the
                              clock. We are reachable via 0701087777 on Mobile,
                              WhatsApp Number – 0701087777. You can also reach
                              us through E-Mail onsupport@CrashKali.com
                            </p>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                    </AccordionItemPanel>
                  </AccordionItem>
                </Accordion>
                <Accordion
                  preExpanded={["1"]}
                  allowMultipleExpanded={true}
                  className="size-accordion"
                >
                  
                 
                </Accordion>

              
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="item6">
        <div className={"footer-mobile-none"}>
          <Footer />
        </div>
      </div>
    </div>
  );
});

export default React.memo(HowToPlay);
