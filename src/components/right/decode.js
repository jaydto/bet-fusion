import React, {useEffect, useRef, useState} from 'react';
import Notify from "../utils/Notify";
import {useDispatch, useSelector} from "react-redux";
import {matchesDecodeBet} from "../../redux/matchesSlice";


const DecodeCode = React.memo(
    () => {
        const inputRef = useRef(null);
        useEffect(() => {
            inputRef.current = document.getElementById("code");
        }, []);
        const [code, setCode] = useState("")
        const dispatchRedux = useDispatch()
        const handleChanges = (e) => {
            e.preventDefault()
            setCode(e.target.value);
        }
        const share_bet=useSelector((state)=>state.matchesData.share_bet)
        const loading=useSelector((state)=>state.matchesData.loading_bet_history)

        const handleslip = async (share_code) => {
            let message = {status: 401, message: 'Betslip share code is required', token: ''}

            if (share_code === "") {
                return Notify(message)
            }

            let data = {
                "betslip_share_code": share_code
            }
            dispatchRedux(matchesDecodeBet(data))

        }
        useEffect(()=>{
            if(share_bet){
                window.location.reload()
            }

        },[share_bet])


        return (

            <React.Fragment>
                <div className=" ">
                    <div className="card card-radius decode-bg text-light p-0 mt-2">
                        <div className="card-body p-3" style={{overflow: "hidden"}}>
                            <form>
                                <div className="form-group w-100 d-flex justify-content-center ">
                                    <div className="col-md-12">
                                        <label className={"text-bold h4 text-center mb-4"}> Enter betslip share code to
                                            load
                                            betslip </label>
                                        <div className={"d-flex flex-column w-100"}>
                                            <input
                                                className="text-dark deposit-input form-control col input-field-decode w-100"
                                                id="code"
                                                ref={inputRef}
                                                onChange={(e) => handleChanges(e)}
                                                name="code"
                                                type="text"
                                                value={code}
                                                style={{borderRadius: "0.3rem"}}
                                                placeholder='eg. PWXfsxR'
                                            />
                                            <div className="form-group w-100 d-flex justify-content-left col mt-4"
                                                 style={{whiteSpace: "nowrap"}}>
                                                <div className=" d-flex align-items-start w-100">
                                                    <button type={"button"} onClick={() => handleslip(code)}
                                                            disabled={loading}
                                                            className='btn btn-lg  w-100 deposit-withdraw-button  d-flex align-items-center justify-content-center'
                                                            style={{
                                                                backgroundColor: "#FFC107",
                                                                borderRadius: "0.3rem",
                                                                position:'relative'
                                                            }}>
                                                        <strong>
                                                            {loading ? <span className="loader position-top-buttons"></span>:' LOAD SLIP'}
                                                        </strong>

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
    });

export default React.memo(DecodeCode);