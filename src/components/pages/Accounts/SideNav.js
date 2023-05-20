import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './side.css'
const SideNav = () => {
    const [show, setShow]=useState(false)

    return(
        <div>
            <aside id="sidebar">

                <div className="dot"></div>
                <div class="sidebar_content sidebar_body">
                    <nav class="side_navlinks">
                        <ul>
                            <li><Link  to={'#cash'}>Cash</Link></li>
                            <li><Link to={'#gift'} >Gift</Link></li>
                            <li><Link to="#">Deposit</Link></li>
                            <li><Link to="#">Withdraw</Link></li>
                            <li> <Link to={'#support'} >Support</Link></li>
                            <li><Link to={'#mybets'} >Mybets</Link></li>
                        </ul>
                    </nav>
                </div>

                <div className="dot"></div>


                <div class="sidebar_content sidebar_foot">
                    <p>
                        &#169;
                        <script>
                            document.write(new Date().getFullYear());
                        </script>
                        &#160;Support
                    </p>
                </div>
            </aside>
        </div>
    );


};

export default SideNav;