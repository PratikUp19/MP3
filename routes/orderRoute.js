const express = require("express");
const Order = require("../models/Order");
const router = express.Router();
router.post('/order',async (req, res) => {

    // let's create the order
    const order = new Order(req.body);
    // console.log(order.PriorityStatus,order.TrackingID);
    await order.save();
  
    res.status(201).json({
        message: "You have successfully saved the order",
    });
  });

router.get('/orderstatus', async (req, res) => {
    const TrackingID = req.query.TrackingID;
    console.log(TrackingID)
    try {
        const order = await Order.findOne({TrackingID: TrackingID}).exec();
        const Carrier = order.Carrier;
        const OrderStatus = order.OrderStatus;
        const Address_f = order.Address_f;
        const Address_t = order.Address_t;
        const Location = order.Location;
        res.status(200).json({
            message: "Order details fetched",
            Carrier,
            OrderStatus,
            Address_f,
            Address_t,
            Location
        });
    } catch (error) {
        res.status(400).json({
            error: `Tracking ID not found`,
        });
    }
})
  module.exports = router;