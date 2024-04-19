import React from 'react'
import "../css/footer.css"
import styled from '@emotion/styled'
import Logo from "../img/logo.png"
import { BsFacebook } from "react-icons/bs";
import { BsYoutube } from "react-icons/bs";
import { AiFillInstagram } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";


const Imagen = styled.img`
    width: 50%;
    margin: 30px 30px;
    border-radius: 50px;

    @media screen and (max-width: 1160px) {

    }
    @media screen and (max-width: 950px) {

    }
    @media screen and (max-width: 768px) {
        width: 80%;
    }

`


export const Footer = () => {
  return (
    <footer className="pie-pagina">
    <div className="grupo-1">
        <div className="box">
            <figure>
                <a href="#">
                <Imagen
                    src={Logo}
                />	
                </a>
            </figure>
        </div>
        <div className="box">
            <h2>SOBRE NOSOTROS</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, ipsa?</p>
        </div>
        <div className="box">
            <h2>SIGUENOS</h2>
            <div className="red-social">
               
                <a href="#"><BsFacebook/></a>
                <a href="#"><BsTwitter/></a>
                <a href="#"><AiFillInstagram/></a>
                <a href="#"><BsYoutube/></a>
            </div>
        </div>
    </div>
    <div className="grupo-2">
        <small>&copy; 2023 <b>Palacio de los Fritos</b> - Todos los Derechos Reservados.</small>
    </div>
</footer>

  )
}
export default Footer