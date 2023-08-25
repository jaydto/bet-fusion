import React, {useEffect} from "react";
import makeRequest from "../utils/fetch-request";
import {addToSlip} from "../utils/betslip";

const BetslipShareDecode = React.memo(
    () => {

        const url = new URL(window.location)
        let share_code = url.searchParams.get('share_code')

        const getBetslip = async () => {

            let endpoint = "/v1/bs-decode"

            let data = {
                "betslip_share_code": share_code
            }

            await makeRequest({url: endpoint, method: "POST", data: data}).then(([status, result]) => {

                Object.entries(result?.success).map(([match_id, match]) => {
                    match.live = Number(match?.live) !== 0
                    match.bet_type = String(match?.bet_type)
                    addToSlip(match)
                })

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
    })

export default BetslipShareDecode