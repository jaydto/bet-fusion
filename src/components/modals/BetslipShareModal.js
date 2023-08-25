import React, {useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";
import whatsap from "../../assets/img/mobile/whatsapp.svg"
import {LazyLoadImage} from 'react-lazy-load-image-component';

const BetslipShareModal = React.memo(
    (props) => {
    const {visible, payload, setShowShareModal} = props
    const [isOpen, setIsOpen] = useState(visible)
    const [copy,setCopy]=useState(false)
    const copyLink = useRef()
    const hideModal = () => {
        setIsOpen(false)
        setShowShareModal(false)
        // setLocalStorage("share-modal",0)
        // console.log("share_from_modal",getFromLocalStorage("share-modal"))
    }


    const copyText = () => {
        if ('clipboard' in navigator) {
            setCopy(true)
            return navigator.clipboard.writeText(payload?.success);

        } else {
            setCopy(true)
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
            <Modal.Header closeButton={false} className={"w-100"}>
                <Modal.Title className={"w-100"}>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <strong style={{width:"90%"}}>Share Link</strong>
                        <div className="col-1 text-center  ">

                            <a href={"https://wa.me/?text="+payload?.success} className={"bg-warning"} target={"_blank"} rel="noreferrer">
                                <LazyLoadImage src={whatsap} style={{height:"30px"}}/>

                            </a>
                        </div>
                    </div>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className={'d-flex flex-column '}>
                    <input type="text" value={payload?.success} id="shareurl" readOnly={"readonly"}
                           className={'form-control'} style={{height: "40px"}} ref={copyLink}/>

                </div>
                <div className={"d-flex"}>
                    <div className="col-12 text-center mt-4 ">
                        <button className={'w-100 rounded-2 btn bg-warning btn-lg'} onClick={() => copyText()}>
                            {copy?<strong className="bold ">Link Copied!</strong>:<strong>Copy Link</strong>}
                        </button>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer className={'text-center modal-width'}>
                <Button variant="secondary" onClick={hideModal} className={"w-25"}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>

    );
});
export default React.memo(BetslipShareModal);