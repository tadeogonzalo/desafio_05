import express from 'express';
import { cartRouter } from './routes/carts.routes.js';
import { productRouter } from './routes/products.routes.js';
import { engine } from 'express-handlebars';
import __dirname  from './utils.js';
import viewsRouter from './routes/views.routes.js';
import { Server } from 'socket.io';
import { ProductManager } from './managers/ProductsManager.js';

const PORT = 8081;

const app = express();

app.use( express.json() );
app.use( express.urlencoded( {extended:true} ) );

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto: ${PORT}`);
});

const io = new Server(httpServer);

app.engine("handlebars",engine());
app.set("view engine", "handlebars");

app.set("views", __dirname + "/views");

app.use("/", express.static(__dirname + "/public"));

app.use("/", viewsRouter);
app.use("/realtimeproducts", viewsRouter)

app.use( "/api/products", productRouter );
app.use( "/api/carts", cartRouter );


io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado con ID:",socket.id);

    socket.on('addProduct', async ( p ) => {
        try {
            console.log('Datos del producto recibidos en el servidor:', p);

            const productManager = new ProductManager('productos.json');
            await productManager.addProduct(p.title, p.description, p.price, p.thumbnails, p.code, p.stock);

            io.emit('newProduct', p);
        } catch (error) {
            console.error('Error al agregar producto:', error.message);
        }
    });
});