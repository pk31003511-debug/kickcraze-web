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
  if (req.method !== "POST") return send(res, 405, { error: "Method not allowed" });

  try {
    const body = getBody(req);

    if (body.adminPassword !== process.env.ADMIN_PASSWORD) {
      return send(res, 401, { error: "Unauthorized" });
    }

    if (!body.id) return send(res, 400, { error: "Product id required" });

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", body.id);

    if (error) return send(res, 500, { error: error.message });

    return send(res, 200, { success: true });
  } catch (error) {
    return send(res, 500, { error: error.message || "Failed to delete product" });
  }
};