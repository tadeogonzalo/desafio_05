import { Router } from "express";
import { CartManager } from "../managers/CartManager.js";

const path = "carts.json";
const router = Router();
const cartManager = new CartManager( path );

router.post('/', async (req,res)=>{

    const carts = await cartManager.createCart();

    res.send({
        status:"success",
        carts: carts
    })

})

router.get('/', async (req,res)=>{

    const carts = await cartManager.getCarts();

    res.send({
        status:"success",
        carts: carts
    })

})

router.get('/:idCart', async (req,res)=>{
    
    const idCart = req.params.idCart;

    let cart = await cartManager.getCartById( idCart );
    
    res.send({ 
        status:"success",
        cart: cart
    })
})

router.post('/:cid/product/:pid', async (req,res)=>{

    const cid = req.params.cid;
    const pid = req.params.pid;
    
    const result = await cartManager.addProductToCart( cid, pid );

    res.send({
        status:"success",
        msg: result
    })
})

export { router as cartRouter };