import React, {useCallback, useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {Button, Form} from "react-bootstrap";
import whatsap from "../../assets/svg/whatsapp.svg"
import {LazyLoadImage} from 'react-lazy-load-image-component';
import Notify from "../utils/Notify";
import makeRequest from "../utils/fetch-request";
import { ToastContainer } from "react-toastify";
import {clearTrackingData, setLocalStorage, setTrackingData} from '../utils/local-storage';
import { Navigate } from "react-router-dom";

const RegisterModal = (props) => {
    const {visible,  setShowRegisterModal, location} = props
    const [isOpen, setIsOpen] = useState(visible)
    const [message, setMessage] = useState(null);
    const [formData, setFormData] = useState({});
    const [errors,setErrors]=useState(null)
    
    const hideModal = () => {
        setIsOpen(false)
        setShowRegisterModal(false)
        // setLocalStorage("share-modal",0)
        // console.log("share_from_modal",getFromLocalStorage("share-modal"))
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
        setErrors(validate({ ...formData, [name]: value }));
      };
      
      const dispatchUser = useCallback(() => {
        console.log("here user")
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

    const [success, setSuccess] = useState(false);


    const initialValues = {
        msisdn: '',
        password: ''
    }

    const handleSubmit =async (event) => {
        event.preventDefault();
        const formErrors = validate(formData);
        if (Object.keys(formErrors).length === 0) {
        let endpoint = '/v1/signup'

        setTrackingData(formData)

        makeRequest({url: endpoint, method: 'POST', data: formData}).then(([status, response]) => {
            setSuccess(status === 200 || status === 201);
            setMessage(response?.success?.message || "");
            if (formData.utm_source !== undefined) {
                if (formData.utm_source === 'eskimi') {
                    window.esk('track', 'Conversion');
                }
                if (formData.utm_source === 'google') {
                    window.gtag_report_conversion(window.location)
                }
            }
            clearTrackingData()
            let timer = setInterval(() => {
                // window.location.href = "/"
                clearInterval(timer)
            }, 3000)
        })}else{
            setErrors(formErrors);
        }
    }

    const validate = (values) => {
        let errors = {};

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g)) {
            errors.msisdn = "Please enter a valid phone number";
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Please enter four or more characters for password";
        }

        return errors;
    };
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
            <Modal.Header closeButton={false} className={"w-100"} style={{borderBottom:"0px"}}>
                <Modal.Title className={"w-100"}>
                    <div className={"d-flex justify-content-between align-items-center"}>
                        <strong style={{width:"100%", textAlign:"center", fontSize:"19px", fontWeight:"bolder", letterSpacing:"2px"}}>REGISTER</strong>
                        
                    </div>

                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{borderBottom:"0px", paddingTop:"4px", paddingBottom:"0px"}}>
            
            <Form >
            <Form.Group className="mb-3 " controlId="Form.ControlInput1">
              <Form.Label>Phone Number</Form.Label>
                {errors?.msisdn && <div className='text-danger'> {errors?.msisdn} </div>}
              <Form.Control
                type="text"
                name="msisdn"
                placeholder="+254........."
                style={{padding:"6px"}}
                value={formData.msisdn || ''}
                onChange={handleChange}
                autoFocus
                />

              { console.log("here modal 2", visible)}
            </Form.Group>
             <Form.Group className="mb-3" controlId="Form.ControlInput2">
              <Form.Label>Password</Form.Label>
                 {errors?.password && <div className='text-danger'> {errors?.password} </div>}
              <Form.Control
                type="password"
                placeholder="password"
                name="password"
                value={formData.password || ''}
                style={{padding:"6px"}}
                onChange={handleChange}
               

              />
            </Form.Group>
          </Form>

            </Modal.Body>
            <Modal.Footer className={'text-center  d-flex '} style={{borderTop:"0px", width: "98%"}}>
                <Button variant="secondary" onClick={hideModal} className={"col "} style={{padding:"7px", fontSize:"12px"}}>
                    Close
                </Button>
                <Button type="submit" onClick={handleSubmit} className={" col btn btn-warning "} style={{padding:"7px",  fontSize:"12px"}}>REGISTER</Button>
            </Modal.Footer>
        </Modal>
        </>

    );
};
export default RegisterModal