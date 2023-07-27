import React from "react";
import {Navigate} from "react-router-dom";
import {getFromLocalStorage, setLocalStorage} from './local-storage';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = React.memo(
    ({children}) => {

    const user = getFromLocalStorage("user");
    const path=window.location.pathname;
    setLocalStorage("ActiveLink", path)
    return user?.token ? children : <Navigate to="/login" />;
})

export default React.memo(ProtectedRoute);
