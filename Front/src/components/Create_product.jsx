import React, { useState } from 'react';
import '../css/form_add_product.css';
import Alerta from '../components/Alerta'
import axios from 'axios';

function CreateProduct() {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  // const [imagen, setImagen] = useState('');
  const[alerta, setAlerta] = useState({})
  const [imagenFile, setImagenFile] = useState(null);



  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([nombre, precio, descripcion, imagen].includes('')) {
      // Aquí puedes manejar la validación de campos obligatorios
      console.log('Todos los campos son obligatorios');
      return;
    }

    // Crear producto en la API
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('precio', precio);
    formData.append('descripcion', descripcion);
    formData.append('imagen', imagenFile);

  

    try {
      const { data } = await axios.post('http://localhost:7777/api/productos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });


      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('');
      setPrecio('');
      setDescripcion('');
      setImagen('');

      
    } catch (error) {
      console.error(error);
    }
  }


  const { msg } = alerta
  return (
    <>
     { msg && <Alerta alerta={alerta} />}
    <div className="container">
      
      <form className="form" onSubmit={handleSubmit}>

  
        <div class="flex">
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
        <span>Descripcion</span>
    </label> 
        
    <label>
    <input
      className="input"
      type="file"
      id="imagen"
      name="imagen"
      accept="image/*"
      onChange={(e) => setImagenFile(e.target.files[0])}
      required
    />

        <span>Imagen</span>
    </label>
  
    <button class="submit">Crear</button>
   
</form>


    
    
     
    
 
    </div>
    </>
  );
 
}

export default CreateProduct;
