import { Router } from "express";
import { ProductManager } from "../managers/ProductsManager.js";

const path = "productos.json";
const router = Router();
const productManager = new ProductManager( path );

router.get('/', async (req,res)=>{
    
    let limit = req.query.limit;

    const products = await productManager.getProducts();

    if( !limit ) return res.send({ status:"success", productos: products });

    const productosFiltrados = productos.slice( 0, limit );

    res.send({
        status:"success",
        productos: productosFiltrados
    })

})

router.get('/:idProduct', async (req,res)=>{
    
    const idProduct = req.params.idProduct;

    let producto = await productManager.getProductById( idProduct );
    
    res.send({ 
        status:"success",
        producto: producto
    })
})

router.post('/', async (req,res)=>{ 

    const product = req.body;
    const products = await productManager.addProduct( product );

    res.send({
        status:"success",
        msg: products
    })
})

router.put('/:pid', async (req,res)=>{
    const pid = req.params.pid;
    const product = req.body;
    
    const products = await productManager.updateProduct( pid, product );

    res.send({
        status:"success",
        msg: products
    })
})

router.delete('/:pid', async (req,res)=>{
    const pid = req.params.pid;

    const products = await productManager.deleteProduct( pid );

    res.send({
        status:"success",
        msg: products
    })
})

export { router as productRouter };