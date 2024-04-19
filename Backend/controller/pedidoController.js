import Pedido from '../models/Pedido.js'; // Asegúrate de que la ruta sea correcta para importar el modelo de Pedido

// Controlador para crear un nuevo pedido
const crearPedido = async (req, res) => {
    try {
        const { nombre, precio, cliente, direccion } = req.body;
        const nuevoPedido = new Pedido({
            nombre,
            precio,
            cliente,
            direccion
        });
        const pedidoGuardado = await nuevoPedido.save();
        const mensaje = 'Pedido creado con exito';
        return res.status(201).json({ msg: mensaje });
    } catch (error) {
        console.log(error); // Imprimir los errores
        res.status(500).json({ error: "Error al crear el pedido" });
    }
};

// Controlador para obtener todos los pedidos
const obtenerPedido = async (req, res) => {
    try {
        const pedidos = await Pedido.find();
        res.status(200).json(pedidos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los pedidos" });
    }
};

// Controlador para obtener un pedido por su número (ID)
const obtenerPedidoPorId = async (req, res) => {
    try {
        const pedido = await Pedido.findOne({ numero_pedido: req.params.numero_pedido });
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el pedido" });
    }
};

// Controlador para actualizar un pedido por su número (ID)
const actualizarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findOneAndUpdate({ numero_pedido: req.params.numero_pedido }, req.body, { new: true });
        if (!pedido) {
            return res.status(404).json({ error: "Pedido no encontrado" });
        }
        res.status(200).json(pedido);
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el pedido" });
    }
    
};

// Controlador para eliminar un pedido por su número (ID)
const eliminarPedido = async (req, res) => {
    try {
        const pedido = await Pedido.findOneAndDelete({ numero_pedido: req.params.numero_pedido });
        if (!pedido) {
            return res.status(404).json({ mensaje: "Pedido no encontrado" });
        }
        res.status(204).json({ mensaje: "Pedido eliminado con éxito" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el pedido" });
    }
};


export {
    crearPedido,
    obtenerPedido,
    obtenerPedidoPorId,
    actualizarPedido,
    eliminarPedido
};
