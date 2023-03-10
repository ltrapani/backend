import { Server } from 'socket.io'
import { ProductManager } from '../data/productos.js'

const productManager = new ProductManager('./data/products.json')

export default function configureSocket(sv){
    const socketServer = new Server(sv)

    socketServer.on('connection', (socket) =>{
        console.log('cliente conectado')
        socket.emit('products_actuales', productManager.products)
    })
}