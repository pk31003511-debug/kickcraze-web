const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

function getBody(req) {
  if (!req.body) return {};
  return typeof req.body === "string" ? JSON.parse(req.body) : req.body;
}

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return send(res, 405, { error: "Method not allowed" });
  }

  try {
    const body = getBody(req);

    const orderId = body.order_id || body.razorpay_order_id;
    const paymentId = body.payment_id || body.razorpay_payment_id;
    const signature = body.signature || body.razorpay_signature;

    if (!orderId || !paymentId || !signature) {
      return send(res, 400, { error: "Missing Razorpay payment details" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(orderId + "|" + paymentId)
      .digest("hex");

    if (expectedSignature !== signature) {
      return send(res, 400, { status: "failure", error: "Invalid payment signature" });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const customer = body.customer || {};
    const cartItems = body.cart_items || body.cartItems || [];

    const { data, error } = await supabase.from("orders").insert({
      order_number: "KC" + Date.now(),
      customer_name: customer.name || customer.fullName || "",
      phone: customer.phone || "",
      email: customer.email || "",
      address: customer.address || "",
      city: customer.city || "",
      state: customer.state || "",
      pincode: customer.pincode || "",
      cart_items: cartItems,
      subtotal: Number(body.subtotal || 0),
      shipping: Number(body.shipping || 0),
      total: Number(body.total || 0),
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      payment_status: "paid",
      order_status: "Paid"
    }).select().single();

    if (error) {
      return send(res, 500, { error: error.message });
    }

    return send(res, 200, {
      status: "success",
      order: data
    });
  } catch (error) {
    return send(res, 500, { error: error.message || "Payment verification failed" });
  }
};