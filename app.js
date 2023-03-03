import express from 'express'
import cartsRouter  from './routers/cartsRouter.js'
import productsRouter  from './routers/productsRouter.js'

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);


const port = 8080
app.listen(port, () => 
    console.log(`Servidor express en el puerto ${port}`)
)