import React from 'react'
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

const HeaderLogin = (props) => {
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
             <form action="/login/authenticate" className="ow og i web-element"  
                method="post" >
                <Row>
                    <div className="col-5">
                        <input type="text" name="mobile" className="form-control" 
                            data-action="grow" placeholder="+254........." />
                        <br/> 
                        <span className="sticky-hidden">
                            <label><input type="checkbox" name="remember" value="1" />Remember me</label>
                        </span>
                    </div>
                    <div className="col-5">
                    <input type="password" name="password" className="form-control" 
                        data-action="grow" placeholder="Password" />
                    <br/>
                    <input type="hidden" name="ref" value="{props.refURL}" />
                    <a href="/reset/password" title="Reset password">
                        <span className="sticky-hidden">Forgot Password?</span>
                    </a>
                    </div>
                    <div className="col-sm-2">
                        <button className="cg fp ">Login</button>
                    </div>
                </Row>
            </form>
           </Row>
        </Container >
    )
}
export default HeaderLogin;
