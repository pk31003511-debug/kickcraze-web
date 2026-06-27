const { createClient } = require("@supabase/supabase-js");

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
}

module.exports = async (req, res) => {
  try {
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return send(res, 500, { error: error.message });

    return send(res, 200, { products: data || [] });
  } catch (error) {
    return send(res, 500, { error: error.message || "Failed to load products" });
  }
};