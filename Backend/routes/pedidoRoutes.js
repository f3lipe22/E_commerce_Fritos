import express from "express";
const router = express.Router();
import {
    crearPedido,
    obtenerPedido,
    obtenerPedidoPorId,
    actualizarPedido,
    eliminarPedido
} from "../controller/pedidoController.js"; // Asegúrate de que la ruta sea correcta para importar los controladores



// Ruta para crear un nuevo producto
router.post('/', crearPedido);

// Ruta para obtener todos los productos
router.get('/listar', obtenerPedido);

// Ruta para obtener un producto por su ID
router.get('/buscar/:numero_pedido', obtenerPedidoPorId);

// Ruta para actualizar un producto por su ID
router.put('/actualizar/:numero_pedido', actualizarPedido);

// Ruta para eliminar un producto por su ID
router.delete('/eliminar/:numero_pedido', eliminarPedido);

export default router;
