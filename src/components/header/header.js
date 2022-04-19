import React, { useEffect, useCallback, useState, useContext }from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Context }  from '../../context/store';
import { getFromLocalStorage } from '../utils/local-storage';
import { ToastContainer} from 'react-toastify';
import 'react-lazy-load-image-component/src/effects/blur.css';

import logo from '../../assets/img/logo.png';
const ProfileMenu = React.lazy(()=>import('./profile-menu'));
const HeaderLogin = React.lazy(()=>import('./top-login'));
const HeaderNav = React.lazy(()=>import('./header-nav'));

const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [, dispatch] = useContext(Context);

    const NotifyToastContaner = () => {
       return <ToastContainer
                   position="top-right"
                   autoClose={5000}
                   hideProgressBar={false}
                   newestOnTop={false}
                   closeOnClick
                   rtl={false}
                   pauseOnFocusLoss
                   draggable
                   pauseOnHover
                   />
    };

    const updateUserOnLogin = useCallback(() => {
        dispatch({type:"SET", key:"user", payload:user});
    }, [user]);

    useEffect(() => {
        updateUserOnLogin()
    }, [updateUserOnLogin])

    return (
       <Container className="shrink-header" id="shrink-header">

            <NotifyToastContaner />
            <Row className="ck pc os app-navbar top-nav">
                <div className=" col-3">
                  <div>
                      <a className="e logo" href="/" title="Betnare">
                      <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects ="blur"/>
                      </a>
                  </div>
                </div>
                <div className="col-9" id="navbar-collapse-main">
                    { user ?  <ProfileMenu  user={user}/> : <HeaderLogin setUser = {setUser}/> }
                </div>
            </Row>
            <Row className="second-nav ck pc os app-navbar ">
               
              <HeaderNav />
            </Row>
       </Container>
    )
}
export default React.memo(Header);
