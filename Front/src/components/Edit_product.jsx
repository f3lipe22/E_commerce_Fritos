import React, { useState } from 'react';
import '../css/form_add_product.css';
import Alerta from '../components/Alerta';
import axios from 'axios';

function EditProduct(props) {
  const { productoEditado, onEditSuccess } = props;

  // Use the initial product values to populate the fields
  const [nombre, setNombre] = useState(productoEditado.nombre);
  const [precio, setPrecio] = useState(productoEditado.precio);
  const [descripcion, setDescripcion] = useState(productoEditado.descripcion);
  const [imagen, setImagen] = useState(null); // Handle file input correctly
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to handle file uploads
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagen);

    try {
      const response = await axios.put(`http://localhost:7777/api/productos/actualizar/${productoEditado._id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAlerta({
        msg: response.data.msg,
        error: false,
      });

      // Call a success function to notify that the edit was successful
      onEditSuccess();
    } catch (error) {
      console.error(error);

      setAlerta({
        msg: 'An error occurred while editing the product.',
        error: true,
      });
    }
  };

  return (
    <>
      {alerta.msg && <Alerta alerta={alerta} />}
      <div className="container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="flex">
            <label>
              <input
                className="input"
                type="text"
                id="nombre"
                name="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
              <span>Nombre</span>
            </label>

            <label>
              <input
                className="input"
                type="text"
                id="precio"
                name="precio"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                required
              />
              <span>Precio</span>
            </label>
          </div>

          <label>
            <input
              className="input"
              type="text"
              id="descripcion"
              name="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
            <span>Descripción</span>
          </label>

          <label>
            <input
              className="input"
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={(e) => setImagen(e.target.files[0])}
            />
            <span>Imagen</span>
          </label>

          <button className="submit">Editar</button>
        </form>
      </div>
    </>
  );
}

export default EditProduct;
