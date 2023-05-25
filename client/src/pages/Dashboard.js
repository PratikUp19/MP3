import React, { useState, useEffect } from "react";
import logo from "../assets/2.svg";
import "../style.css";
import Layout from "../components/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Dashboard() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 3000);
  }, []);

  return (
    <div>
      {showLoader ? (
        <div id="loader">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      ) : (
        <div >
    <ul className="menu">
   
      <li className="menu-item"><Link to="/login">Login</Link></li>
      <li className="menu-item"><Link to="/register">Register</Link></li>
      </ul>
      
      

      <div>
        <div id="body">
        
        <a className="container_image" href="#">
        <img src={logo} alt="logo" />
      </a>
      <div class="hero_1">
      <div class="hero_text">
       

      

        <h3 class="part1">
          <span>Container Booking</span><br />
         
        </h3>
        <h3 class="part1">
          <span>We Will Deliver<br />
          your Package!</span><br />
         
        </h3>
        
      </div>
      <div class="hero_subtext">
        
          Trust your package to us,<br />
          we have been trusted by the whole world.<br />
          Your Package must be safe.
       
      </div>
    </div>
    </div>
        </div>
    </div>
    
        
        
      )}
    </div>
  );
}

export default Dashboard;
