const express = require("express");
const app = express();

app.use(express.json());

let products = [];

app.get("/", (req, res) => {
  res.send("Backend dang chay tren Render");
});

// thêm sản phẩm
app.post("/add", (req, res) => {
  const { name, origin } = req.body;

  products.push({
    name,
    origin,
    time: Date.now()
  });

  res.send("Them san pham thanh cong!");
});

// lấy sản phẩm
app.get("/product/:id", (req, res) => {
  const p = products[req.params.id];

  if (!p) return res.send("Khong ton tai");

  res.json(p);
});

app.listen(3000);
const path = require("path");

// cho phép dùng file tĩnh
app.use(express.static(__dirname));

// route trang web
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
