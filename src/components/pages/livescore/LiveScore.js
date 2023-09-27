import Header from "../../header/header";
import Footer from "../../footer/footer";
import React, {useContext, useEffect, useState} from "react";
import useWindowDimensions from "../../header/Dimensions";
import {StoreContext} from "../../../context/store"
import {useSelector} from "react-redux";
import {getFromLocalStorage} from "../../utils/local-storage";

const LiveScore = React.memo(
    () => {
        const {width} = useWindowDimensions();
        const {} = useContext(StoreContext);
        const userData = useSelector((state) => state.auth.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))
        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, [userData])
        return (
            <>
                <Header/>
                <div className={(width <= 575 ? user ? "user_logged" : "amt" : "amt")}>
                    <div className="d-flex flex-row">
                        <div className="gz home " style={{width: '100%'}}>
                            <div className="homepage">
                                <div className="col-md-12 d-flex flex-column">
                                    <div
                                        className='col-md-12 primary-bg p-4 text-center d-flex d-none flex-row justify-content-center'>
                                        <h5 className="inline-block align-self-center text-uppercase">
                                            Live Score
                                        </h5>
                                    </div>
                                    <div className="col">
                                        <div className={'row text-white p-2 shadow-sm'}>
                                            <div className="col-md-12 d-flex flex-row shadow-lg p-3">
                                                <div className="col-md-12">
                                                    <div className="d-flex flex-column">
                                                        <iframe src="https://ls.sir.sportradar.com/betnaremts"
                                                                height={'100%'} className={'vh-100 frame-spacing'}
                                                                title="Betnare Livescore"></iframe>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"mobile-remove"}>
                    <Footer/>
                </div>
            </>)
    })

export default React.memo(LiveScore)