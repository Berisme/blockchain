const express = require("express");
const { ethers } = require("ethers");
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(express.json());

//  GANACHE RPC
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");

//  PRIVATE KEY (OK)
const wallet = new ethers.Wallet(
  "0x6bdf13148823a3f57737d381308f0352486308ba29763f0ea90250013725aa9b",
  provider
);

//
const abi = [
  "function addProduct(string memory name, string memory origin)",
  "function getProduct(uint256 index) view returns (string memory, string memory, uint256)"
];

// 
const contractAddress = "0x0b351d3ae1eE72FFC980023B891F49b4Cc23291e";

const contract = new ethers.Contract(contractAddress, abi, wallet);

//  TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend dang chay OK");
});

//  ADD PRODUCT
app.post("/add", async (req, res) => {
  try {
    const { name, origin } = req.body;

    if (!name || !origin) {
      return res.status(400).send("Thiếu dữ liệu!");
    }

    const tx = await contract.addProduct(name, origin);
    await tx.wait();

    res.send("Them san pham thanh cong!");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});

//  GET PRODUCT
app.get("/product/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const data = await contract.getProduct(id);

    res.json({
      name: data[0],
      origin: data[1],
      time: data[2].toString()
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.toString());
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log("Server running at http://localhost:3000"));