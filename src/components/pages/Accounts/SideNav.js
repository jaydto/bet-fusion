import React, {useState} from 'react';
import {Link} from "react-router-dom";

const SideNav = () => {
    const [show, setShow]=useState(false)
    const SideBar_ShowHide=()=>
    {
        setShow(!show)
    };

    return (

        <div id="SideBar" style={show?{width:'auto', top:'10rem', position:'sticky'}:{width:'0px',height:'100vh', top:'0px', left:'0px'}}>

            {show&&<div id="SideBarMenu">
                <div
                    className={'d-flex flex-column  d-flex justify-content-center font-navigation align-items-center gap-4  sticky-option'}>
                    <Link to={'#cash'} className={'text-light style-card'}>
                        Cash
                    </Link>
                    <Link to={'#gift'} className={'text-light style-card'}>
                        Gift
                    </Link>
                    <Link to={'#deposit'} className={'text-light style-card'}>
                        Deposit
                    </Link>
                    <Link to={'#wisthdraw'} className={'text-light style-card'}>
                        Withdraw
                    </Link>
                    <Link to={'#mybets'} className={'text-light style-card'}>
                        Mybets

                    </Link>


                    <Link to={'#support'} className={'text-light style-card'}>

                        Support
                    </Link>


                </div>
            </div>}

            <div id="SideBarText" onClick={()=>SideBar_ShowHide()}>MENU</div>

        </div>
    );
};

export default SideNav;
