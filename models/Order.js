const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    
    TrackingID: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        lowercase: true,
    },
    
    Address_f: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        lowercase: true,
    },

    Address_t: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        lowercase: true,
    },

    Cost: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        lowercase: true,
    },

    Size: {
        type: String,
        required: true,
        trim: true,
        unique: false,
        lowercase: true,
    },
    
    OrderStatus: {
        type: String,
        required: false,
        trim: true,
        unique: false,
        lowercase: true,
    },

    Trader_id: {
        type: String,
        required: false,
        trim: true,
        unique: false,
        lowercase: true,
    },

   
    logistic_id: {
        type: String,
        required: false,
        trim: true,
        unique: false,
        lowercase: true,
    },

    Location: {
        type: String,
        required: false,
        trim: true,
        unique: false,
        lowercase: true,
    },
   
},
{
timestamp: true,
}

);

module.exports = mongoose.model("Order", orderSchema);