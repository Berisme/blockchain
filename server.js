const express = require("express");
const path = require("path");

const app = express();

// middleware
app.use(express.json());

// cho phép load file HTML
app.use(express.static(__dirname));

// dữ liệu giả (demo)
let products = [];

// 👉 TRANG CHỦ (HIỂN THỊ index.html)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// 👉 THÊM SẢN PHẨM
app.post("/add", (req, res) => {
  const { name, origin } = req.body;

  products.push({
    name,
    origin,
    time: Date.now()
  });

  res.send("Them san pham thanh cong!");
});

// 👉 LẤY SẢN PHẨM
app.get("/product/:id", (req, res) => {
  const p = products[req.params.id];

  if (!p) return res.send("Khong ton tai");

  res.json(p);
});

// chạy server (QUAN TRỌNG cho Render)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running"));
