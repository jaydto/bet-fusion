import React, {useState, useEffect, useContext, useCallback} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { Formik, Field, Form } from 'formik';
import makeRequest from "../utils/fetch-request";
import { Context } from '../../context/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setLocalStorage } from '../utils/local-storage';

const HeaderLogin = (props) => {
    console.log("This is a re render ...");
    const [state, dispatch] = useContext(Context);
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState(localStorage.getItem('auth_token'))

    const [message, setMessage] = useState(null);

    const initialValues = {
        msisdn:"",
        password:""
    }

    const Notify = (message) => {
        let options =  { 
           position: "top-right", 
           autoClose: 5000, 
           hideProgressBar: true, 
           closeOnClick: true, 
           pauseOnHover: true, 
           draggable: true, 
           progress: undefined, 
           toastId:673738 /* this is hack to prevent multiple toasts */
        }
        if(message.status == 200){
           toast.success(`🚀 ${message.message}`,options);
        } else {
           toast.error(`🦄 ${message.message}`,options);
        }

    };

    const dispatchUser = useCallback(() => {
       if(message !== null) {
           console.log("message is not null", message)
           Notify(message);

           if( message.status == 200 ) {
               setLocalStorage('user', message.user);
               dispatch({type:"SET", key:"user", payload:message.user});
           }
       }
    }, [message])

    useEffect(() => {
        console.log("Dispatching login success message");
        dispatchUser();
    }, [dispatchUser]);

    const handleSubmit = values => {
        console.log("Form Data posting to api", values)
        let endpoint = '/v1/login';
        makeRequest({url: endpoint, method: 'POST', data: values}).then(([status, response]) => {
            setMessage(response);
        })
    }


    const validate = values => {

        let errors = {}

        if (!values.msisdn || !values.msisdn.match(/(254|0|)?[71]\d{8}/g) ) {
            errors.msisdn = 'Invalid phone number'
        }

        if (!values.password || values.password.length < 4) {
            errors.password = "Invalid password";
        }

        return errors
    }


    const NotifyToastContaner = () => {
       return <ToastContainer
                   position="top-right"
                   autoClose={5000}
                   hideProgressBar={false}
                   newestOnTop={false}
                   closeOnClick
                   rtl={false}
                   pauseOnFocusLoss
                   draggable
                   pauseOnHover
                   />
    };

    const MyLoginForm = (props) => {
        const {isValid, errors, values, submitForm, setFieldValue } = props;

        const onFieldChanged = (ev)=>{
            let field = ev.target.name;
            let value = ev.target.value;
            setFieldValue(field, value);
        }
        return (
           <>
           <NotifyToastContaner />
           <Form className="ow og i web-element" >
               <Row>
                    <div className="col-5">
                        <input type="text" 
                            name="msisdn" 
                            className={`form-control ${ errors.msisdn && 'text-danger' }` }
                            data-action="grow" 
                            placeholder={ errors.msisdn || "+254........." }
                            onChange={ev => onFieldChanged(ev)}
                            value={values.msisdn}
                        />
                        <br/>
                        <span className="sticky-hidden">
                            <label><input type="checkbox" name="remember" value="1" />Remember me</label>
                        </span>
                    </div>
                    <div className="col-5">
                       <input type="password" 
                           name="password" 
                           className={ `form-control ${ errors.password && 'text-danger'} ` }
                           data-action="grow" 
                           placeholder={ errors.password || "Password" }
                           onChange={ev => onFieldChanged(ev)}
                           value={ values.password}
                           />
                       <br/>
                       <input type="hidden" name="ref" value="{props.refURL}" />
                       <a href="/reset/password" title="Reset password">
                           <span className="sticky-hidden">Forgot Password?</span>
                       </a>
                    </div>
                    <div className="col-sm-2">
                        <button className="cg fp " type="submit" >
                            { isLoading ? <span>Logging In ...</span>:<span>Login</span>}
                        </button>
                    </div>
                </Row>
             </Form>
             </>
        );
    }

    const LoginForm = (props) => {
        return (
             <Formik
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validateOnChange={false}
                validateOnBlur={false}
                validate={validate}
                >{(props) => <MyLoginForm {...props} />  }</Formik> 
            );
    }

    return (
        <Container >
           <Row className="" style={{float:"right", marginRight:"15px"}}>
                <div className="col-12">
                    <a className="" href="/signup" title="Join now">
                        <span className="register-label">Register now!</span>
                    </a>
                </div>
           </Row>
           <Row style={{float:"right"}} >
               <LoginForm />
           </Row>
        </Container >
    )
}
export default HeaderLogin;
