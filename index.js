import express from 'express'
import configureHandlebars from './lib/handlebars/handlebars.middleware.js'
import productRoute from './routes/products.route.js'
import cartRoute from './routes/carts.route.js'
import fileDirName from './utils/fileDirName.js'
import homeRoute from './public/js/home.js'
import configureSocket from './socket/configure-socket.js'
const { _dirname } = fileDirName(import.meta)

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(_dirname + '/public'));


configureHandlebars(app)

app.use('/', homeRoute)
app.use('/api/products', productRoute)
app.use('/api/carts', cartRoute)


const port = 8080
const sv = app.listen(port, () => 
    console.log(`Servidor express en el puerto ${port}`)
)

configureSocket(sv)