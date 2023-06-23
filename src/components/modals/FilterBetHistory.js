import React, { useState } from 'react';
import { ToastContainer, Modal, Button, Form } from 'react-bootstrap';
import "./modals-custom.css"
const GameHistoryList = ({ games }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [filterCategory, setFilterCategory] = useState('');

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleFilterChange = (category) => {
        setFilterCategory(category);
    };

    const filterGames = () => {
        let filteredGames = games;

        if (filterCategory === 'today') {
            // Filter games for today
            // ...
        } else if (filterCategory === 'yesterday') {
            // Filter games for yesterday
            // ...
        } else if (filterCategory === 'week') {
            // Filter games for the current week
            // ...
        } else if (filterCategory === 'month') {
            // Filter games for the current month
            // ...
        }

        return filteredGames?.map((game) => (
            <div key={game.bet_id}>
                {/* Render game details here */}
            </div>
        ));
    };

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
            </Modal>

            {/* Filter buttons */}

                <div className="d-flex justify-content-between flex-column px-3">
                    <div className={"btn-history-filter"} onClick={() => handleFilterChange('today')}>Today</div>
                    <div className={"btn-history-filter"} onClick={() => handleFilterChange('yesterday')}>Yesterday</div>
                    <div className={"btn-history-filter"} onClick={() => handleFilterChange('week')}>Week</div>
                    <div className={"btn-history-filter"} onClick={() => handleFilterChange('month')}>Month</div>
                </div>


            {/* Game list */}
            <div>{filterGames()}</div>
        </>
    );
};

export default React.memo(GameHistoryList);
