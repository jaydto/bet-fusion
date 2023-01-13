import React, {useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button} from "react-bootstrap";

const BetslipShareModal = (props) => {
    const {visible, payload} = props
    const [isOpen, setIsOpen] = useState(false)
    const copyLink = useRef()
    const hideModal = () => {
        setIsOpen(false)
    }
    useEffect(() => {
        setIsOpen(visible === 1)
    }, [visible])

    const copyText = () => {
        if ('clipboard' in navigator) {
            return navigator.clipboard.writeText(payload?.success);
        } else {
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
                <div className="col-md-12 text-center mt-4">
                    <button className={'col-md-6 rounded-2 btn bg-warning btn-lg'} onClick={() => copyText()}>
                        <strong>Copy Link</strong>
                    </button>
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