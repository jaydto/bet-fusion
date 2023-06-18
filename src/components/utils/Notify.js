import {toast} from "react-toastify";
import fire from  "../../assets/img/fire.webp"
import React from "react";
const Notify =
    (message) => {
    let options = {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId: 673738 /* this is hack to prevent multiple toasts */
    }
    if (message.status === 200) {
        toast.success(`🚀 ${message.message}`, options);
    } else {
        toast(<div className={"d-flex"}>
            <img src={fire} alt="" height="24px"/>
            <span>
                {message.message}
            </span>
        </div>, options);
    }

};

export default Notify