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

    if (!body.id) return send(res, 400, { error: "Order id required" });

    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const updateData = {};
    if (body.order_status) updateData.order_status = body.order_status;
    if (body.tracking_number !== undefined) updateData.tracking_number = body.tracking_number;
    if (body.note !== undefined) updateData.note = body.note;

    const { data, error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", body.id)
      .select()
      .single();

    if (error) return send(res, 500, { error: error.message });

    return send(res, 200, { success: true, order: data });
  } catch (error) {
    return send(res, 500, { error: error.message || "Failed to update order" });
  }
};