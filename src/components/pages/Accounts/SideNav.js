import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './side.css'
const SideNav = () => {
    const [show, setShow]=useState(false)

    return(
        <div style={{position:'sticky',top:'10rem'}}>
            <aside id="sidebar" style={{background:'#1f2f38', padding:'10px', borderRadius:"4px"}}>
                <h2>Profile</h2>
                <div className="dot"></div>
                <div class="sidebar_content sidebar_body">
                    <nav class="side_navlinks">
                        <ul>
                            <li><a  href={'/profile#cash'}>Cash</a></li>
                            <li><a href={'/profile#gift'} >Gift</a></li>
                            <li><a href={'/profile#mybets'} >Mybets</a></li>
                            <li><a href="/profile#deposit">Deposit</a></li>
                            <li><a href="/profile#withdraw">Withdraw</a></li>
                            <li> <a href={'/profile#support'} >Support</a></li>
                        </ul>
                    </nav>
                </div>

                <div className="dot"></div>


                <div class="sidebar_content sidebar_foot">
                    <p>
                        &#169; Betnare 2023

                    </p>
                </div>
            </aside>
        </div>
    );


};

export default React.memo(SideNav);