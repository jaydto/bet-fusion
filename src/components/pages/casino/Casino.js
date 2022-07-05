import React, {useEffect, useState} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import {LazyLoadImage} from 'react-lazy-load-image-component';
import {Link} from "react-router-dom";

const Casino = (props) => {

    const [categories, setCategories] = useState([])

    const [games, setGames] = useState([])

    const fetchGames = async (category = 'vs') => {
        let endpoint = "/v1/casino-games?game-type-id=" + category
        let method = "GET"
        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setCategories(result.types)
                setGames(result.data)
            }
        });
    }

    const getCategoryGames = (category) => {
        setGames([])
        fetchGames(category?.game_type_id)
    }

    useEffect(() => {
        fetchGames()
    }, [])
    return (

        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="col-md-12">
                        <div className="homepage">
                            <div
                                className="game-categories sticky-top col-md-12 shadow-sm text-white d-flex position-sticky p-2 mt-1 shadow-sm overflow-scroll">
                                {categories?.map((category) => (
                                    <a className={`col-md-1 cursor-pointer text-center casino-category`}
                                       key={category.game_type_id}
                                       onClick={() => getCategoryGames(category)}>
                                        {category?.game_type_description}
                                    </a>
                                ))}
                            </div>
                            <div className={'row text-white p-2 shadow-sm'}>
                                {games?.map((game) => (
                                    <Link to={{
                                        pathname: `/casino/${game.game_id}`
                                    }}
                                          className="col-md-2 mt-1 d-flex flex-column shadow-sm"
                                          key={game.game_id}>
                                        <LazyLoadImage src={`${game.game_icon}`} className={'virtual-game-image'}/>
                                        <p className={'p-2 bold'}>{game.game_name}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )

}


export default Casino;