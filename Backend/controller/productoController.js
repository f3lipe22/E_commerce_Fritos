import multer from 'multer';
import Producto from "../models/Producto.js";



// Define una función para configurar Multer
const configurarMulter = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });

  return multer({ storage: storage });
};

export { configurarMulter };




  // Controlador para crear un nuevo producto con imagen
  const crearProducto = async (req, res) => {
    try {
      const { nombre, precio, descripcion } = req.body;
      const imagen = '/uploads/'+req.file.filename // La ruta de la imagen en el servidor
  
      const nuevoProducto = new Producto({
        nombre,
        precio,
        descripcion,
        imagen,
      });
  
      const productoGuardado = await nuevoProducto.save();
      const mensaje = 'Producto creado correctamente';
      return res.status(201).json({ msg: mensaje });
    } catch (error) {
        console.error(error); // Imprimir el error en la consola
      res.status(500).json({ error: 'Error al crear el producto' });
    }
  };
  

// Controlador para obtener todos los productos
const obtenerProducto = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los productos" });
    }
};

// Controlador para obtener un producto por su número (ID)
const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findOne({ _id: req.params._id }); // Cambiar el nombre de la variable
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
};

// // Controlador para actualizar un producto por su número (ID)
// const actualizarProducto = async (req, res) => {
//     try {
//         const imagen = '/uploads/'+req.file.filename 
//         const producto = await Producto.findOneAndUpdate({ _id: req.params._id }, req.body, { new: true }); // Cambiar el nombre de la variable
//         if (!producto) {
//             return res.status(404).json({ error: "Producto no encontrado" });
//         }
//         const error = new Error("Producto actualizado Correctamente");
//         return res.status(200).json({ msg:error.message })
//         // res.status(200).json(producto);
//     } catch (error) {
//         res.status(500).json({ error: "Error al actualizar el producto" });
//     }
// }


// Controlador para editar un producto, incluyendo la imagen
const actualizarProducto = async (req, res) => {
    try {
        const { nombre, precio, descripcion } = req.body;
        const productoId = req.params._id; // Obtener el ID del producto a editar

        // Verificar si el producto con el ID dado existe
        const productoExistente = await Producto.findById(productoId);

        if (!productoExistente) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar los campos del producto existente con los valores proporcionados
        productoExistente.nombre = nombre;
        productoExistente.precio = precio;
        productoExistente.descripcion = descripcion;

        if (req.file) {
            // Si se proporciona una nueva imagen, actualiza la URL de la imagen
            productoExistente.imagen = '/uploads/' + req.file.filename;
        }

        // Guardar los cambios en la base de datos
        const productoActualizado = await productoExistente.save();

        const mensaje = 'Producto actualizado correctamente';
        return res.status(200).json({ msg: mensaje });
    } catch (error) {
        console.error(error); // Imprimir el error en la consola
        res.status(500).json({ error: 'Error al editar el producto' });
    }
};


// Controlador para eliminar un producto por su número (ID)
const eliminarProducto = async (req, res) => {
    try {
        const producto = await Producto.findOneAndDelete({ _id: req.params._id }); // Cambiar el nombre de la variable
        if (!producto) {
            return res.status(404).json({ mensaje: "Producto no encontrado" });
        }
        const error = new Error("Producto eliminado Correctamente");
        return res.status(204).json({ msg:error.message })
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto" });
    }
}

export {
    crearProducto,
    obtenerProducto,
    obtenerProductoPorId,
    actualizarProducto,
    eliminarProducto
};
