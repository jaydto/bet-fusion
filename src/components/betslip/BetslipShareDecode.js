import {useEffect, useState} from "react";
import makeRequest from "../utils/fetch-request";
import {useParams} from "react-router-dom";
import {setLocalStorage} from "../utils/local-storage";
import {addToSlip} from "../utils/betslip";
import Notify from "../utils/Notify";

const BetslipShareDecode = () => {

    const [betslipData, setBetslipShare] = useState({})

    const url = new URL(window.location)
    let share_code= url.searchParams.get('share_code')

    const getBetslip = async () => {

        let endpoint = "/v1/bs-decode"

        let data = {
            "betslip_share_code": share_code
        }
        let message={status: 401, message: 'Kindly check your slip and try again', token: ''}
        await makeRequest({url: endpoint, method: "POST", data: data}).then(([status, result]) => {
            // console.log(result?.success)
            if(status==200){
                Object.entries(result?.success).map(([match_id, match]) => {
                    match.live = Number(match?.live) !== 0
                    match.bet_type = String(match?.bet_type)
                    addToSlip(match)
                })
                // setLocalStorage('betslip', (result?.success), 1 * 60 * 60 * 1000);
            }else{
                setLocalStorage("betslip-share-code-invalid",message)
            }

        });
    }

    useEffect(() => {
        getBetslip().then(() => {
            window.location.href = '/'
        })
    })
    return (
        <>
            Decoding ...
        </>
    )
}

export default BetslipShareDecode