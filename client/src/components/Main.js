import React from 'react';
import { Link } from 'react-router-dom';
import "../Main.css"
function Main() {
  return (
    <div>
    <nav>
   
    <label  for="check" class="checkbtn">
        <i  class="fas fa-bars"></i>
    </label>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/orderTracking">OrderTracking</Link>
        </li>
      </ul>
      </nav>
      <section>
    </section>
      </div>
    
  );
}

export default Main;
