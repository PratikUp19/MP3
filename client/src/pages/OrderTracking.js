import React, { useState } from 'react';

function OrderStatus() {
  const [trackingID, setTrackingID] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [error, setError] = useState('');

  const handleTrackingIDChange = (event) => {
    setTrackingID(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`api/orders/orderstatus?TrackingID=${trackingID}`);
      console.log(`http://localhost:5000/api/orders/orderstatus?TrackingID=${trackingID}`);
      const data = await response.json();
      setOrderDetails(data);
      setError('');
    } catch (error) {
      setError('Tracking ID not found');
      setOrderDetails(null);
    }
  }

  return (
    <div>
      <h1>Order Status</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Tracking ID:
          <input type="text" value={trackingID} onChange={handleTrackingIDChange} />
        </label>
        <button type="submit">Check Status</button>
      </form>
      {error && <p>{error}</p>}
      {orderDetails && (
        <div>
          <h2>Order Details:</h2>
          <p>Carrier: {orderDetails.Carrier}</p>
          <p>Order Status: {orderDetails.OrderStatus}</p>
          <p>From: {orderDetails.Address_f}</p>
          <p>To: {orderDetails.Address_t}</p>
          <p>Location: {orderDetails.Location}</p>
        </div>
      )}
    </div>
  );
}

export default OrderStatus;
