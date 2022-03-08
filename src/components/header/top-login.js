import React, {useState, useEffect, useContext} from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import {useFormik, Formik, Field, Form} from 'formik';
import makeRequest from "../utils/fetch-request";
import {Context} from '../../context/store';

const HeaderLogin = (props) => {

    const [state, dispatch] = useContext(Context);
    const [isLoading, setLoading] = useState(false)
    const [user, setUser] = useState(localStorage.getItem('auth_token'))
    const [loginErrors, setLoginError] = useState('')

    const initialValues = {
        username:"",
        password:""
    }

    const validate = values=>{
        let errors = {}
        if(!values.username){
            errors.username = "Username is required."
        }
        if(!values.password){
            errors.password = "Password is required."
        }
        return errors
    }
    const onSubmit = values=>{
        let endpoint = '/v1/login'
        setLoading(isLoading=>true)

        makeRequest({url: endpoint, method: 'POST', data: values}).then((response) => {
            setLoading(false)
            let [loginStatus, loginResponseBody] = response

            if(loginStatus===401){
                setLoginError(loginResponseBody.message)
            }
            
            if(loginStatus===200){
                // user authenticated ...
                localStorage.setItem('auth_token',loginResponseBody.token)
                window.reload()
                
            }
            
        })
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    useEffect(()=>{

    },[isLoading])

    return (
        <Container >
           <Row className="" style={{float:"right", marginRight:"15px"}}>
                <div className="col-12">
                    <a className="" href="/signup" title="Join now">
                        <span className="">Register now!</span>
                    </a>
                </div>
           </Row>
           <Row style={{float:"right"}} >
             <form className="ow og i web-element" onSubmit={formik.handleSubmit}>
             <Row>
                    <div className="col-5">
                        <input type="text" name="username" className="form-control"
                            data-action="grow" placeholder="+254........."
                               onChange={formik.handleChange}
                               value={formik.values.username}
                               onBlur={formik.handleBlur}
                        />
                        {formik.errors.username ?
                            <div
                                className='text-danger'>
                                {formik.touched.username && formik.errors.username}
                            </div> : ''
                        }
                        <br/>
                        <span className="sticky-hidden">
                            <label><input type="checkbox" name="remember" value="1" />Remember me</label>
                        </span>
                    </div>
                    <div className="col-5">
                    <input type="password" name="password" className="form-control"
                        data-action="grow" placeholder="Password"
                           onChange={formik.handleChange}
                           value={formik.values.password}
                           onBlur={formik.handleBlur}
                    />
                        {formik.errors.password ?
                            <div
                                className='text-danger'>
                                {formik.touched.password && formik.errors.password}
                            </div> : ''
                        }
                    <br/>
                    <input type="hidden" name="ref" value="{props.refURL}" />
                    <a href="/reset/password" title="Reset password">
                        <span className="sticky-hidden">Forgot Password?</span>
                    </a>
                    </div>
                    <div className="col-sm-2">
                        <button className="cg fp ">
                            {isLoading?<span>Logging In ...</span>:<span>Login</span>}
                        </button>
                    </div>
                </Row>
                 {loginErrors?<span className='text-danger'>{loginErrors}</span>:<span></span>}
            </form>
           </Row>
        </Container >
    )
}
export default HeaderLogin;
