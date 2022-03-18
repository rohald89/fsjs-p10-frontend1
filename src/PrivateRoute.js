import React from "react";
import {Navigate, Outlet } from "react-router-dom";
import UserSignIn from "./Components/UserSignIn";

const PrivateRoute = (props) => {
    return props.auth ? <Outlet/> : <Navigate to='/signin' />; 
}

export default PrivateRoute; 