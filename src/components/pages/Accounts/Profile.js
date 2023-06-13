import React, {useContext, useRef, useState} from 'react';
import './test.css'
import {Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";
import logo from "../../../assets/img/Logo.webp";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faCoins,
    faDollarSign,
    faGifts, faHandsHelping,
    faHome,
    faListOl,
    faPowerOff,
    faSmile,
} from "@fortawesome/free-solid-svg-icons";
import {formatNumber} from "../../utils/betslip";
import DepositProfile from "./component/DepositProfile";
import WithdrawProfile from "./component/WithdrawProfile";
import {getFromLocalStorage} from "../../utils/local-storage";
import PointsProfile from "./component/PointsProfile";
import {Context} from "../../../context/store";
import MybetsProfile from "./component/my-bets";

const NewProfile = () => {
    const [user, ] = useState(getFromLocalStorage("user"));
    const [state, dispatch]=useContext(Context)
    const profile_states=(state?.profile_cash==undefined&&state?.profile_gift==undefined&&state?.profile_deposit==undefined&&state?.profile_points==undefined&&state?.profile_withdraw==undefined&&state?.profile_mybets==undefined )
    const expand = "md"
    setTimeout(()=>
        !user?window.location.href='/':''
    ,3000)
    const prevChoice=useRef('')
    const showCentricPage=(userChoice)=>{
        console.log("start_user_Choice",userChoice)
        console.log("start_user_prevChoice",prevChoice)

        if(prevChoice.current==''){
            console.log("current_choice", prevChoice)
            dispatch({ type: "SET", key: `profile_${userChoice}`, payload: `profile_${userChoice}` });
            prevChoice.current=`profile_${userChoice}`
        }
        else{
            console.log("current_choice_else", prevChoice.current)
            dispatch({ type: "SET", key: prevChoice.current, payload: null });
            dispatch({ type: "SET", key: `profile_${userChoice}`, payload: `profile_${userChoice}` });
            prevChoice.current=`profile_${userChoice}`
        }


    }
    return (
        <div className={'flex-item-profile py-0'}>

            <div className="item-profile4 profile-img-banner">
                <Navbar expand="md" className="mb-0 ck pc os app-navbar top-nav profile-top-nav top-nav-profile" fixed="top"
                        variant="dark" style={{background: 'transparent'}}>
                    <Container fluid className={'d-flex justify-content-between mobile-change mobile-profile'}>
                        <Navbar.Brand className="e logo align-self-start menu-control d-flex w-100" title="Betnare"
                                      style={{paddingLeft: '0px', paddingBottom: '0px'}}>
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
                                        className={"deposit-button size-font-user-action profile-nav"} title={'HOME'}
                                        style={{fontSize: '18px'}}>
                                      <span className="">
                                       <span className=" "> <FontAwesomeIcon
                                           icon={faHome}/></span>&nbsp;
                                          HOME
                                      </span>
                                    </Link>
                                </div>
                                {user && <div>
                                    <Link
                                        to={{pathname: "/logout"}}
                                        className={"deposit-button top-margin-spacing size-font-user-action profile-nav"}
                                        style={{ fontSize: '18px'}} title={'LOGOUT'}>
                                      <span className="text-warning">
                                       <span className=" "><FontAwesomeIcon icon={faPowerOff}
                                                                            className={"text-warning"}/>
                                           </span>&nbsp;
                                          LOGOUT
                                      </span>
                                    </Link>
                                </div>}

                            </div>

                        </Navbar.Brand>

                    </Container>
                </Navbar>
                <div className={'banner-profile'}>
                    <div className={'mobile-profile-links'}>
                        <div className={'d-flex w-100 justify-content-center styling-nav-profile'}>
                             <div>
                                <Link
                                    to={'#'} onClick={()=>showCentricPage('mybets')}
                                    className={"  size-font-user-action "}
                                    style={{marginRight: "12px", fontSize: '18px'}} title={'MYBETS'}>
                                      <span className="">
                                       <span className=" "><FontAwesomeIcon icon={faListOl}
                                                                            className={""}/>
                                           </span>&nbsp;
                                          MY BETS
                                      </span>
                                </Link>
                            </div>
                           <div>
                                <Link
                                    to={'#'} onClick={()=>showCentricPage('all')}
                                    className={" size-font-user-action"}
                                    style={{marginRight: "12px", fontSize: '18px'}} title={'BALANCE'}>
                                      <span className="text-warning">
                                       <span className=" "><FontAwesomeIcon icon={faCoins}
                                                                            className={"text-warning"}/>
                                           </span>&nbsp;
                                          BALANCE
                                      </span>
                                </Link>
                            </div>
                            <div>
                                <Link
                                    to={'/affiliate'}
                                    className={" size-font-user-action"}
                                    style={{marginRight: "12px", fontSize: '18px'}} title={'AFFILIATE'}>
                                      <span className="">
                                       <span className=" "><FontAwesomeIcon icon={faHandsHelping}
                                                                            className={""}/>
                                           </span>&nbsp;
                                          AFFILIATE
                                      </span>
                                </Link>
                            </div>

                        </div>

                    </div>

                </div>

            </div>


            <div className="flex-container profile-style" style={{padding: '0px 2px '}}>

                <div className="item-profile2">
                    <div
                        className="row d-flex flex-column gap-3 px-lg-4 py-sm-0 py-lg-0 justify-content-center align-items-center profile-top "
                        style={{margin: "auto"}}>
                        <div className={'d-flex gap-3 py-3 mobile-profile-columns'}>
                            {(profile_states||state?.profile_cash!=null)&&<div className=" col " id={'gift'}>

                                <div className="card-radius profile-bg text-light">
                                    <div className="card-body d-flex justify-content-between gap-2 mx-2">
                                        <div className={" profile-bg col"}>
                                            <div className="card-body d-flex justify-content-start ">
                                                            <span
                                                                className="font-btn py-2 d-flex flex-column">
                                                                <span
                                                                    className={"d-flex align-items-center gap-2 w-100"}><FontAwesomeIcon
                                                                    icon={faDollarSign}/> Cash</span>
                                                        <strong
                                                            style={{color: "#FFB200"}}> KSH {formatNumber(user?.balance) || 0}</strong> </span>
                                            </div>
                                        </div>
                                        <div className={"d-flex align-items-center"}>
                                            <div className={"line-between"}></div>
                                        </div>

                                        <div className={"profile-bg col"}>
                                            <div className="card-body d-flex justify-content-end ">
                                                            <span className="font-btn py-2 px-2 d-flex flex-column">
                                                                <span className={"d-flex align-items-center gap-2 w-100"}>
                                                                    <FontAwesomeIcon
                                                                        icon={faSmile}/> Bonus
                                                                </span>
                                                        <strong className={'w-100'}>KSH {formatNumber(user?.bonus) || 0}</strong> </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            {(profile_states||state?.profile_gift!=null)&&<div className=" col " id={'mybets'}>

                                <div className="card-radius profile-bg text-light">

                                    <div className="card-body d-flex justify-content-between gap-2 mx-2 ">

                                        <div className={"profile-bg col"}>
                                            <div className="card-body d-flex justify-content-start"><span
                                                className="font-btn py-2 px-2 d-flex flex-column">
                                                                <span className={"d-flex align-items-center gap-2 w-100"}>
                                                            <FontAwesomeIcon
                                                                icon={faGifts}/> Gift </span>
                                                            <span>
                                                                <strong>
                                                            KSH {formatNumber(user?.gift_balance) || 0}</strong>
                                                            </span>
                                                        </span>
                                            </div>
                                        </div>
                                        <div className={"d-flex align-items-center"}>
                                            <div className={"line-between"}></div>
                                        </div>
                                        <div className={"profile-bg col"}>
                                            <div className="card-body d-flex justify-content-end"><span
                                                className="font-btn py-2 px-2 d-flex flex-column">
                                                                <span className={"d-flex align-items-center gap-2 w-100"}>
                                                            <FontAwesomeIcon
                                                                icon={faListOl}/> Points </span>
                                                            <span className={'w-100'}>
                                                                <strong>
                                                             {formatNumber(user?.points_balance) || 0}</strong>
                                                            </span>
                                                        </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                        <div className={'d-flex gap-3 mobile-profile-columns'}>
                            {(profile_states||state?.profile_deposit!=null)&&
                            <div id={'deposit'} className={'col'}>
                                <DepositProfile/>
                            </div>}
                        </div>
                        <div className={'d-flex gap-3 mobile-profile-columns'}>
                            {(profile_states||state?.profile_withdraw!=null  )&&<div id={'withdraw'} className={'col'}>
                                <WithdrawProfile/>
                            </div>}
                            {(profile_states||state?.profile_points!=null)&&<div id={'points'} className={'col '}>
                                <div id={'points'} className={'col'}><PointsProfile/></div>
                            </div>}
                        </div>
                        {(state?.profile_mybets=='profile_mybets')&&<div className={'d-flex gap-1 mobile-profile-columns'}>
                            <div id={'points'} className={'col d-flex gap-3 '}>
                                <div id={'points'} className={'col'}><MybetsProfile mobile={true}/></div>
                            </div>
                        </div>}


                    </div>

                </div>

            </div>
        </div>

    );
};

export default React.memo(NewProfile);
