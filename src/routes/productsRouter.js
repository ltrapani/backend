import { Router } from "express";
import { ProductManager } from "../data_base/productos.js";
import { validateproduct, _validateproduct } from "../data_base/validation.js";
import { imgsUploader } from "../utils/imgsUploader.js";

const productoManager = new ProductManager('./data_base/products.json')

const route = Router();

route.get('/', async (req, res) =>{
    const productos = productoManager.getProducts()
    const limit = req.query.limit;

    (limit && !isNaN(Number(limit))) ? await res.status(201).send(productos.slice(0, limit)) : await res.status(201).send(productos)
})

route.get('/:pid', async (req, res) =>{
    const productos = productoManager.getProducts()
    const pid = req.params.pid;

    if(pid && !isNaN(Number(pid))){
        const respuesta = productos.find((e) => e.id === Number(pid))
        if(!respuesta) {
            await res.status(404).send(`The product with id ${pid} doesn't exist`)
            return
        }else{
            return res.status(202).send(respuesta)
        } 
    }else{
        await res.status(400).send('You entered an invalid character')
    }
})


route.post('',imgsUploader.array('file', undefined) ,async (req, res)=>{
    const producto = req.body;
    const img = req.files
    const filenames = []

    for(const key in img){
        if(img.hasOwnProperty(key)){
            const files = img[key];
            
            if(Array.isArray(files)){
                files.forEach(file =>{
                    filenames.push(file.filename)
                })
            }else{
                filenames.push(files.filename)
            }
            
        }
    }
    const status = producto.status;
    if(!status){
        producto.status = 'true'
    }
    
    producto.price = Number(producto.price)
    producto.stock = Number(producto.stock)
    
    const esValidoElProducto = validateproduct(producto)
    if(!esValidoElProducto){
        res.status(400).send({
            error: 'Invalid data entered, please try again later'
        });
    }else{
        const id = await productoManager.addProducts({...producto, thumbnail: filenames})
        res.status(201).send({id})
    }
})

route.put('/:pid', async (req, res) => {
    const idProducto = Number(req.params.pid);
    const Producto = await productoManager.getProductsById(idProducto);

    if (!Producto) {
        res.status(404)
            .send({ error: `The product with id ${idProduct} was not found` });
        return;
    }
    const nuevosDatos = req.body;

    const esValido = _validateproduct(nuevosDatos);
    if (!esValido) {
        res.status(400).send({
        error: 'Invalid data',
    });
    return;
    }
    await productoManager.updateProduct(idProducto, nuevosDatos);
    res.status(202).send({ ok: true });
});

route.delete('/:pid', async(req, res) =>{
    const idProducto = Number(req.params.pid)
    const Producto = await productoManager.getProductsById(idProducto)
    if(!Producto){
        res.status(404).send({Error: `Product with id ${idProduct} not foundrado`})
        return;
    }

    await productoManager.deleteProduct(idProducto) 
    res.status(200).send({ok: true})
})

export default route;