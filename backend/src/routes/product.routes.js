import { Router } from "express";
import { fetchProducts } from "../controllers/product.controller";

const router = Router();

// Route to fetch products
router.get("/products", fetchProducts);
router.get("/products/:id", fetchProducts);
router.post("/products", fetchProducts);


export default router;   
