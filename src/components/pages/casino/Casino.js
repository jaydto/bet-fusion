import React, {useEffect, useState} from 'react';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import makeRequest from "../../utils/fetch-request";
import SideBar from "../../sidebar/awesome/Sidebar";
import {getFromLocalStorage, setLocalStorage} from "../../utils/local-storage";
import Notify from "../../utils/Notify";
import {keys} from "@material-ui/core/styles/createBreakpoints";
import {LazyLoadImage} from "react-lazy-load-image-component";

const Casino = (props) => {

    const [dgaConnected, setDgaConnected] = useState(false)
    const [tableKeys, setTableKeys] = useState({})
    const [tableData, setTableData] = useState([])

    const [user] = useState(getFromLocalStorage("user"));

    const [categories, setCategories] = useState([])

    const [games, setGames] = useState([])

    const fetchGames = async (category = 'vs') => {
        let endpoint = "/v1/casino-games?game-type-id=" + category
        let method = "GET"
        await makeRequest({url: endpoint, method: method}).then(([status, result]) => {
            if (status === 200) {
                setCategories(result.types)
                setGames(result.data)
                setLocalStorage('category_games', result.data)
            }
        });
    }

    const getCategoryGames = (category) => {
        setGames([])
        fetchGames(category?.game_type_id)
    }

    const showLoginNotification = () => {
        let message = {
            status: 500,
            message: "Please Log In to continue."
        }
        Notify(message)
    }

    const launchGame = (game_id) => {

        if (user?.token) {
            return window.location.href = `/gameplay/${game_id}`
        }

        return showLoginNotification()
    }

    const initializeDGAEvents = async () => {
        window.dga.onWsError = (err) => {
            // console.log("Error connecting DGA ws socket", err)
            setDgaConnected(false)
        }
        window.dga.onConnect = () => {
            // console.log("Successfully Connected DGA ws socket")
            setDgaConnected(true)
        }
        window.dga.onMessage = (data) => {
            let dataResult = []
            if (data.hasOwnProperty('tableKey')) {
                data?.tableKey?.forEach((key) => {
                    let result = {
                        id: key,
                        data: {}
                    }
                    dataResult.push(result)
                })
                // console.log("Table result is ", dataResult)
                setTableKeys(dataResult)
            } else {
                let localData = tableData
                // console.log(data)
                let index = tableData.findIndex((item) => item.tableId === data?.tableId)
                // console.log("Index found as ", index)
                if (index !== -1) {
                    // exists, updating request received...
                    localData[index] = data
                } else {
                    let length = localData.length
                    if (length === 0) {
                        localData[0] = data
                    } else {
                        localData[length] = data
                    }
                }
                console.log("Local Data here is ", localData)
                setTableData([...localData])
                console.log("Updated table data is ", [...localData])
            }
        }
    }

    const initializeDGA = async () => {
        try {
            let url = "prelive-dga0.pragmaticplaylive.net/ws?key=testKey&stylename=bisl_betnare";
            window.dga.connect(url)
            // console.log("Connected to DGA Web Socket on PP")
        } catch (e) {
            // console.log("Error connecting to DGA Web Socket ", e)
        }
    }

    const getCasinoGames = () => {
        // console.log("DGA connnected", dgaConnected)
        if (dgaConnected) {
            window.dga.available('ppcdk00000009542')
        }
    }

    const getGamesForTableKeys = () => {
        // console.log("Table keys are ", typeof tableKeys)
        Object.values(tableKeys).forEach((data, key) => {
            window.dga.subscribe('ppcdk00000009542', data?.id, 'Ksh')
        })
    }
    useEffect(() => {
        initializeDGA().then(() => {
            initializeDGAEvents()
        })
        fetchGames()
    }, [])

    useEffect(() => {
        getCasinoGames()
    }, [dgaConnected])

    useEffect(() => {
        getGamesForTableKeys()
    }, [tableKeys])

    useEffect(() => {
        // console.log("Table Data changed", tableData)
    }, [tableData])


    return (
        <>
            <Header/>
            <div className="amt">
                <div className="d-flex flex-row">
                    <SideBar loadCompetitions/>
                    <div className="gz home" style={{width: '100%'}}>
                        <div className="homepage">
                            <div className="col-md-12 d-flex flex-column">
                                <div className="col-md-12">
                                    <div className="game-categories shadow-sm  p-2 shadow-sm casino-category-container">
                                        {categories?.map((category, index) => (
                                            <button
                                                className={`cursor-pointer text-center casino-category ${category.game_type_id === 'rgs-vsb' ? 'd-none' : ''}`}
                                                key={category.game_type_id}
                                                autoFocus={index === 0}
                                                onClick={() => getCategoryGames(category)}>
                                                {category?.game_type_description}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="col">
                                    <div className={'row text-white p-2 shadow-sm'}>
                                        <div className="row">
                                            {tableData?.map((tableDataItem) => (
                                                <div className={'col-md-3 shadow-lg'}
                                                     onClick={() => launchGame(tableDataItem?.tableId)}>
                                                    <LazyLoadImage src={`${tableDataItem?.tableImage}`}
                                                                   style={{borderRadius: "4px"}}
                                                                   className={'casino-game-image'}/>
                                                    {tableDataItem?.tableName}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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