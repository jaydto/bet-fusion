import React, {useContext, useEffect, useRef, useState} from 'react';
import { ToastContainer, Modal, Button, Form } from 'react-bootstrap';
import "./modals-custom.css"
import {StoreContext } from "../../context/store";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckCircle} from "@fortawesome/free-solid-svg-icons";

const GameHistoryList = (props) => {
    const {visible, games,setShowGameFilter} = props
    const [isOpen, setIsOpen] = useState(visible)
    const {state, dispatch}=useContext(StoreContext )
    const [selectedFilter, setSelectedFilter] = useState(state?.selected_filter_category||"");
    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const hideModal = () => {
        setIsOpen(false)
        setShowGameFilter(false)
    }

    const handleFilterChange = (category) => {
        setSelectedFilter(category);
        dispatch({type: "SET", key: "selected_filter_category", payload: category });
        // return setTimeout(()=>{
        //      hideModal()
        // },[0.5])

    };



    const currentDate = new Date();
    const isSameDate = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    const filterGames = () => {
        const bet_history_games=state?.filteredHistoryGames||games;
        const filteredGames = bet_history_games?.filter((game) => {
            const createdDate = new Date(game.created);
            if (selectedFilter === 'today') {
                return isSameDate(createdDate, currentDate);
            } else if (selectedFilter === 'yesterday') {
                const yesterday = new Date(currentDate);
                yesterday.setDate(currentDate.getDate() - 1);
                return isSameDate(createdDate, yesterday);
            } else if (selectedFilter === 'open') {
                return game?.status_desc === 'PENDING';
            }
            else if (selectedFilter === 'week') {
                const oneWeekAgo = new Date(currentDate);
                oneWeekAgo.setDate(currentDate.getDate() - 7);
                return createdDate >= oneWeekAgo && createdDate <= currentDate;
            } else if (selectedFilter === 'month') {
                const oneMonthAgo = new Date(currentDate);
                oneMonthAgo.setMonth(currentDate.getMonth() - 1);
                return createdDate >= oneMonthAgo && createdDate <= currentDate;
            }
            else if (selectedFilter === '3month') {
                const threeMonthsAgo = new Date(currentDate);
                threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
                return createdDate >= threeMonthsAgo && createdDate <= currentDate;
            }
            else if (selectedFilter === 'all') {
                // No filtering, return all games
                return true
            }
            return false;
        });
        // console.log("filteredByDatesGames",filteredGames )

        dispatch({type: "SET", key: "bets_by_date", payload: filteredGames });
    };

    // handleFilterChange
    useEffect(()=>{
        if(selectedFilter){
            filterGames()
        }
    },[selectedFilter])

    const selected=useRef(selectedFilter)

    useEffect(()=>{
        if(selected.current!==selectedFilter){
            selected.current=selectedFilter
            return hideModal()
        }

    },[selectedFilter])

    // console.log("selected current",selected )


    return (
        <>
            <ToastContainer />
            <Modal
                show={isOpen}
                className="shadow-lg filters-modal deposit-modal deposit-modal-body"
                dialogClassName="modal-30w"
                centered={true}
                size="md"
                backdrop="static"
                style={{ zIndex: '9999' }}
            >
                <Modal.Header  closeButton={false} className={"w-100"}>
                    <Modal.Title className={"w-100"}>
                        <div className={"d-flex justify-content-between align-items-start flex-column px-4"}>
                            <div className="drag-icon"><span></span></div>
                            <div className="close-history-filter filter-bets deposit-modal">
                                <input
                                    id={"history-filter"}
                                    type="submit"
                                    value="X"
                                    onClick={hideModal}
                                />
                            </div>
                            <strong style={{width:"100%", fontSize:"19px", fontWeight:"bolder", letterSpacing:"2px"}} className={'deposit-modal-top-title filter-bets d-flex w-100 '}>Filters</strong>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{borderBottom:"0px", paddingTop:"4px", paddingBottom:"0px"}}>
                    <div className="d-flex justify-content-around flex-column px-3">
                        <div className={"d-flex justify-content-between mobile-filter-history gap-2 align-items-center"} onClick={() => handleFilterChange('all')}>
                            <div className={"btn-history-filter cursor-pointer"} >All</div>
                            {(selectedFilter||state?.selected_filter_category)==="all"&&<FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/>}
                        </div>
                        <div className={"d-flex justify-content-between mobile-filter-history gap-2 align-items-center"} onClick={() => handleFilterChange('open')}>
                            <div className={"btn-history-filter cursor-pointer"} >Open</div>
                            {(selectedFilter||state?.selected_filter_category)==="open"&&<FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/>}
                        </div>
                        <div className={"d-flex justify-content-between mobile-filter-history gap-2 align-items-center"} onClick={() => handleFilterChange('today')}>
                            <div className={"btn-history-filter cursor-pointer"} >Today</div>
                            {(selectedFilter||state?.selected_filter_category)==="today"&&<FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/>}
                        </div>
                        <div className="d-flex justify-content-between mobile-filter-history gap-2 align-items-center" onClick={() => handleFilterChange('yesterday')}>
                            <div className={"btn-history-filter cursor-pointer"} >Yesterday</div>
                            {(selectedFilter||state?.selected_filter_category)==="yesterday"&&<FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/>}
                        </div>
                        <div className="d-flex justify-content-between mobile-filter-history gap-2 align-items-center" onClick={() => handleFilterChange('week')}>
                            <div className={"btn-history-filter cursor-pointer"} >Week</div>
                            {(selectedFilter||state?.selected_filter_category)==="week"&&<FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/>}
                        </div>
                        <div className="d-flex justify-content-between mobile-filter-history gap-2 align-items-center" onClick={() => handleFilterChange('month')}>
                            <div className={"btn-history-filter cursor-pointer"} >Month</div>
                            {(selectedFilter||state?.selected_filter_category)==="month"&&<FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/>}
                        </div>
                        <div className="d-flex justify-content-between mobile-filter-history gap-2 align-items-center" onClick={() => handleFilterChange('3month')}>
                            <div className={"btn-history-filter cursor-pointer"} >3 Months</div>
                            {(selectedFilter||state?.selected_filter_category)==="3months"&&<FontAwesomeIcon icon={faCheckCircle} className={"text-success"}/>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer className={'text-center modal-width deposit-modal-footer'}>
                    <Button className={'cancel-filter-markets bg-deposit-modal-btn'} onClick={hideModal} >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
};

export default React.memo(GameHistoryList);
