import React, {useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

import {getFromLocalStorage, setLocalStorage} from "../utils/local-storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from "react-router-dom";

const BetslipShareModal = (props) => {
    const {visible, payload, setShowShareModal} = props
    const [isOpen, setIsOpen] = useState(visible)
    const [copy,setCopy]=useState(0)
    const copyLink = useRef()
    const hideModal = () => {
        setIsOpen(false)
        setShowShareModal(0)
        // setLocalStorage("share-modal",0)
        // console.log("share_from_modal",getFromLocalStorage("share-modal"))
    }


    const copyText = () => {
        if ('clipboard' in navigator) {
            setCopy(1)
            return navigator.clipboard.writeText(payload?.success);

        } else {
            setCopy(1)
            return document.execCommand('copy', true, payload?.success);
        }
    }
    return (
        <Modal show={isOpen}
               className={'shadow-lg filters-modal'}
               dialogClassName={'modal-50w'}
               centered={true}
               size={"md"}
               backdrop={"static"}
               style={{zIndex: "9999"}}>
            <Modal.Header closeButton={false}>
                <Modal.Title>
                    <strong>Share Link</strong>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={'d-flex flex-column p-2'}>
                    <input type="text" value={payload?.success} id="shareurl" readOnly={"readonly"}
                           className={'form-control'} style={{height: "40px"}} ref={copyLink}/>
                </div>
                <div className={"d-flex"}>
                    <div className="col text-center mt-4 ">
                        <button className={'col-md-6 rounded-2 btn bg-warning btn-lg'} onClick={() => copyText()}>
                            {copy?<strong className="bold ">Link Copied!</strong>:<strong>Copy Link</strong>}
                        </button>
                    </div>
                    <div className="col text-center mt-4 ">

                        <a href={"https://wa.me/?text="+payload?.success} className={"bg-warning"} target={"_blank"}>
                            <button className={'col-md-6 rounded-2 btn bg-warning btn-lg'} >
                                    Whatsap<FontAwesomeIcon icon="fab fa-whatsapp" />
                            </button>
                        </a>
                    </div>
                </div>

            </Modal.Body>
            <Modal.Footer className={'text-center'}>
                <Button variant="secondary" onClick={hideModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
};
export default BetslipShareModal