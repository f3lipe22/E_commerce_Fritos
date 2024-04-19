import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled'
import Intro from "../components/Portada"
import CardP from "../components/Card_product"
import Questions from "../components/Questions"
import axios from 'axios';
// import Maps from "../components/Maps"

// import ImagenPastel from "../img/pastel.png"
// import ImagenEmpanada from "../img/empanada.png"
// import ImagenArepa from "../img/arepa.png"
// import { Link } from "react-router-dom"


const Contenedor = styled.div`
  width: 100%;
  background-color: #dddddd;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  padding:20px;

  `


  const Heading = styled.a `
  font-family: 'Lato', sans-serif;
  Color: #000000;
  font-size: 25px;
  `



const Home = () => {

  const [data, setData] = useState([]);

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

    
  return (
    <>
      <Intro />
        <Contenedor>
          <Heading>
            {/* <Link to='/product'>
              <a>Ver todos los productos</a>
            </Link> */}
            <h3>Nuestros Productos</h3>
            </Heading> 
        </Contenedor>
      <Contenedor>

      
      {data.map((producto, index) => (
        <CardP
          key={index}
          title={producto.nombre}
          price={producto.precio}
          imagen={producto.imagen}
          enlace={producto._id}
        />
      ))}
      
        {/* <CardP title="Empanada Dorada" price="$1.500" imagen={ImagenEmpanada}  />	  */}
  
      </Contenedor>
      <Questions/>  
      {/* <Maps/> */}
    </>
  )
}
export default Home