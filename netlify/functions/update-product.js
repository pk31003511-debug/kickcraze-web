const { createClient } = require("@supabase/supabase-js");

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Content-Type": "application/json"
};

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const { adminPassword, id, title, price, image_url, description, category, rating } = body;

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return { statusCode: 401, headers, body: JSON.stringify({ error: "Unauthorized" }) };
    }

    if (!id) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: "Product id is required" }) };
    }

    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
    const { data, error } = await supabase
      .from("products")
      .update({
        title: String(title || "").trim(),
        price: Number(price || 0),
        image_url: image_url || "",
        description: description || "",
        category: category || "Shoes",
        rating: rating ? Number(rating) : 5
      })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return { statusCode: 200, headers, body: JSON.stringify({ product: data }) };
  } catch (error) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: error.message }) };
  }
};
