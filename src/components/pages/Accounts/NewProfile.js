import React, {useState} from 'react';
import MobileNav2 from "../../mobile-navigation/MobileNav2";
import Testimonials from "../../carousel/Testimonials";
import TestSkeleton from "../Test/Skeleton/TestSkeleton";
import Countries from "../../countries/Countries";
import './test.css'
import './card.css'
import {Navbar, Offcanvas} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link, useNavigate} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
    faCoins,
    faDollarSign,
    faGifts,
    faHome,
    faListOl,
    faPowerOff, faQuestionCircle,
    faSmile,
    faUser
} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import SideNav from "./SideNav";
import {formatNumber} from "../../utils/betslip";
import DepositProfile from "./component/DepositProfile";
import WithdrawProfile from "./component/WithdrawProfile";
import {getFromLocalStorage} from "../../utils/local-storage";
import useWindowDimensions from "../../header/Dimensions";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";

const NewProfile = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(getFromLocalStorage("user"));
    const {height, width} = useWindowDimensions();
    const expand = "md"



    const gaEventTracker = useAnalyticsEventTracker('Navigation');

    const  userIn={
        marginTop: width<=991?"4rem":'0rem'
        // marginTop:'4rem'
    }
    return (
        <div className={'flex-item'}>
            <div className="item4">
                <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav" fixed="top" variant="dark" >
                <Container fluid className={'d-flex justify-content-between mobile-change'}>
                    <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                        <Link to={{pathname: "/"}} className="col-4 resize-mobile">
                            <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
                                           className={"image-size "}/>
                        </Link>
                        <div
                            className="col-md-6  d-flex  right justify-content-end align-items-center w-change2 gap-2 "
                            style={{marginLeft: 'auto'}}>
                            <div>
                                <Link
                                    to={{pathname: "/"}}
                                    className={"deposit-button size-font-user-action"} title={'HOME'} style={{fontSize:'14px'}}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faHome}/></span>&nbsp;
                                          HOME
                                      </span>
                                </Link>
                            </div>
                            {user&&<div>
                                <Link
                                    to={{pathname: "/logout"}}
                                    className={"deposit-button size-font-user-action"}
                                    style={{marginRight: "12px", fontSize: '14px'}} title={'LOGOUT'}>
                                      <span className="text-warning">
                                       <span className=" "><FontAwesomeIcon icon={faPowerOff}
                                                                            className={"text-warning"}/>
                                           </span>&nbsp;
                                          LOGOUT
                                      </span>
                                </Link>
                            </div>}
                            <div className="col-1 button-toggle mx-2" style={{width: "3.1rem"}}>
                                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} className="px-3 py-3 user-profile" />
                            </div>
                        </div>

                    </Navbar.Brand>

                    <Navbar.Offcanvas
                        style={{width: "80%", height: "100%",zIndex: "9999", marginTop: "0px"}}
                        className='off-canvas background-primary p-0 user-profile'
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
            </div>
            <div className="flex-container">
                <div className="item1"> <SideNav/></div>
                <div className="item2">
                    <div className="row d-flex flex-column gap-3 px-4 py-sm-4 py-lg-0 justify-content-center align-items-center profile-top" style={{ margin: "auto", maxWidth:'991px'}}>
                        <div style={userIn}>
                            <div className={"card-body d-flex flex-column align-items-center gap-2"}>
                                <div className={"bg-warning user-style"}>
                                    <FontAwesomeIcon icon={faUser} className={"text-light"}
                                                     style={{height: "3rem", width: "3rem"}}/>
                                </div>
                                <span className=" text-warning"> {user?.msisdn}</span>
                            </div>

                        </div>

                        <div className=" w-100 " id={'cash'}>

                            <div className="card-radius profile-bg text-light">
                                <div className="card-body d-flex justify-content-between gap-2 ">
                                    <div className={" profile-bg"} >
                                        <div className="card-body ">
                                    <span
                                        className="font-btn py-2 d-flex flex-column">
                                        <span className={"d-flex align-items-center gap-2"}><FontAwesomeIcon
                                            icon={faDollarSign}/> Cash</span>
                                <strong style={{color: "#FFB200"}}> KSH {formatNumber(user.balance) || 0}</strong> </span>
                                        </div>
                                    </div>
                                    <div className={"d-flex align-items-center"}>
                                        <div className={"line-between"}></div>
                                    </div>

                                    <div className={"profile-bg"}>
                                        <div className="card-body ">
                                    <span className="font-btn py-2 px-2 d-flex flex-column">
                                        <span className={"d-flex align-items-center gap-2"}>
                                            <FontAwesomeIcon
                                                icon={faSmile}/> Bonus
                                        </span>
                                <strong>KSH {formatNumber(user.bonus) || 0}</strong> </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" w-100 " id={'gift'}>

                            <div className="card-radius profile-bg text-light">

                                <div className="card-body d-flex justify-content-between gap-2 ">

                                    <div className={"profile-bg"}>
                                        <div className="card-body "><span className="font-btn py-2 px-2 d-flex flex-column">
                                        <span className={"d-flex align-items-center gap-2"}>
                                    <FontAwesomeIcon
                                        icon={faGifts}/> Gift </span>
                                    <span>
                                        <strong>
                                    KSH {formatNumber(user.bonus) || 0}</strong>
                                    </span>
                                </span>
                                        </div>
                                    </div>
                                    <div className={"d-flex align-items-center"}>
                                        <div className={"line-between"}></div>
                                    </div>
                                    <div className={" profile-bg"}>
                                        <div className="card-body ">
                                            <Link to={{pathname: "/redeem-points"}}
                                                  className={'link-info text-info font-btn py-2 px-2 d-flex flex-column'} title={'Click to Redeem'}>
                                        <span className={"d-flex align-items-center gap-2"}>
                                           <FontAwesomeIcon
                                               icon={faListOl}/> Points
                                        </span>
                                                <span>
                                            <strong> {formatNumber(user.points_balance) || 0}</strong>
                                        </span>

                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className=" w-100" id={'mybets'}>
                            <div className="card card-radius profile-bg text-light">
                                <div className="card-body">
                                    <div>
                                        <Link to={{pathname: "/my-bets"}} className={"btn text-white w-100 d-content"}>
                                    <span className="font-btn pad-2  justify-content-between">
                                    <span className="d-flex align-items-center gap-3 ">
                                        <FontAwesomeIcon icon={faCoins} style={{height:"2.5rem", width:"2.5rem"}} className={"text-warning"}/>
                                        <div className={"card-title text-warning"}><h4>My Bets</h4></div>
                                    </span>

                                        <FontAwesomeIcon icon={faChevronRight} className={"text-warning"} />

                                     </span>
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div id={'deposit'}>
                            <DepositProfile/>
                        </div>

                        <div id={'withdraw'}>
                            <WithdrawProfile/>
                        </div>


                        <div className=" w-100" id={'support'}>
                            <div className="card card-radius profile-bg text-light">
                                <div className="card-body d-flex flex-column align-items-start">
                                    <div className={"card-title"}><h4>Support</h4></div>

                                    <Link to={"/how-to-play"} className={"d-flex gap-3 align-items-center text-light justify-content-between w-100"}>
                                <span className={"d-flex gap-3 align-items-center"}>
                                    <FontAwesomeIcon icon={faQuestionCircle}/>
                                Help and support
                                </span>

                                        <FontAwesomeIcon icon={faChevronRight}/>
                                    </Link>
                                    <hr className={"w-100 my-2"}/>
                                    <span className={"text-warning d-flex justify-content-center w-100"}>
                                <Link to={"/logout"}>Sign out</Link>
                            </span>


                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>

    );
};

export default NewProfile;
