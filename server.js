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
