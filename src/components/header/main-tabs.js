import Reacti, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import classNames from "classnames"

const MainTabs = (props) => {
   const {tab} = props;

   const u_class = tab == 'upcoming' ? "home-tabs-active" : "home-tabs";
   const h_class = (!tab || tab == 'highlights') ? "home-tabs-active" : "home-tabs";
   const t_class = tab == 'tomorrow' ? "home-tabs-active" : "home-tabs";
   
   return (
        <Container >
        <Row className="top-matches">                                     
          <a href="/upcoming" className={`col-sm-4 ${u_class}`}>
                <span className="col-sm-11 main-header">Upcoming</span>
            </a>                                                            
            <a href="/highlights"  className={`col-sm-4 ${h_class}`}>            
                <span className="col-sm-11 main-header">Highlights</span>
            </a>                                                            
            <a href="/tomorrow" className={`col-sm-4 ${t_class}`}> 
                <span className="col-sm-11 main-header">Tomorrow</span>
          </a>                                                              
        </Row>      
       </Container>
   )

}

export default MainTabs;
