import React, {useEffect, useCallback, useState, useContext, useRef} from 'react';
import {useNavigate} from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Context} from '../../context/store';
import {getFromLocalStorage} from '../utils/local-storage';
import {ToastContainer} from 'react-toastify';
import makeRequest from '../utils/fetch-request';
import {setLocalStorage} from '../utils/local-storage';
import 'react-lazy-load-image-component/src/effects/blur.css';

import logo from '../../assets/img/logo.png';
import {Navbar, Nav, Offcanvas} from "react-bootstrap";
import SideBar from "../sidebar/awesome/Sidebar";
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader, SubMenu} from "react-pro-sidebar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import SidebarMobile from "../sidebar/awesome/SidebarMobile";

const ProfileMenu = React.lazy(() => import('./profile-menu'));
const HeaderLogin = React.lazy(() => import('./top-login'));
const HeaderNav = React.lazy(() => import('./header-nav'));

const Header = (props) => {
    const [user, setUser] = useState(getFromLocalStorage("user"));
    const [, dispatch] = useContext(Context);
    const history = useNavigate();
    const containerRef = useRef();
    const {current} = containerRef;
    const [competitions, setCompetitions] = useState({});

    const fetchData = useCallback(async () => {
        let cached_categories = getFromLocalStorage('categories');
        let endpoint = "/v1/categories";

        if (!cached_categories) {
            const [competition_result] = await Promise.all([
                makeRequest({url: endpoint, method: "get", data: null}),
            ]);
            let [c_status, c_result] = competition_result

            if (c_status === 200) {
                setCompetitions(c_result);
            }
            setLocalStorage('categories', c_result);
        } else {
            setCompetitions(cached_categories);
        }

    }, []);

    useEffect(() => {

        const abortController = new AbortController();
        fetchData();

        return () => {
            abortController.abort();
        };
    }, [fetchData]);


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
    const updateUserOnHistory = useCallback(() => {
        if (!user) {
            return false;
        }
        let endpoint = "/v1/balance";
        let udata = {
            token: user.token
        }
        makeRequest({url: endpoint, method: "post", data: udata}).then(([_status, response]) => {
            if (_status == 200) {
                let u = {...user, ...response.user};
                setLocalStorage('user', u);
                setUser(u)
                dispatch({type: "SET", key: "user", payload: user});
            }
        });

    }, [current]);

    const updateUserOnLogin = useCallback(() => {
        dispatch({type: "SET", key: "user", payload: user});
    }, [user?.msisdn, user?.balance]);


    useEffect(() => {
        updateUserOnHistory()
    }, [updateUserOnHistory])


    useEffect(() => {
        updateUserOnLogin()
    }, [updateUserOnLogin])

    const expand = "md"
    return (
        <>
            <Navbar expand="md" className="mb-3 ck pc os app-navbar top-nav" fixed="top" variant="dark">
                <Container fluid className={'d-flex justify-content-between'}>
                    <Navbar.Brand href="/" className="e logo align-self-start" title="Betnare">
                        <div className="col-3">
                            <div>
                                <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"/>
                            </div>
                        </div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}/>
                    <div className="col-9" id="navbar-collapse-main">
                        <div className="col-md-5 right ">
                            {user ? <ProfileMenu user={user}/> : <HeaderLogin setUser={setUser}/>}
                        </div>
                    </div>
                    <Row className="second-nav ck pc os app-navbar app-header-nav">
                        <HeaderNav/>
                    </Row>
                    <Navbar.Offcanvas
                        style={{width: "100% !important", height: "100%"}}
                        className='off-canvas background-primary p-0'
                        id={`offcanvasNavbar-expand-${expand}`}
                        aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                        placement="start">
                        <Offcanvas.Header closeButton className='text-white'>
                            <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                <div className="col-3">
                                    <div>
                                        <LazyLoadImage src={logo} alt="Betnare" title="Betnare" effects="blur"/>
                                    </div>
                                </div>
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <SidebarMobile/>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </>

    )
}
export default React.memo(Header);
