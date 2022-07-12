import React, {useState} from "react";
import {faFilter, faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button, Modal} from "react-bootstrap";

const MarketFilter = () => {
    const [showFilters, setShowFilters] = useState(false)
    const handleClose = () => {
        setShowFilters(false)
    }
    const markets = [
        {id: "1", name: "1X2 Winner"},
        {id: "10", name: "Double Chance"},
        {id: "29", name: "Both Teams to Score"},
        {id: "60", name: "First Half 1X2"},
    ]

    const filterMarkets = (marketId) => {
        let url = new URL(window.location.href)
        url.searchParams.set('sub_type_id', marketId)
        window.location.href = url
    }

    return (
        <>
            <div className="col-md-12 shadow-sm text-white d-flex justify-content-end h-100 p-0">
                <button className={'bg-dark rounded btn-outline-dark text-white align-self-end h-100 hover-none'}
                        onClick={() => setShowFilters(true)}>
                    <FontAwesomeIcon icon={faFilter}/> Filter Markets <FontAwesomeIcon icon={faAngleDown}/>
                </button>
            </div>
            <Modal show={showFilters} onHide={handleClose}
                   className={'shadow-lg filters-modal'}
                   dialogClassName={'modal-50w'}
                   centered={true}
                   size={"sm"}
                   backdrop={"static"}
                   style={{zIndex: "9999"}}>
                <Modal.Header closeButton={false}>
                    <Modal.Title>Filter Markets</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={'d-flex flex-column p-2'}>
                        {markets.map((market, index) => (
                            <div className={'p-2 cursor-pointer market-item'} onClick={() => filterMarkets(market.id)}>
                                {market.name}
                            </div>
                        ))}
                    </div>

                </Modal.Body>
                <Modal.Footer className={'text-center'}>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default MarketFilter