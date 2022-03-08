import React, {useState, useContext, useEffect} from 'react';
import { Context }  from '../../context/store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Competitions = (props) => {

    const [imageLoaded, setImageLoaded] = useState(false);
    const [state, dispatch] = useContext(Context);                              
    const {competitions } = props;


    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (

            <ul className="aoi nav base-bg">
            {  Object.entries(competitions).map(([index, competition])  => (
                <li className="li-white-h" key={index}>
                    <a className="col-sm-12" 
                        href={`/competition/${competition.competition_id}?sp=${competition.sport_id}`}>
                        <Row>
                        <Col lg="1" style={{padding:0}}>
                            { competition?.flag && 
                                <LazyLoadImage  
                                   style={{display: imageLoaded? 'inline': 'none', width:"16px"}}
                                   className="side-icon" 
                                   src={require(`../../assets/img/flags-1-1/${competition.flag}.svg`) }
                                   onLoad={onImageLoaded} /> 
                            }
                        </Col>
                        <Col lg="11" className="topl" >
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
export default Competitions;
