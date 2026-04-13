const express = require("express");
const path = require("path");

const app = express();

app.use(express.json());

// cho phép load file tĩnh
app.use(express.static(__dirname));

// route trang chủ
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// data fake
let products = [];

// thêm
app.post("/add", (req, res) => {
  const { name, origin } = req.body;

  products.push({ name, origin, time: Date.now() });

  res.send("Them san pham thanh cong!");
});

// lấy
app.get("/product/:id", (req, res) => {
  const p = products[req.params.id];

  if (!p) return res.send("Khong ton tai");

  res.json(p);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
