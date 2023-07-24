import React, {useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


const ExclusionModal = React.memo(
    (props) => {
        const {visible, setShowLoadingModal, message} = props
        const [isOpen, setIsOpen] = useState(visible)
        const navigate = useNavigate()

        const hideModal = () => {
            setIsOpen(false)
            setShowLoadingModal(false)
            navigate('/logout')
            // setLocalStorage("share-modal",0)
            // console.log("share_from_modal",getFromLocalStorage("share-modal"))
        }
        const handleExit = () => {
            navigate('/logout')
        }

        return (
            <Modal show={isOpen}
                   className={'shadow-lg filters-modal exclude'}
                   dialogClassName={'modal-50w'}
                   centered={true}
                   size={"md"}
                   backdrop={"static"}
                   style={{zIndex: "9999"}}>
                <Modal.Header closeButton={false} className={"w-100"}>
                    <Modal.Title className={"w-100"}>
                        <div className={"d-flex justify-content-between align-items-center"}>
                            <strong style={{width: "90%"}}></strong>

                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className={"d-flex"}>
                        <div className="col-12 text-center mt-4 ">
                            <p>You are Currently Self Excluded from Betnare </p>
                            <p>{message}</p>
                        </div>

                    </div>

                </Modal.Body>
                <Modal.Footer className={'text-center  d-flex '} style={{borderTop: "0px", width: "98%"}}>
                    <Button variant="secondary" onClick={hideModal} className={"col "}
                            style={{padding: "7px", fontSize: "12px"}}>
                        Close
                    </Button>
                    <Button type="submit" onClick={handleExit} className={" col btn btn-warning "}
                            style={{padding: "7px", fontSize: "12px"}}>Done</Button>
                </Modal.Footer>
            </Modal>

        );
    });
export default React.memo(ExclusionModal)