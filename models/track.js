// order model with tracking details using mongoose schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const trackSchema = new Schema({
    trackingId: { type: String, required: true },
    status: { type: String, required: true },
    merchant: { type: String, required: true },
    product: { type: String, required: true },
    edd: { type: String, required: true },
    reciverName: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tracking_details: [{
        date: { type: String, required: true },
        location: { type: String, required: true },
        status: { type: String, required: true },
        time: { type: String, required: true }
    }]
});
const Track = mongoose.model('Track', trackSchema);
module.exports = Track;