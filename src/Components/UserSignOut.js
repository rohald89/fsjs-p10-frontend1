import React from "react";


import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const UserSignOut = (props) => {
const [clear] = useState({})
  
  useEffect(() =>{
    const clearData = () => {
      props.removeLoginInfo({clear})
    }
    clearData(); 
  })

  return <Navigate to="/" />; //Navigate back to homepage
};

export default UserSignOut;
