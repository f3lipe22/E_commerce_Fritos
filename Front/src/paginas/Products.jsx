import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import Modal from "../components/Modal";
import CreateProduct from "../components/Create_product";
import EditProduct from "../components/Edit_product";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import Alerta from '../components/Alerta';

import '../css/table.css';

const Contenedor = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  padding: 30px;
`;

const Products = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [alerta, setAlerta] = useState({});

  //Obtener datos desde DB
  useEffect(() => {
    axios.get('http://localhost:7777/api/productos/listar')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      });
  }, []);

  
  //Ventana Modal
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openDeleteConfirmation = (productId) => {
    setProductToDelete(productId);
  };
  const confirmDelete = () => {
    axios.delete(`http://localhost:7777/api/productos/eliminar/${productToDelete}`)
      .then((response) => {
        setData(data.filter((item) => item._id !== productToDelete));
        setProductToDelete(null);
        setAlerta({
          msg: data.msg,
          error: false,
        });
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
      });
  };
  const openEditModal = (productId) => {
    console.log('Abriendo modal de edición para el producto con ID:', productId);
    const product = data.find((item) => item._id === productId);
    setProductToEdit(product);
    setIsEditModalOpen(true);
  };

  const { msg } = alerta;

  return (
    <>
      {msg && <Alerta alerta={alerta} />}
      <Contenedor>
        <div className='container'>
          <button className='submit' onClick={openModal}>Crear Producto</button>
        </div>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Precio</th>
              <th>Descripcion</th>
              <th>Imagen</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.nombre}</td>
                <td>{item.precio}</td>
                <td>{item.descripcion}</td>
                <td>
                <img src={'http://localhost:7777' + item.imagen} width={'100px'} />
                  </td>
                <td className='center'>
                  <a href="#" className='iconos' onClick={() => openEditModal(item._id)}><FaPencilAlt/></a>
                  <a href="#" className='trash' onClick={() => openDeleteConfirmation(item._id)}><FaTrash/></a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Contenedor>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <h3>Crear producto</h3>
        <br />
        <CreateProduct />
        <br />
        <button className='close-button' onClick={closeModal}>X</button>
      </Modal>
      <Modal isOpen={isEditModalOpen} closeModal={() => setIsEditModalOpen(false)}>
        {productToEdit && (
          <>
            <h3>Editar producto</h3>
            <br />
            <EditProduct productoEditado={productToEdit} onEditSuccess={() => setIsEditModalOpen(false)} />
            <br />
            <button className='close-button' onClick={() => setIsEditModalOpen(false)}>X</button>
          </>
        )}
      </Modal>
      <Modal isOpen={productToDelete !== null} closeModal={() => setProductToDelete(null)}>
        <h3>Confirmar eliminación</h3>
        <p>¿Estás seguro de que deseas eliminar este producto?</p>
        <button className='submit' onClick={confirmDelete}>Eliminar</button>
      </Modal>
    </>
  );
};

export default Products;
