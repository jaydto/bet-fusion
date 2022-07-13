import React from "react";
import { faUser, faLock, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utils/betslip";
import { Link } from "react-router-dom";

const ProfileMenu = (props) => {
  const { user } = props;
  return (
    <>
      {user && (
        <div className="ale ss profile d-flex flex-row row disable-ipad tablet-design ">
            <div className="{'mt-1'} col-md-3 d-flex flex-column justify-content-end w-change1">
            <Link
              to={{ pathname: "/deposit" }}
              className={"btn text-white btn-outline-warning "}
            >
              <span className="font-tbt">
                <FontAwesomeIcon icon={faCoins} /> Deposit Funds
              </span>
            </Link>
          </div>
          <div className="col-md-3  d-flex flex-column right justify-content-end w-change1">
            <div className="nav-options-finance w-100  ">
              <Link to={{ pathname: "/withdraw" }} className={"btn text-white w-100 d-content"}>
                <span className="font-tbt ">
                  <FontAwesomeIcon icon={faCoins} /> Withdraw
                </span>
              </Link>
              <Link to={{ pathname: "/my-bets" }} className={"btn text-white w-100 d-content"}>
                <span className="font-tbt pad-2 ">
                  <FontAwesomeIcon icon={faCoins} /> My Bets
                </span>
              </Link>
            </div>
          </div>
         

          <div className="col-md-3 d-flex flex-column right justify-content-end w-change2">
            <div className="nav-options-finance ">
              <span className="font-tbt">Balance KES {formatNumber(user.balance) || 0} </span>
              <span className="font-tbt">Bonus KES {formatNumber(user.bonus) || 0} </span>
            </div>
          </div>

          <div className="col-md-3 d-flex flex-column nav-option-content w-change2">
            <div>
              <span className="font-tbt">
                <FontAwesomeIcon icon={faUser} /> {user?.msisdn}
              </span>
            </div>
            <div>
              <a href="/logout">
                <span className="font-tbt">
                  <FontAwesomeIcon icon={faLock} /> Logout
                </span>
              </a>
            </div>
          </div>

        
        </div>
      )}
    </>
  );
};

export default ProfileMenu;
