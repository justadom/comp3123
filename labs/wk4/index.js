const express = require("express");
const app = express();

app.use(express.json());

app.use(express.static("public"));

app.get("/hello", (req, res) => {
  res.type("text/plain").send("Hello Express JS");
});

app.get("/user", (req, res) => {
  const firstname = req.query.firstname || "Pritesh";
  const lastname = req.query.lastname || "Patel";
  res.json({ firstname, lastname });
});

app.post("/user/:firstname/:lastname", (req, res) => {
  const { firstname, lastname } = req.params;
  res.json({ firstname, lastname });
});

app.post("/users", (req, res) => {
  console.log("Headers:", req.headers);
  console.log("Raw body received:", req.body);
  res.json(req.body);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);
