import express from 'express';
import {
    configurarMulter,
    crearProducto,
    obtenerProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
} from "../controller/productoController.js";

const router = express.Router();
const upload = configurarMulter(); // Llamar a configurarMulter para obtener el middleware configurado

router.post('/', upload.single('imagen'), crearProducto);
router.get('/listar', obtenerProducto);
router.get('/buscar/:_id', obtenerProductoPorId);
router.put('/actualizar/:_id', upload.single('imagen'), actualizarProducto);
router.delete('/eliminar/:_id', eliminarProducto);

export default router;
