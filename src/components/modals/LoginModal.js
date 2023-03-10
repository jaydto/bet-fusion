import React, {useCallback, useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import Notify from "../utils/Notify";
import makeRequest from "../utils/fetch-request";
import {ToastContainer} from "react-toastify";
import {setLocalStorage} from '../utils/local-storage';
import {Navigate} from "react-router-dom";

const LoginModal = (props) => {
    const {visible, setShowLoadingModal, location} = props
    const [isOpen, setIsOpen] = useState(visible)
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({});

    const hideModal = () => {
        setIsOpen(false)
        setShowLoadingModal(false)
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const dispatchUser = useCallback(() => {
        if (message !== null) {
            Notify(message);

            if (message.status == 200) {
                setLocalStorage('user', message.user);


            }

        }
    }, [message])

    useEffect(() => {
        dispatchUser();
    }, [dispatchUser]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        let endpoint = '/v1/login';

        makeRequest({url: endpoint, method: 'POST', data: formData}).then(([status, response]) => {


            if (status === 200 || status == 201 || status == 204) {
                setMessage(response);
                setIsOpen(false);
                setShowLoadingModal(false);
                window.location.href = location != null ? `${location}` : `/`
            } else {
                let message = {
                    status: status,
                    message: response?.message || "Error attempting to login"
                };
                Notify(message);


            }
        })
    }
    return (
        <>
            <ToastContainer/>
            <Modal show={isOpen}
                   className={'shadow-lg filters-modal'}
                   dialogClassName={'modal-50w'}
                   centered={true}
                   size={"md"}
                   backdrop={"static"}
                   style={{zIndex: "9999"}}>
                <Modal.Header closeButton={false} className={"w-100"} style={{borderBottom: "0px"}}>
                    <Modal.Title className={"w-100"}>
                        <div className={"d-flex justify-content-between align-items-center"}>
                            <strong style={{
                                width: "100%",
                                textAlign: "center",
                                fontSize: "19px",
                                fontWeight: "bolder",
                                letterSpacing: "2px"
                            }}>LOGIN</strong>

                        </div>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{borderBottom: "0px", paddingTop: "4px", paddingBottom: "0px"}}>

                    <Form>
                        <Form.Group className="mb-3 " controlId="Form.ControlInput1">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="msisdn"
                                placeholder="+254........."
                                style={{padding: "6px"}}
                                value={formData.msisdn || ''}
                                onChange={handleChange}
                                autoFocus
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="Form.ControlInput2">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="password"
                                name="password"
                                value={formData.password || ''}
                                style={{padding: "6px"}}
                                onChange={handleChange}


                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer className={'text-center  d-flex '} style={{borderTop: "0px", width: "98%"}}>
                    <Button variant="secondary" onClick={hideModal} className={"col "}
                            style={{padding: "7px", fontSize: "12px"}}>
                        Close
                    </Button>
                    <Button type="submit" onClick={handleSubmit} className={" col btn btn-warning "}
                            style={{padding: "7px", fontSize: "12px"}}>Login</Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};
export default LoginModal