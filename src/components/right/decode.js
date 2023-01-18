import React, {useEffect, useRef, useState} from 'react';
import makeRequest from "../utils/fetch-request";
import {addToSlip} from "../utils/betslip";



const DecodeCode = () => {
    // const [betslipData, setBetslipShare] = useState({})
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current = document.getElementById("code");
    }, []);

    const [code, setCode]=useState("")
    const handleChanges = (e) => {
        e.preventDefault()
        setCode( e.target.value);
    }

    const handleslip = async (share_code) => {

        let endpoint = "/v1/bs-decode"
        console.log("data_slip", share_code)

        let data = {
            "betslip_share_code": share_code
        }

        await makeRequest({url: endpoint, method: "POST", data: data}).then(([status, result]) => {
            // console.log(result?.success)
            Object.entries(result?.success).map(([match_id, match]) => {
                match.live = Number(match?.live) !== 0
                match.bet_type = String(match?.bet_type)
                addToSlip(match)
            })

            // setLocalStorage('betslip', (result?.success), 1 * 60 * 60 * 1000);
        }).then(()=>{
            window.location.href="/"
        })

    }




    return (

        <React.Fragment>
            <div className=" ">
                <div className="card card-radius profile-bg text-light p-0">
                    <div className="card-body p-0" style={{overflow:"hidden"}}>
                        <form  >
                            <div className="form-group row d-flex justify-content-center ">
                                <div className="col-md-12">
                                    <label className={"text-bold"}> Do you have a shared betslip code? Enter it here. </label>
                                    <div className={"d-flex"}>
                                        <input
                                            className="text-dark deposit-input form-control w-75 input-field"
                                            id="code"
                                            ref={inputRef}
                                            onChange={(e)=>handleChanges(e)}
                                            name="code"
                                            type="text"
                                            value={code}
                                            autoFocus={true}
                                            placeholder='eg. PWXfsxR'
                                        />
                                        <div className="form-group row d-flex justify-content-left " style={{whiteSpace:"nowrap"}}>
                                            <div className=" d-flex align-items-start">
                                                <button type={"button"} onClick={()=>handleslip(code)}
                                                        className='btn btn-lg btn-primary  w-100 deposit-withdraw-button' >
                                                    Load Slip
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default DecodeCode;