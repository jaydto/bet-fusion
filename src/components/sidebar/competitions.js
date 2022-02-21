import React, {useState, useContext, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import useAxios from "../../hooks/axios.hook";
import { Context }  from '../../context/store';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Competitions = (props) => {

    const [imageLoaded, setImageLoaded] = useState(false);
    const [state, dispatch] = useContext(Context);                              
    const [topSoccer, setTopSoccer] = useState(null);

    useEffect(() => {
        if(state?.categories){
            setTopSoccer(state?.categories?.top_soccer)
        }

    }, [state?.categories])

    const onImageLoaded = () => {
        setImageLoaded(true);
    }

    return (

            <ul className="aoi nav base-bg">
            { topSoccer && 
                Object.entries(topSoccer).map(([index, competition])  => (
                <li className="li-white-h" key={index}>
                    <a className="col-sm-12" 
                        href={`/competition/${competition.competition_id}?sp=${competition.sport_id}`}>
                        <Row>
                        <Col lg="1" style={{padding:0}}>
                            { competition?.flag && <img  
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

            { !topSoccer &&  (< div className="react-loading">
                       <Skeleton count={7} height={50} className="react-loading"></Skeleton>
                    </div>
                  )
            }
            </ul>
    )
}
export default Competitions;
