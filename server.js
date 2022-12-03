// setup express api for /track route which give details of order with that tracking id
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const orders = require('./models/track');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://admin-om:bba_admin123@cluster0.9xjs3.mongodb.net/etrack?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...'));

// push route for pushing tracking_detauls to track collection using tracking id
app.post('/track', async (req, res) => {
    const { trackingId, status, merchant, product, edd, reciverName, tracking_details } = req.body;
    let order =  await orders.findOne({ trackingId: trackingId });
    if (order) {
        console.log('order found', order);
        const updates = {
            status: status,
            merchant: merchant,
            product: product,
            edd: edd,
            reciverName: reciverName,
            tracking_details: [...order.tracking_details, ...tracking_details]
        }
        await orders.updateOne({ trackingId: trackingId }, { $set: updates });
        // orders.updateOne({ trackingId }, updates)
    }else {
        const newOrder = new orders({
            trackingId: trackingId,
            status: status,
            merchant: merchant,
            product: product,
            edd: edd,
            reciverName: reciverName,
            tracking_details: tracking_details
        });
        order = await newOrder.save();
    }

    return res.status(200).json({order: order});
})

app.get('/track', async (req, res) => {
    console.log('get request');
    const { trackingId } = req.query;
    console.log('trackingId', trackingId);
    const order =  await orders.findOne({trackingId});
    if (!order) {
        res.status(404).json({code: 404, msg: 'Order not found'});
    } else {
        res.json({code: 200, msg: 'order found', order});
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});