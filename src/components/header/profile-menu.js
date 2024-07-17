import React, { useEffect, useState } from "react";
import {
    faBook,
    faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utils/betslip";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "../../redux/dataSlice";
import { getFromLocalStorage } from "../utils/local-storage";
import DepositTriggerButton from "./depositButton";

const ProfileMenu = React.memo((props) => {
    const { profile } = props;
    const userData = useSelector((state) => state.auth.user);
    const show = useSelector((state) => state.data.show_menu);
    const showDepositModal = useSelector((state) => state.data.show_deposit_modal);
    const dispatchRedux = useDispatch();

    const handleShow = () => {
        dispatchRedux(setState({ key: 'show_menu', value: true }));
    };

    const handleClose = () => {
        dispatchRedux(setState({ key: 'show_menu', value: false }));
    };

    const toggle = () => {
        show ? handleClose() : handleShow();
    };

    const [user, setUser] = useState(() => getFromLocalStorage("user"));

    useEffect(() => {
        if (userData) {
            setUser(userData || getFromLocalStorage("user"));
        }
    }, [userData]);

    const urlPath = window.location.pathname;
    const showBalance = (!urlPath.includes("nare-games") && !urlPath.includes("gameplay") && !urlPath.includes("smart-play"));

    return (
        <>
            {user && (
                <>
                    <div className="row w-100 d-flex align-items-center justify-content-end px-3 ">
                        {showBalance && !profile &&
                            <div className="w-auto d-flex text-white align-items-end" title={'CASH'}>
                                <div className={"profile-wrap text-muted-1"}>
                                    <strong> KSH {formatNumber(user?.balance) || 0.0}</strong>
                                </div>
                            </div>
                        }

                        <div className="w-auto d-flex text-white align-items-start">
                            <div className={"profile-wrap text-muted-1"}>
                                <Link
                                    to={"/bet-history?competition_id=2"}
                                    style={{ fontSize: "14px" }}
                                    title={'MY BETS'}>
                                    <span className="text-muted-1">
                                        <span className="text-muted-1"> <FontAwesomeIcon icon={faBook} /></span>
                                        <strong> My Bets</strong>
                                    </span>
                                </Link>
                            </div>
                        </div>
                        <div className="w-auto d-flex text-white align-items-end text-muted-1" title={'PROFILE'}>
                            {!profile && <Link className={"profile-wrap"} to={'/profile'}>
                                <div className="font-btn text-muted-1">
                                    <div className="space-icons text-muted-1">
                                        <FontAwesomeIcon icon={faUserAlt} />
                                    </div>
                                    <strong>Profile</strong>
                                </div>
                            </Link>}
                        </div>

                        <DepositTriggerButton
                            isOpen={showDepositModal}
                            setIsOpen={(isOpen) => dispatchRedux(setState('show_deposit_modal',isOpen ))}
                        />
                    </div>
                </>
            )}
        </>
    );
});

export default React.memo(ProfileMenu);
