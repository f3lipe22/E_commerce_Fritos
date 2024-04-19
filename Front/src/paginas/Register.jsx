import { useState } from 'react'
import styled from '@emotion/styled'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import "../css/Form_login_register.css"
import axios from 'axios'

const Contenedor = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-top:40px;
  margin-bottom:40px;
  `


const Registrar = () => {



  const[ nombre, setNombre] = useState('')
  const[ direccion, setDireccion] = useState('')
  const[ email, setEmail] = useState('')
  const[ password, setPassword] = useState('')
  const[ repetirPassword, setRepetirPassword] = useState('')
  const[alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if([ nombre, email, direccion, password, repetirPassword].includes('')) {
        setAlerta({
          msg: 'Todos los campos son obligatorios',
          error: true
        })
        return 
    }

    if(password !== repetirPassword) {
      setAlerta({
        msg: 'Los password no son iguales',
        error: true
      })
      return 
    }

    if(password.lenght < 6) {
      setAlerta({
        msg: 'El Password es muy corto, mínimo 6 caracteres',
        error: true
      })
      return 
    }

    setAlerta({})

    // Crear usuario en la API
   try {
      const { data } = await axios.post('http://localhost:7777/api/usuarios', {nombre, direccion, email, password})

      setAlerta({
        msg: data.msg,
        error: false
      })

      setNombre('');
      setEmail('');
      setDireccion('');
      setPassword('');
      setRepetirPassword('');
      
   } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
   }
  }

  const { msg } = alerta

  return (
    <>
      <>  
        <Contenedor>
      
          <div className="container6">
         
            <div className="form-container">
                <br />
                <div className='text'>
                 <h1>Regístrate</h1>
                 { msg && <Alerta alerta={alerta} />}
                </div>
              <form className="" onSubmit = {handleSubmit}>
                <div className="form_register">
                
                  <div className="column">
                 
                    <div className="">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="nombre"
                        >Nombre</label>
                        <input
                            id="nombre"
                            type="text"
                            placeholder=""
                            className="input_login"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                      </div>

                    <div className="">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="direccion"
                        >Direccion</label>
                        <input
                            id="direccion"
                            type="text"
                            placeholder=""
                            className="input_login"
                            value={direccion}
                            onChange={e => setDireccion(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="email"
                        >Correo electronico</label>
                        <input
                            id="email"
                            type="email"
                            placeholder=""
                            className="input_login"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                  </div>
                  <div className="column">
                    <div className="">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password"
                        >Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            placeholder=""
                            className="input_login"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="">
                        <label 
                            className="uppercase text-gray-600 block text-xl font-bold"
                            htmlFor="password2"
                        >Repetir Contraseña</label>
                        <input
                            id="password2"
                            type="password"
                            placeholder=""
                            className="input_login"
                            value={repetirPassword}
                            onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                  </div>
                </div>
                <br />
                  <div className='Container_option'>
                    <input type="submit" value="Crear Cuenta" className="buttonl" />
                  </div>
                    <br />
              </form>
                          
            </div>
          </div>
        </Contenedor>
      </>  
   </>
  )
}

export default Registrar