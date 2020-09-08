const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const shortid = require("shortid");

const app = express();
app.use(bodyParser.json());
app.use("/", express.static(__dirname + "/build"));
app.get("/", (req, res) => res.rendFile(__dirname + "/build/index.html"));
mongoose.connect(
  "mongodb+srv://Quang_nguyen0601:quang.nguyen@cluster0.61exa.mongodb.net/shopping?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);

const Product = mongoose.model(
  "products",
  new mongoose.Schema({
    _id: { type: String, default: shortid.generate() },
    title: String,
    description: String,
    image: String,
    price: Number,
    availableSizes: [String],
  })
);
app.get("/api/products", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
app.post("/api/products", async (req, res) => {
  console;
  const newProduct = new Product(req.body);
  const saved = await newProduct.save();
  res.send(saved);
});
app.delete("/api/products/:id", async (req, res) => {
  const deleteProduct = await Product.findByIdAndDelete(req.params.id);
  res.rend(deleteProduct);
});
const port = process.env.PORT || 9999;
app.listen(port, () => {
  console.log("Listening to", +port);
});
