const express = require("express");
const crypto = require("crypto");

const PORT = 8000;

const app = express();

app.get("/sha256-hmac", async (req, res) => {
  try {
    const { partner_id, path } = req.query;
    const timestamp = new Date().getTime();
    const baseString = `${partner_id}${path}${timestamp}`;
    const hmac = crypto.createHmac("sha256", "sha256-hmac");
    const data = hmac.update(baseString).digest("hex");

    res.send({ data, err: false });
  } catch (err) {
    res.send({ data: false, err: err.toString() });
  }
});

app.listen(process.env.PORT || PORT, () => {
  console.log(`Server started at ${PORT}`);
});
