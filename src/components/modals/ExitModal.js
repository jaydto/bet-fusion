import React, {useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import { Clipboard } from '@capacitor/clipboard';
import {Capacitor} from "@capacitor/core";
import { removeItem } from "../utils/local-storage";
import { App } from "@capacitor/app";


const ExitModal = (props) => {
    const {visible, setShowLoadingModal} = props
    const [isOpen, setIsOpen] = useState(visible)
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({});
    
    const hideModal = () => {
        setIsOpen(false)
        setShowLoadingModal(false)
        // setLocalStorage("share-modal",0)
        // console.log("share_from_modal",getFromLocalStorage("share-modal"))
    }
    const handleExit=()=>{
        removeItem('firstLaunch');
        App.exitApp()
    }
   
    return (
        <Modal show={isOpen}
               className={'shadow-lg filters-modal'}
               dialogClassName={'modal-50w'}
               centered={true}
               size={"md"}
               backdrop={"static"}
               style={{zIndex: "9999"}}>
            <Modal.Header closeButton={false} className={"w-100"}>
                <Modal.Title className={"w-100"}>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <strong style={{width:"90%"}}>Exit App</strong>
                       
                    </div>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                
                <div className={"d-flex"}>
                    <div className="col-12 text-center mt-4 ">
                        <p>Are yous sure you want to exit this application?</p>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer className={'text-center  d-flex '} style={{borderTop:"0px", width: "98%"}}>
                <Button variant="secondary" onClick={hideModal} className={"col "} style={{padding:"7px", fontSize:"12px"}}>
                    Close
                </Button>
                <Button type="submit" onClick={handleExit} className={" col btn btn-warning "} style={{padding:"7px",  fontSize:"12px"}}>Exit</Button>
            </Modal.Footer>
        </Modal>

    );
};
export default ExitModal