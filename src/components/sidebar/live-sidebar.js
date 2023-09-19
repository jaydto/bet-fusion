import React, {useCallback, useEffect, useState} from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-perfect-scrollbar/dist/css/styles.css';
import {Menu, MenuItem, ProSidebar, SidebarContent, SidebarHeader} from "react-pro-sidebar";
import {Link} from "react-router-dom";
import useWindowDimensions from "../header/Dimensions";
import {useDispatch, useSelector} from "react-redux";
import {LazyLoadImage} from "react-lazy-load-image-component";
import {setState} from "../../redux/dataSlice";


const LiveSideBar = React.memo(
    () => {


        const {width} = useWindowDimensions();
        const liveCount=useSelector((state)=>state.matchesData.sport_live_count)
        const dispatchRedux=useDispatch()
        const active_link=useSelector((state)=>state.data.active_live_link)
        const getSportImageIcon = (
            sport_name,
            folder = "sports",
            topLeagues = false,
            flag = false
        ) => {
            if (flag) {
                let splitString = sport_name.split(" ");
                sport_name = splitString[0].substr(0, 2).toString().toLowerCase();
            }

            let default_img = "default_sport";
            let sport_image;
            try {
                sport_image = topLeagues
                    ? require(`../../assets/img/${folder}/${sport_name}.svg`)
                    : require(`../../assets/svg/${folder}/${sport_name}.svg`);
            } catch (error) {
                sport_image = require(`../../assets/img/${default_img}.svg`);
            }
            return sport_image;
        };

        const [liveSports, setLiveSports] = useState()
        useEffect(()=>{
            setLiveSports(liveCount)

        },[liveCount])

        const setActiveLink=(link)=>{
            dispatchRedux(setState('active_live_link',link ))
        }

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
                     className={`${width<=991?"":"vh-100  sticky-top  d-md-block up"}`}>
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
                                            <MenuItem className={`live-items `}>
                                                <Link className={`col-12  ${ Number(active_link) === livesport.sport_id ? "active_link" : "link-inactive"}`}
                                                      to={`/live/${livesport.sport_id}`} onClick={()=>setActiveLink(livesport?.sport_id)}>
                                                    <Row>
                                                        <Col className="topl">
                                                            <Row className={'gap-2'} style={{color: "#69819a"}}>
                                                                <div className={` d-flex align-items-center align-self-center live_sidebar ${ Number(active_link) === livesport.sport_id ? "active_link" : "link-inactive"}`}>
                                                                    <LazyLoadImage
                                                                        style={{borderRadius: "50%", height: "15px"}}
                                                                        src={getSportImageIcon(livesport?.sport_name)}
                                                                    />
                                                                    &nbsp;
                                                                    <span>{livesport?.sport_name}</span>&nbsp;
                                                                    <span className={`badge  live-slide  live-side-badge d-flex align-items-center`}>
                                                                        {livesport?.count}
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

    })
export default React.memo(LiveSideBar);
