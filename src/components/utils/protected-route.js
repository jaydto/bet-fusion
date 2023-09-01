import React, {useEffect, useState} from "react";
import {Navigate} from "react-router-dom";
import {getFromLocalStorage, setLocalStorage} from './local-storage';
import 'react-toastify/dist/ReactToastify.css';
import {useSelector} from "react-redux";

const ProtectedRoute = React.memo(
    ({children}) => {

        const userData = useSelector((state) => state.data.user)
        const [user, setUser] = useState(getFromLocalStorage("user"))

        useEffect(() => {
            if (userData) {
                setUser(userData || getFromLocalStorage("user"))
            }
        }, userData)

        const path = window.location.pathname;
        setLocalStorage("ActiveLink", path)
        return user?.token ? children : <Navigate to="/login"/>;
    })

export default React.memo(ProtectedRoute);
