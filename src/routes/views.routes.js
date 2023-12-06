import { Router } from "express";
import { ProductManager } from "../managers/ProductsManager.js";

const router = Router()
const path = "productos.json"
const manager = new ProductManager(path);

router.get("/", async (req,res)=>{
    const allProducts = await manager.getProducts();
    res.render('home', {products: allProducts })
})

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts'); 
});


export default router;