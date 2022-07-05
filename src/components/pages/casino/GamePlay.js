import React, {useEffect, useState} from "react";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import {useParams} from "react-router-dom";
import makeRequest from "../../utils/fetch-request";

const GamePlay = (props) => {
    const {game_id} = useParams()

    const [gameUrl, setGameUrl] = useState('')

    const [gameUrlLoaded, setGameUrlLoaded] = useState(false)

    const getGameUrl = async (game_id) => {

        const headers = {
            Authorization: 'Bearer aedc397f7a20fc82b265f89e1726a2965bc5339b2777fb2c071f2a3c'
        }
        let endpoint = `/v1/casino/game/url?game-id=${game_id}`

        let method = "GET"

        await makeRequest({url: endpoint, method: method, additionalHeaders: headers}).then(([status, result]) => {
            if (status === 200) {
                setGameUrl(result?.result.gameURL)
                setGameUrlLoaded(true)
            }
        });
    }

    useEffect(() => {
        getGameUrl(game_id)
    }, [])
    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row justify-content-between">
                    <div className="col-md-12">
                        <div className="homepage">
                            <div
                                className={`col-md-12  text-center alert alert-warning ${gameUrlLoaded ? 'd-none' : 'd-block'}`}>
                                Getting game details. Please wait ...
                            </div>
                            {gameUrlLoaded && <>
                                <iframe src={gameUrl} title="Gadme" width={'100%'} height={'500px'}></iframe>
                            </>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default GamePlay