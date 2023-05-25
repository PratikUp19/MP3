import React, { useState } from 'react';
import { useSelector } from "react-redux";
function OrderTrack() {

    const { user } = useSelector((state) => state.user);
    
  return (
    <div>
      <h1>Your Deliveries</h1>
      
    </div>
  );
}

export default OrderTrack;
