import React  from 'react';


const QuickLogin = (props) => {
    return (
        <div id="quick-login">
            <form name="quick-login" method="post" action="/login" >
            <p>
                <label>Mobile Number *</label>
                <input className="form-control" name="msisdn" placeholder="0XXXXXXXXX" />
            </p>
            <p>
                <label>Password *</label>
                <input type="hidden" name="ref" value={props.refURL} />
                <input type="password" name="password" className="form-control" placeholder="password"/>
            </p>
            <div className="col-sm-12 zero-padding">
                <div className="col-sm-4 zero-padding">
                    <input type="submit" className="cg fm" value="Submit" />
                </div>
                <div className="col-sm-8 zero-padding"><a href="/signup">Join now</a></div>
            </div>
            </form>
        </div>
    )
}
export default React.memo(QuickLogin);
