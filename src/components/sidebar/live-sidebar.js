import React, { useState, useEffect, useCallback } from 'react';
import football from '../../assets/svg/football.svg'
import PerfectScrollbar from 'react-perfect-scrollbar';
import makeRequest from "../utils/fetch-request";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-perfect-scrollbar/dist/css/styles.css';

const LiveSideBar = (props) => {

    const [liveSports, setLiveSports] = useState()


    const fetchData = useCallback(() => {
        let endpoint = "/v1/sports?live=1";     
        makeRequest({url:endpoint, method:"get", data:null })
            .then(([c_status, c_result]) => {
            console.log("V1 sports result ", c_result, c_status);
            if(c_status === 200){
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
        <div className="gn d-md-block">

          <PerfectScrollbar >
            <div className="qv rc aog alu web-element block-shadow bottom-std-margin-spacing">
                <header>
                    <div className="header-holder">
                        <span className="col-sm-10">Live Sports</span>
                        <span className="col-sm-2 header-icon">
                        <img 
                          height="14px" 
                          src={football} 
                          alt="-"
                          />
                        </span>
                    </div>
                </header>

                <ul className="aoi nav base-bg">
                    {  liveSports && Object.entries(liveSports).map(([index, livesport])  => (
                        <li className="li-white-h" key={index}>
                            <a className="col-12" 
                                href={`/live/${livesport.sport_id}`}>
                                <Row>
                                <Col lg="11" md="11" sm="11" xs="11" className="topl" >
                                    <Row style={{color:"#69819a"}}>{livesport.sport_name}</Row> 
                                </Col>
                               </Row>
                            </a>
                        </li>)
                      )
                    }
                </ul>
            </div>
          </PerfectScrollbar>
        </div>
    )
}
export default LiveSideBar;
