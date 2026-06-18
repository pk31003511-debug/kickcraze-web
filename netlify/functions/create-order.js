const Razorpay = require('razorpay');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        const { amount } = JSON.parse(event.body);
        const razorpay = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });

        const order = await razorpay.orders.create({
            amount: amount * 100,
            currency: 'INR',
            receipt: 'rcpt_' + Date.now()
        });

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ id: order.id, key: process.env.RAZORPAY_KEY_ID })
        };
    } catch (err) {
        return { 
            statusCode: 500, 
            headers: { "Access-Control-Allow-Origin": "*" }, 
            body: JSON.stringify({ error: err.message }) 
        };
    }
};