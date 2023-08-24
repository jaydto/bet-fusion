import {toast} from "react-toastify";
import fire from "../../assets/svg/fire.svg"
import React from "react";
import {LazyLoadImage} from "react-lazy-load-image-component";

const Notify = (message) => {
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
            <LazyLoadImage src={fire} alt="" height="24px"/>
            <span>
                {message.message}
            </span>
        </div>, options);
    }

};

export default Notify