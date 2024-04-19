import React from 'react'
import styled from '@emotion/styled'


const Porta = styled.section`

margin: 70px 70px;
`

const Titular = styled.h1`
font-family: 'Manrope';
font-style: Bold;
font-weight: 800;
font-size: 36px;
line-height: 50px;
letter-spacing: -0.01em;
color: #14183E;
mix-blend-mode: normal;
`

const Colapsable = styled.div`
font-family: 'Manrope';
font-style: ExtraLight;
font-weight: 500;
font-size: 16px;
line-height: 26px;
letter-spacing: -0.01em;
color: #14183E;
mix-blend-mode: normal;
`
const Titulos = styled.h2`
font-family: 'Manrope';
font-style: Bold;
font-weight: 800;
font-size: 16px;
line-height: 24px;
letter-spacing: -0.01em;
color: #14183E;
mix-blend-mode: normal;
`
const Questions = () => {
  return (
    <>
            
        <Porta>   
        <Titular>🤔• Preguntas? </Titular>

        <Colapsable>
        <div id="accordion">
            <div className="card">
            <div className="card-header">
                <a className="btn" data-bs-toggle="collapse" href="#collapseOne">
                <Titulos>¿Realizan Domicilios?</Titulos>
                </a>
            </div>
            <div id="collapseOne" className="collapse show" data-bs-parent="#accordion">
                <div className="card-body">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting
                </div>
            </div>
            </div>
            <div className="card">
            <div className="card-header">
                <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseTwo">
                <Titulos>¿Servicio Contraentrega?</Titulos>
            </a>
            </div>
            <div id="collapseTwo" className="collapse" data-bs-parent="#accordion">
                <div className="card-body">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting
                </div>
            </div>
            </div>
             <div className="card">
            <div className="card-header">
                <a className="collapsed btn" data-bs-toggle="collapse" href="#collapseThree">
                <Titulos>¿Reciben tarjeta de credito/debito?</Titulos>
                </a>
            </div>
            <div id="collapseThree" className="collapse" data-bs-parent="#accordion">
                <div className="card-body">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen
                book. It has survived not only five centuries, but also the leap into electronic typesetting               
                </div>
            </div>
            </div>
        </div>
        </Colapsable>
        </Porta>
   
    </>
  )
}

export default Questions