import React from "react";
import { Navigate } from "react-router-dom";
import { getFromLocalStorage } from './local-storage';
import 'react-toastify/dist/ReactToastify.css';

const ProtectedRoute = React.memo(
    ({children}) => {

    const user = getFromLocalStorage("user");
    return user?.token ? children : <Navigate to="/login" />;
})

export default React.memo(ProtectedRoute);
