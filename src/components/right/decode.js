import React, {useEffect, useRef, useState} from 'react';
import makeRequest from "../utils/fetch-request";
import {addToSlip} from "../utils/betslip";
import Notify from "../utils/Notify";
import {Spinner} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShare} from "@fortawesome/free-solid-svg-icons";
import {setLocalStorage} from "../utils/local-storage";


const DecodeCode = () => {
    // const [betslipData, setBetslipShare] = useState({})
    const inputRef = useRef(null);
    useEffect(() => {
        inputRef.current = document.getElementById("code");
    }, []);
    const [loading, setLoading] = useState(false)
    const [code, setCode] = useState("")
    const handleChanges = (e) => {
        e.preventDefault()
        setCode(e.target.value);
    }

    const handleslip = async (share_code) => {

        let endpoint = "/v1/bs-decode"

        let data = {
            "betslip_share_code": share_code
        }
        setLoading(true)
        await makeRequest({url: endpoint, method: "POST", data: data}).then(([status, result]) => {


            if (status == 200) {
                Object.entries(result?.success).map(([match_id, match]) => {
                    match.live = Number(match?.live) !== 0
                    match.bet_type = String(match?.bet_type)
                    addToSlip(match)
                })

                setLocalStorage('betslip_share_code', share_code)
                window.location.href = "/"

            } else {
                Notify(
                    {status: 400, message: result?.error, token: ""}
                )

            }
            setLoading(false)

        })

    }


    return (

        <React.Fragment>
            <div className=" ">
                <div className="card card-radius profile-bg text-light p-0 mt-2">
                    <div className="card-body p-3" style={{overflow: "hidden"}}>
                        <form>
                            <div className="form-group row d-flex justify-content-center ">
                                <div className="col-md-12">
                                    <label className={"text-bold h4 text-center mb-4"}> Enter betslip share code to load
                                        betslip </label>
                                    <div className={"d-flex flex-column"}>
                                        <input
                                            className="text-dark deposit-input form-control col input-field-decode"
                                            id="code"
                                            ref={inputRef}
                                            onChange={(e) => handleChanges(e)}
                                            name="code"
                                            type="text"
                                            value={code}
                                            style={{borderRadius: "0.3rem"}}
                                            autoFocus={true}
                                            placeholder='eg. PWXfsxR'
                                        />
                                        <div className="form-group row d-flex justify-content-left col mt-4"
                                             style={{whiteSpace: "nowrap"}}>
                                            <div className=" d-flex align-items-start">
                                                <button type={"button"} onClick={() => handleslip(code)}
                                                        className='btn btn-lg  w-100 deposit-withdraw-button text-white d-flex align-items-center justify-content-center'
                                                        style={{backgroundColor: "#FFC107", borderRadius: "0.3rem"}}>
                                                    <strong>
                                                        LOAD SLIP
                                                    </strong>&nbsp;
                                                    {loading && <div className={` text-white d-block`}>
                                                        <Spinner animation={'grow'} size={'sm'}/>
                                                    </div>}
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

export default React.memo(DecodeCode);