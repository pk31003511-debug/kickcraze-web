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
    const { adminPassword, id, order_status, tracking_number, note } = JSON.parse(event.body || "{}");

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabase
      .from("orders")
      .update({ order_status, tracking_number, note })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return { statusCode: 200, headers, body: JSON.stringify({ order: data }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};