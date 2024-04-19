import mongoose from "mongoose";

const pedidoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
        trim: true,
    },
    cliente: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
});

const Pedido = mongoose.model("Pedidos", pedidoSchema);

export default Pedido;
