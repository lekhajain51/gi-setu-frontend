
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "GI Setu backend is running!"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    project: "GI Setu"
  });
});

const port = process.env.PORT || 3000;

app.listen(port, "0.0.0.0", () => {
  console.log(`GI Setu backend running on port ${port}`);
});
