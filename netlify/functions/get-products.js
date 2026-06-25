const { createClient } = require("@supabase/supabase-js");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Content-Type": "application/json"
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (!["GET", "POST"].includes(event.httpMethod)) {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await supabase
      .from("products")
      .select("id, created_at, title, price, image_url, description, category, rating")
      .order("created_at", { ascending: false });

    if (error) throw error;
    return { statusCode: 200, headers, body: JSON.stringify({ products: data || [] }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message, products: [] }) };
  }
};
