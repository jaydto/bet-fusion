import React, {useState} from 'react';
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
import {formatNumber} from "../../utils/betslip";
import DepositProfile from "./component/DepositProfile";
import WithdrawProfile from "./component/WithdrawProfile";
import {getFromLocalStorage} from "../../utils/local-storage";
import useWindowDimensions from "../../header/Dimensions";
import useAnalyticsEventTracker from "../../analytics/useAnalyticsEventTracker";
import SidebarMobile from "../../sidebar/awesome/SidebarMobile";
import SidebarProfile from "../../sidebar/sidebarProfile";
import authImg from "../../../assets/img/Logo.webp";
import betNiMoto from "../../../assets/img/BetniMoto.webp";
import Row from "react-bootstrap/Row";

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
        <div className={'flex-item py-0'}>
            <div className="item4 profile-img-banner">
                <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav profile-top-nav" fixed="top" variant="dark" style={{background:'transparent'}}>
                <Container fluid className={'d-flex justify-content-between mobile-change mobile-profile'}>
                    <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare" style={{paddingLeft:'0px',paddingBottom:'0px'}}>
                        <Link to={{pathname: "/"}} className="col-4 resize-mobile d-flex align-items-center">
                            <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"
                                           className={"image-size "}/>
                        </Link>
                        <div
                            className="col-md-6  d-flex  right justify-content-end align-items-center w-change2 gap-2 "
                            style={{marginLeft: 'auto'}}>
                            <div>
                                <Link
                                    to={{pathname: "/"}}
                                    className={"deposit-button size-font-user-action"} title={'HOME'} style={{fontSize:'18px'}}>
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
                                    style={{marginRight: "12px", fontSize: '18px'}} title={'LOGOUT'}>
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
                        style={{width: "21%", height: "100%",zIndex: "9999", marginTop: "8rem"}}
                        className='off-canvas background-primary p-0 user-profile'
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start">
                        <Offcanvas.Header closeButton className='text-white' closeVariant={"white"}>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                <div className="col-3">
                                    <div>
                                        <h2>
                                            Profile
                                        </h2>
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
                <div className={'banner-profile'}>
                    <Row className="banner-info">
                        <div >
                            <h1 className="text-white d-flex justify-content-center align-items-end profile-title" >PROFILE PAGE</h1>
                            <p className="text-white px-3 d-flex align-items-center justify-content-center mt-3" style={{fontSize:"16px", opacity:'0.5px'}}><img src={betNiMoto}  className={'remove-mobile-profile'} style={{width:"205px"}} alt={'betnare'}/></p>
                        </div>
                    </Row>
                </div>

            </div>

                <div className={"card-body d-flex flex-column  gap-2 icon-style-profile"}>
                    <div className={"bg-warning user-profile-style"} id={'cash'}>
                        <FontAwesomeIcon icon={faUser} className={"text-light icon-size-profile-user"}
                        />
                    </div>
                    <span className=" text-warning text-center text-profile-number"> {user?.msisdn}</span>
                </div>


            <div className="flex-container profile-style" style={{padding:'0px 2px '}}>
                <div className="item1 profile-sidebar">
                    <SidebarProfile profile_side={true}/>
                </div>
                <div className="item2">
                    <div className="row d-flex flex-column gap-3 px-4 py-sm-4 py-lg-0 justify-content-center align-items-center profile-top " style={{ margin: "auto"}}>
                        <div style={userIn}>


                        </div>

                        <div className=" w-100 " id={'gift'}>

                            <div className="card-radius profile-bg text-light">
                                <div className="card-body d-flex justify-content-between gap-2 ">
                                    <div className={" profile-bg"} >
                                        <div className="card-body ">
                                    <span
                                        className="font-btn py-2 d-flex flex-column">
                                        <span className={"d-flex align-items-center gap-2"}><FontAwesomeIcon
                                            icon={faDollarSign}   /> Cash</span>
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

                        <div className=" w-100 " id={'mybets'}>

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

                        <div className=" w-100" >
                            <div className="card card-radius profile-bg text-light">
                                <div className="card-body">
                                    <div>
                                        <Link to={{pathname: "/my-bets"}} className={"btn text-white w-100 d-content"}>
                                    <span className="font-btn pad-2  justify-content-between">
                                    <span className="d-flex align-items-center gap-3 ">
                                        <FontAwesomeIcon icon={faCoins} style={{height:"2.5rem", width:"2.5rem"}} className={"text-warning"}/>
                                        <div  className={"card-title text-warning"} > <h4>My Bets</h4></div>
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

export default React.memo(NewProfile);
