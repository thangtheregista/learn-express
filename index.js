const express = require("express");
const app = express();
const mongoose = require("mongoose");
const password = "uB4bqmLzNGLTUxqf";
const Product = require("./models/product.model.js");

/*middleware config*/
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello from node hallo");
}); /* / when visit default page*/

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); /* get products list */

app.get("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}); /* add product */
// update a product
app.put("/api/product/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    "mongodb+srv://thangtheregista:uB4bqmLzNGLTUxqf@backenddb.yvrekay.mongodb.net/Node-API?retryWrites=true&w=majority&appName=BackendDB"
  ) /*collection-name?*/
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed");
  }); /* connect mongoDB */
console.log("Hello there");
