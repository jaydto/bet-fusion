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
               className={'shadow-lg filters-modal deposit-modal deposit-modal-body'}
               dialogClassName={'modal-30w'}
               centered={true}
               size={"md"}
               backdrop={"static"}
               style={{zIndex: "9999"}}>
            <Modal.Header closeButton={false} className={"w-100"}>
                <Modal.Title className={"w-100"}>
                    <div className={"d-flex justify-content-between align-items-start flex-column px-4"}>
                        <div className="close-history-filter deposit-modal">
                            <input
                                id={"deposit"}
                                type="submit"
                                value="X"
                                onClick={hideModal}
                            />
                        </div>
                        <div className="drag-icon deposit-modal"><span></span></div>

                        <div className={'d-flex justify-content-between w-100 deposit-modal-top-title align-items-center'}>
                            <strong className={''}
                                    style={{width:"90%"}}>Share Link</strong>
                            <div className="col-1 d-flex align-items-center  ">

                                <a href={"https://wa.me/?text="+payload?.success} className={""} target={"_blank"} rel="noreferrer">
                                    <LazyLoadImage src={whatsap} style={{height:"30px"}}/>

                                </a>
                            </div>
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
                    <div className="col-12 text-center mt-5 ">
                        <button className={'w-100 rounded-2 btn bg-warning btn-lg py-3 button-text-choice1'} onClick={() => copyText()}>
                            {copy?<strong className="bold ">Link Copied!</strong>:<strong>Copy Link</strong>}
                        </button>
                    </div>

                </div>

            </Modal.Body>
            <Modal.Footer className={'text-center modal-width deposit-modal-footer'}>
                <Button className={'cancel-filter-markets bg-deposit-modal-btn'} onClick={hideModal} >
                    Cancel
                </Button>
            </Modal.Footer>
        </Modal>

    );
});
export default React.memo(BetslipShareModal);
