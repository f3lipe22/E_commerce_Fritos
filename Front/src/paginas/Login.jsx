import React, { useState } from 'react';
import styled from '@emotion/styled';
import Alerta from '../components/Alerta';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../css/Form_login_register.css';

const Contenedor = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const Registrar = () => {
  // ... Tu código de Registro aquí
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true,
      });
      return;
    }

    setAlerta({});

    // Iniciar sesión en la API
    try {
      const { data } = await axios.post('http://localhost:7777/api/usuarios/login', {
        email,
        password,
      });

      setAlerta({
        msg: data.msg,
        error: false,
      });

      setEmail('');
      setPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
    <br /><br />
     {msg && <Alerta alerta={alerta} />}
      <Contenedor>
     
        <div className="container5">
          <div className="form-container">
            <form className="form_login" onSubmit={handleSubmit}>
              <h1>Iniciar Sesión</h1>
              <br />
              <input
                className="input_login"
                type="email"
                placeholder="Correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input_login"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <br />
                <input type="submit" value="Iniciar Sesión" className="buttonl" />
              <br />
              <p>
                ¿No tienes una cuenta? <Link to="/register">¡Regístrate aquí!</Link>
              </p>
            </form>
          </div>
        </div>
      </Contenedor>
    </>
  );
};

export default Login;
