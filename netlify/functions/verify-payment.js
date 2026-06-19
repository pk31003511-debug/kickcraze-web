const crypto = require("crypto");
const { createClient } = require("@supabase/supabase-js");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "Method not allowed" };

  try {
    const payload = JSON.parse(event.body || "{}");
    const { order_id, payment_id, signature, customer, cart_items, subtotal, shipping, total } = payload;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (expected !== signature) {
      return { statusCode: 400, headers, body: JSON.stringify({ status: "failure" }) };
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const orderNumber = "KC" + Date.now();

    const { data, error } = await supabase.from("orders").insert([{
      order_number: orderNumber,
      customer_name: customer.fullName,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      city: customer.city,
      state: customer.state,
      pincode: customer.pincode,
      cart_items,
      subtotal,
      shipping,
      total,
      razorpay_order_id: order_id,
      razorpay_payment_id: payment_id,
      razorpay_signature: signature,
      payment_status: "paid",
      order_status: "Paid"
    }]).select().single();

    if (error) throw error;

    return { statusCode: 200, headers, body: JSON.stringify({ status: "success", order: data }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ status: "failure", error: error.message }) };
  }
};