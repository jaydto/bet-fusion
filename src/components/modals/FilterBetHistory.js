import React, {useContext, useEffect, useState} from 'react';
import { ToastContainer, Modal, Button, Form } from 'react-bootstrap';
import "./modals-custom.css"
import {Context} from "../../context/store";
const GameHistoryList = (props) => {
    const {visible, games,setShowGameFilter} = props
    const [isOpen, setIsOpen] = useState(visible)
    const [state, dispatch]=useContext(Context)
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({});
    const [selectedFilter, setSelectedFilter] = useState('today');

    console.log("dates", games)

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const hideModal = () => {
        setIsOpen(false)
        setShowGameFilter(false)
        // setLocalStorage("share-modal",0)
        // console.log("share_from_modal",getFromLocalStorage("share-modal"))
    }

    const handleFilterChange = (category) => {
        setSelectedFilter(category);
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
        console.log("selectedFilter",selectedFilter )
        const filteredGames = games?.filter((game) => {
            const createdDate = new Date(game.created);
            if (selectedFilter === 'today') {
                return isSameDate(createdDate, currentDate);
            } else if (selectedFilter === 'yesterday') {
                const yesterday = new Date(currentDate);
                yesterday.setDate(currentDate.getDate() - 1);
                return isSameDate(createdDate, yesterday);
            } else if (selectedFilter === 'week') {
                const oneWeekAgo = new Date(currentDate);
                oneWeekAgo.setDate(currentDate.getDate() - 7);
                return createdDate >= oneWeekAgo && createdDate <= currentDate;
            } else if (selectedFilter === 'month') {
                const oneMonthAgo = new Date(currentDate);
                oneMonthAgo.setMonth(currentDate.getMonth() - 1);
                return createdDate >= oneMonthAgo && createdDate <= currentDate;
            }
            return false;
        });
        console.log("filteredByDatesGames",filteredGames )

        dispatch({type: "SET", key: "bets_by_date", payload: filteredGames });
    };

    // handleFilterChange
    useEffect(()=>{
        filterGames()
    },[selectedFilter])

    const handleSubmit = () => {
        // Handle login form submission
        // ...
    };

    return (
        <>
            <ToastContainer />
            <Modal
                show={isOpen}
                className="shadow-lg filters-modal"
                dialogClassName="modal-50w"
                centered={true}
                size="md"
                backdrop="static"
                style={{ zIndex: '9999' }}
            >
                {/* Modal contents */}
                {/* Filter buttons */}
                <Modal.Header closeButton={false} className={"w-100"} style={{borderBottom:"0px"}}>
                    <Modal.Title className={"w-100"}>
                        <div className={"d-flex justify-content-between align-items-start flex-column px-4"}>
                            <div className="close-history-filter">
                                <input
                                    id={"history-filter"}
                                    type="submit"
                                    value="X"
                                    onClick={hideModal}
                                />
                            </div>
                            <strong style={{width:"100%", fontSize:"19px", fontWeight:"bolder", letterSpacing:"2px"}}>Filters</strong>
                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{borderBottom:"0px", paddingTop:"4px", paddingBottom:"0px"}}>
                    <div className="d-flex justify-content-between flex-column px-3">
                        <div className={"btn-history-filter"} onClick={() => handleFilterChange('today')}>Today</div>
                        <div className={"btn-history-filter"} onClick={() => handleFilterChange('yesterday')}>Yesterday</div>
                        <div className={"btn-history-filter"} onClick={() => handleFilterChange('week')}>Week</div>
                        <div className={"btn-history-filter"} onClick={() => handleFilterChange('month')}>Month</div>
                    </div>
                </Modal.Body>
            </Modal>




            {/* Game list */}
            {/*<div>{filterGames()}</div>*/}
        </>
    );
};

export default React.memo(GameHistoryList);
