import React, {useCallback, useEffect, useState} from 'react';
import makeRequest from "../utils/fetch-request";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import useWindowDimensions from "../header/Dimensions";


const LiveSideBar = React.memo(
    (props) => {

        const [liveSports, setLiveSports] = useState()
        const {height, width} = useWindowDimensions();

        const fetchData = useCallback(() => {
            let endpoint = "/v1/sports?live=1";
            makeRequest({url: endpoint, method: "get", data: null})
                .then(([c_status, c_result]) => {
                    if (c_status === 200) {
                        setLiveSports(c_result?.data)
                    }
                });
        }, []);

        useEffect(() => {
            const abortController = new AbortController();
            fetchData();

            return () => {
                abortController.abort();
            };
        }, [fetchData]);

        return (
            <div className={`${width<=991?"":"d-md-block  h-100"}`} >
                <div style={{
                    display: 'flex',
                    overflow: 'scroll initial',
                    zIndex: 10,
                    marginRight: '2px',
                    top: "100px",
                    // marginTop: "10px"
                }}
                     className={`${width<=991?"":"vh-100 text-white sticky-top  d-md-block up"}`}>
                    <ProSidebar className={`${width<=991?"w-100":"live-pro-sidebar"}`}
                                style={{backgroundColor: '#16202c !important'}}
                                image={false}>
                        <SidebarHeader>
                            <div
                                style={{
                                    padding: '5px',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    letterSpacing: '1px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                            </div>
                        </SidebarHeader>
                        <SidebarHeader>
                            <div
                                style={{
                                    padding: '5px',
                                    textTransform: 'uppercase',
                                    fontWeight: 'bold',
                                    fontSize: 14,
                                    letterSpacing: '1px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                <div className="d-flex justify-content-sm-center">
                                    LIVE SPORTS
                                </div>
                            </div>
                        </SidebarHeader>
                        <SidebarContent className={"sidebar-live "}>
                            <Menu iconShape="circle live-inner"  >
                                {liveSports && Object.entries(liveSports).map(([index, livesport],live_index) => (
                                        <Menu iconShape="circle inner-live live-items" key={live_index} >
                                            <MenuItem className={"live-items"}>
                                                <Link className="col-12"
                                                      to={`/live/${livesport.sport_id}`}>
                                                    <Row>
                                                        <Col className="topl">
                                                            <Row className={'gap-2'} style={{color: "#69819a"}}>
                                                                <div className={'text-white d-flex align-items-center'}>
                                                                    <span>{livesport.sport_name}</span>&nbsp;
                                                                    <span className={`badge  live-slide  live-side-badge d-flex align-items-center`}>
                                                                        {livesport.count}
                                                                </span>
                                                                </div>


                                                            </Row>
                                                        </Col>
                                                    </Row>
                                                </Link>
                                            </MenuItem>
                                        </Menu>
                                    )
                                )
                                }
                            </Menu>
                        </SidebarContent>
                    </ProSidebar>
                </div>
            </div>
        );

        // return (
        //     <div className="gn d-md-block">
        //
        //       <PerfectScrollbar >
        //         <div className="qv rc aog alu web-element block-shadow bottom-std-margin-spacing">
        //             <header>
        //                 <div className="header-holder">
        //                     <span className="col-sm-10">Live Sports</span>
        //                     <span className="col-sm-2 header-icon">
        //                     <img
        //                       height="14px"
        //                       src={football}
        //                       alt="-"
        //                       />
        //                     </span>
        //                 </div>
        //             </header>
        //
        //             <ul className="aoi nav base-bg">
        //                 {  liveSports && Object.entries(liveSports).map(([index, livesport])  => (
        //                     <li className="li-white-h" key={index}>
        //                         <a className="col-12"
        //                             href={`/live/${livesport.sport_id}`}>
        //                             <Row>
        //                             <Col lg="11" md="11" sm="11" xs="11" className="topl" >
        //                                 <Row style={{color:"#69819a"}}>
        //                                     <Col>{livesport.sport_name} </Col>
        //                                     <Col><span style={{float:"right", color:"#fff"}}>{livesport.count }</span></Col>
        //                                 </Row>
        //                             </Col>
        //                            </Row>
        //                         </a>
        //                     </li>)
        //                   )
        //                 }
        //             </ul>
        //         </div>
        //       </PerfectScrollbar>
        //     </div>
        // )
    })
export default React.memo(LiveSideBar);