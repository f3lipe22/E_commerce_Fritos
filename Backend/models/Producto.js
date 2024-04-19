// Importa las dependencias necesarias, como mongoose
import mongoose from 'mongoose';

// Define el esquema del modelo
const productoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type: Number,
        required: true,
    },
    descripcion: {
        type: String,
        required: true,
    },
    imagen: {
        type: String,
        required: true,
    },
});

// Crea el modelo "Producto" con el esquema definido
const Producto = mongoose.model('Producto', productoSchema);

// Exporta el modelo para su uso en otros lugares del código
export default Producto;
