import React from 'react'
import styled from '@emotion/styled'
import MapsApi from "./MapsApi"


const Texto = styled.h2 `   
    color: #000000;
    margin: 50px 120px;
    font-size:30px;
    @media screen and (max-width: 1160px) {

    }
    @media screen and (max-width: 950px) {

    }
    @media screen and (max-width: 768px) {
        font-size: 20px;
        margin: 20px 20px;
    }
`

const Contenedor2 = styled.div`
    max-width: 100%;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #dddddd;
`

const Contenedor3 = styled.div`
height:800px;
`

export const Maps = () => {
  return (
<>
   
    <Contenedor2>
        <Texto> 
          Estamos ubicados en la Universidad Surcolombiana
        </Texto>
    </Contenedor2>

    <Contenedor3>
        <MapsApi/>
    </Contenedor3>
</>
  )
}
export default Maps