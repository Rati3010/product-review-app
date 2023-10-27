import express from "express";
import productModel from "../model/product.js";
import reviewModel from "../model/review.js";

const productRouter = express.Router();

productRouter.post("/products", async (req, res) => {
    try {
      const product = new productModel(req.body);
      await product.save();
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  });
  
productRouter.get("/products", async (req, res) => {
    try {
      const products = await productModel.find().populate("reviews");
      res.json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  
productRouter.get("/products/:id", async (req, res) => {
    try {
      const product = await productModel
        .findById(req.params.id)
        .populate("reviews");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });
  
productRouter.put("/products/:id", async (req, res) => {
    try {
      const productId = req.params.id;
      const updatedProduct = req.body;
  
      const product = await productModel.findByIdAndUpdate(
        productId,
        updatedProduct,
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });
  
productRouter.delete("/products/:id", async (req, res) => {
    try {
      const productId = req.params.id;
  
      const product = await productModel.findByIdAndRemove(productId);
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      res.json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });
  
productRouter.post("/products/reviews/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const newReview = req.body;
  
      const product = await productModel.findById(productId);
      console.log(product);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      const review = new reviewModel(newReview);
      await review.save();
  
      product.reviews.push(review);
      await product.save();
  
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to create review" });
    }
  });
  
productRouter.delete("/products/reviews/:productId/:reviewId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const reviewId = req.params.reviewId;
      const product = await productModel.findById(productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      const reviewIndex = product.reviews.findIndex((r) => r._id == reviewId);
      if (reviewIndex === -1) {
        return res.status(404).json({ error: "Review not found" });
      }
      product.reviews.splice(reviewIndex, 1);
      await reviewModel.findByIdAndRemove(reviewId);
      await product.save();
      res.json({ message: "Review deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete review" });
    }
  });
  
productRouter.get("/products/reviews/:productId", async (req, res) => {
    try {
      const productId = req.params.productId;
      const product = await productModel.findById(productId).populate("reviews");
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product.reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews for the product" });
    }
  });

export default productRouter;