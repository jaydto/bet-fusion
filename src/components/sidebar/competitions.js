import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Competitions = (props) => {
    const {competitions } = props;

    return (

            <ul className="aoi nav base-bg">
            {  Object.entries(competitions).map(([index, competition])  => (
                <li className="li-white-h" key={index}>
                    <a className="col-12" 
                        href={`/competition/${competition.competition_id}?sp=${competition.sport_id}`}>
                        <Row>
                        <Col lg="1" sm="1" md="1" xs="1" style={{padding:0}}>
                            { competition?.flag && 
                                <LazyLoadImage  
                                   className="side-icon" 
                                   src={require(`../../assets/img/flags-1-1/${competition.flag}.svg`) }
                                   /> 
                            }
                        </Col>
                        <Col lg="11" md="11" sm="11" xs="11" className="topl" >
                            <Row style={{color:"#69819a"}}>{competition.category}</Row> 
                            <Row>{competition.competition_name}</Row>
                        </Col>
                       </Row>
                    </a>
                </li>)
              )
            }
            </ul>
    )
}
export default React.memo(Competitions);
