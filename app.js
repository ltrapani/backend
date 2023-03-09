import express from 'express'
import cartsRouter  from './src/routes/cartsRouter.js'
import productsRouter  from './src/routes/productsRouter.js'
import setHandlebars from './src/library/handlebars/handlebarsMiddleware.js'
import fileDirName from './src/utils/fileDirName.js'
const { _dirname } = fileDirName(import.meta)

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(_dirname + '/public'));

setHandlebars(app)

app.get('/', (req, res) =>{
    res.render('index')
})
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);

const port = 8080
app.listen(port, () => 
    console.log(`Servidor express en el puerto ${port}`)
)