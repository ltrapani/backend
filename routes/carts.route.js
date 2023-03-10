import { Router } from "express";
import { ProductManager } from "../data/productos.js";

const cart = new ProductManager('./data/carts.json')
const route = Router();

route.post('/', async (req, res) =>{
    const cartCreate = await cart.createCart()
    
    if(cartCreate){
        await res.status(201).send({id: cartCreate})
    }else{
        await res.status(400).send({error: 'Error creating cart'})
        return
    }
})

route.get('/:cid', async (req, res) =>{
    const cid = Number(req.params.cid)
    const product = await cart.getCartProductsById(cid);

    (!product) ? res.status(404).send("The cart id doesn't exist") : res.status(201).send(product)
})

route.post('/:cid/product/:pid', async (req, res) =>{
    const cid = Number(req.params.cid)
    const pid = Number(req.params.pid)
        
    if((typeof pid === "number") && (typeof cid === "number")){
        const agregarProduct = await cart.addProductToCart(pid, cid)

        if(agregarProduct === undefined){
            res.status(404).send(`Data was not found in the db, try again later`);
        }else{
            res.status(201).send('Product successfully added')
        } 
    }else{
        res.status(404).send('You did not send a valid ID number')
    }

})

export default route