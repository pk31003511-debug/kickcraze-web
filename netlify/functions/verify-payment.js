const crypto = require('crypto');

exports.handler = async (event) => {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    try {
        const { order_id, payment_id, signature } = JSON.parse(event.body);
        const secret = process.env.RAZORPAY_KEY_SECRET;

        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(order_id + "|" + payment_id);
        const generated_signature = hmac.digest('hex');

        if (generated_signature === signature) {
            return { 
                statusCode: 200, 
                headers: { "Access-Control-Allow-Origin": "*" }, 
                body: JSON.stringify({ status: "success" }) 
            };
        }
        return { statusCode: 400, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ status: "failure" }) };
    } catch (err) {
        return { statusCode: 500, headers: { "Access-Control-Allow-Origin": "*" }, body: JSON.stringify({ status: "failure" }) };
    }
};