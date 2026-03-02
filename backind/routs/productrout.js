const express = require('express');

const prrouter = express.Router();
const { Product} = require("../module/user");
const mongoose = require('mongoose');


// fetch all users
prrouter.get("/", async (req, res) => {
  try {
    const Products = await Product.find();
console.log(Products);

    res.status(200).json({Products});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// جلب منتج واحد
prrouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


prrouter.post("/addproduct", async (req, res) => {
  try {
    console.log(req.body);
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// update product
prrouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product updated", product: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// delete product
prrouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted", product: deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = prrouter;