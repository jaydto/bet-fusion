import {useEffect, useState} from "react";
import makeRequest from "../utils/fetch-request";
import {useParams} from "react-router-dom";
import {setLocalStorage} from "../utils/local-storage";
import {addToSlip} from "../utils/betslip";

const BetslipShareDecode = () => {

    const [betslipData, setBetslipShare] = useState({})

    const {share_code} = useParams()

    const getBetslip = async () => {

        let endpoint = "/v1/bs-decode"

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