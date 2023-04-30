import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Layout from "../components/Layout";
import { useParams } from 'react-router-dom';
function VerifyLink() {
   
    const { id } = useParams();
    console.log(id);
    const [message,setMessage]=useState([]);  
    const [flag,setFlag]=useState([]); 
    const verification = async () => {
   try{
    const resposne = await axios.get(`http://localhost:5000/api/user/verify/${id}`, {
        
    });
    if (resposne.data.success) {
        setMessage("Email Verified")
        setFlag(true)
    }
}
catch(error){
    setMessage(error);
    setFlag(false)
}

    }
    useEffect(() => {
      verification();
    });
  return (
  <div>
    
    {flag&&
        <div>
        <h1>Email Verified </h1>
        <Link to="/login" className="anchor mt-2">
        Login
      </Link>
  </div>
    }
    {!flag&&
        <div>
        <h1>{message}</h1>
    <Link to="/registration" className="anchor mt-2">
    Login
  </Link>
  </div>
    }
    
    </div>
  );
}

export default VerifyLink;
