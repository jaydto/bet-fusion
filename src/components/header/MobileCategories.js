import React from "react";
import Container from "react-bootstrap/Container";
import {getFromLocalStorage} from "../utils/local-storage";
import {Link} from "react-router-dom";
import {LazyLoadImage} from "react-lazy-load-image-component";

const MobileCategories = React.memo(
    () => {
    let categories = getFromLocalStorage('sport_categories');
    return (
        <Container>
            <div className="container-fluid py-2">
                <div className="d-flex flex-row flex-nowrap overflow-auto">
                    {categories?.all_sports.map((category, index) => (
                        <div className=""
                             key={index}
                             style={{minWidth: "120px"}}>
                            <Link to={`/upcoming?sport_id=${category.sport_id}/`}
                               className={'card card-block mx-1 d-flex flex-column h-100'}>
                                <LazyLoadImage style={{borderRadius: '50%', height: '35px', width: "35px"}}
                                     className={'align-self-center'}
                                     src={require(`./../../assets${category.flag}`)}/>
                                <span className={'align-self-center'}>
                                {category?.sport_name}
                           </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    )
})

export default React.memo(MobileCategories);