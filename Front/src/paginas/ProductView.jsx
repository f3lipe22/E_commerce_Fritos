import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import ProductoView from '../components/Card_product_view';
import CreatePedido from '../components/Create_pedido';
import Modal from '../components/Modal';
import axios from 'axios';


const ProductView = ({ match }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [data, setData] = useState(null);
  const { id } = match.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:7777/api/productos/buscar/${id}`);
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, [id]);

  const openModal = (productId) => {
    console.log('Abriendo modal de edición para el producto con ID:', productId);
  
    if (Array.isArray(data)) {
      const product = data.find((item) => item._id === productId);
      if (product) {
        setProductToEdit(product);
        setIsModalOpen(true);
      } else {
        console.log('Producto no encontrado en el array');
      }
    } else if (data && data._id === productId) {
      // Tratar data como un objeto individual
      setProductToEdit(data);
      setIsModalOpen(true);
    } else {
      console.log('Producto no encontrado en data');
    }
  };
  

  const closeModal = () => {
    console.log('Modal cerrado');
    setProductToEdit(null); // Limpiar el producto al cerrar el modal
    setIsModalOpen(false);
  };

  return (
    <>
      {data && (
        <ProductoView
          imagen={data.imagen}
          title={data.nombre}
          price={data.precio}
          description={data.descripcion}
          modal={() => openModal(id)}
        />
      )}

      {productToEdit && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Validar pedido</h2>
          <br />
          <CreatePedido productoEditado={productToEdit} />
          {/* <CreatePedido productoEditado={productToEdit} onEditSuccess={closeModal} /> */}
          <br />
          <button className='close-button' onClick={closeModal}>
            X
          </button>
        </Modal>
      )}

    </>
  );
};

export default withRouter(ProductView);