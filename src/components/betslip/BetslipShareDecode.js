import React, {useEffect} from "react";
import {matchesDecodeBet} from "../../redux/matchesSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const BetslipShareDecode = React.memo(
    () => {

        const url = new URL(window.location)
        let share_code = url.searchParams.get('share_code')
        const dispatchRedux=useDispatch()
        const navigate=useNavigate()

        const getBetslip = async () => {

            let data = {
                "betslip_share_code": share_code
            }
            dispatchRedux(matchesDecodeBet(data))

        }

        useEffect(() => {
            getBetslip().then(() => {
                navigate('/')
            })
        })
        return (
            <>
                Decoding ...
            </>
        )
    })

export default BetslipShareDecode