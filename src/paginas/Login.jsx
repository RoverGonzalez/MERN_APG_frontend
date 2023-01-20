import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const {setAuth} = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email, password].includes('')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
    }

    setTimeout(() => {
      setAlerta({});
    }, 3000);

    try {
      const url = "/ginecologos/login";
      const {data} = await clienteAxios.post(url, {email, password});

      localStorage.setItem('token', data.token);

      setAuth(data);

      navigate('/admin');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl text-center">
          Inicia sesión y {""}<span className="text-8xl">Administra {""}</span>tus <span className="text-black font-sans">Pacientes</span>
        </h1>
      </div>

      <div className=" mt-5 text-center shadow-lg px-5 py-5 rounded-3xl bg-white">
        {msg && <Alerta 
          alerta={alerta}
        />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Email
            </label>
            <input 
              type="email" 
              placeholder="Email de Registro" 
              className="border w-96 p-3 mt-3 bg-gray-100 rounded-xl text-center"
              value={email}
              onChange={e => setEmail(e.target.value)}
              />
          </div>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Password
            </label>
            <input 
              type="password" 
              placeholder="Tu Password" 
              className="border w-96 p-3 mt-3 bg-gray-100 rounded-xl text-center"
              value={password}
              onChange={e => setPassword(e.target.value)}
              />
          </div>
          <input type="submit" value="Iniciar Sesión" className="bg-indigo-600 mt-3 text-center w-36 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"/>
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/registrar" className='block my-5 text-gray-500'>¿No tienes una cuenta? Regístrate aquí</Link>
          <Link to="/olvide-password" className='block my-5 text-gray-500'>Olvide mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Login;