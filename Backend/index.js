import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js"
import usuarioRoutes from "./routes/usuarioRoutes.js"
import pedidoRoutes from "./routes/pedidoRoutes.js"
import productoRoutes from "./routes/productoRoutes.js"

//const express = require ("express");

const app = express ();

app.use(express.json());

dotenv.config();

conectarDB();



// Configuración de cors

const whitelist = ['http://localhost:5173' , 'http://localhost:7777/public/uploads/prueba2.png' ];
// const corsOption = {
//     origin: function(origin, callback){
//         if(whitelist.includes(origin)){
//             // puede consultar la API
//             callback(null, true);
//         }else{
//             // No esta permitido
//             callback(new Error("Error de Cors"));
//         }
//     },
// };

const corsOption = {
    origin: '*',
};

app.use(cors(corsOption));


app.use(express.static('public'));
  
// Routing
/*app.get('/', (req, res) => {
    res.send('Hello world')
})
*/



app.use("/api/admin", adminRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/pedidos", pedidoRoutes);
app.use("/api/productos", productoRoutes);

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});