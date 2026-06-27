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
  try {
    const body = req.method === "POST" ? getBody(req) : {};
    const adminPassword = body.adminPassword || req.query.adminPassword;

    if (adminPassword !== process.env.ADMIN_PASSWORD) {
      return send(res, 401, { error: "Unauthorized" });
    }

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return send(res, 500, { error: error.message });

    return send(res, 200, { orders: data || [] });
  } catch (error) {
    return send(res, 500, { error: error.message || "Failed to load orders" });
  }
};