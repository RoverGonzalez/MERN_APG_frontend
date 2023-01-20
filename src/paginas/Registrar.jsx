import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

function Registrar() {

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Todos los campos son obligatorios', error: true});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    if(password !== repetirPassword){
      setAlerta({msg: 'Los Password no coinciden', error: true});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    if(password.length < 6){
      setAlerta({msg: 'El password debe tener mas de 6 caracteres', error: true});
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    setAlerta({});

    // Crear el usuario en la api
    try {
      const url = "/ginecologos";
      await clienteAxios.post(url, {nombre, email, password});
      setAlerta({
        msg: 'Creado Correctamente, revisa tu email',
        error: false
      })
      setTimeout(() => {
        setAlerta({});
      }, 3000);
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
            Crea tu Usuario y {""}<span className="text-8xl">Administra {""}</span>tus <span className="text-black font-sans">Pacientes</span>
          </h1>
        </div>

        <div className=" mt-5 text-center shadow-lg px-5 py-5 rounded-3xl bg-white">
          {msg && <Alerta 
            alerta={alerta}
          />}
        <form onSubmit={handleSubmit}>
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Nombre
            </label>
            <input 
              type="text" 
              placeholder="Tu Nombre" 
              className="border w-96 p-3 mt-3 bg-gray-100 rounded-xl text-center" 
              value={nombre} 
              onChange={e => setNombre(e.target.value)}
            />
          </div>
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
          <div className="my-5">
            <label className="uppercase text-gray-600 block text-xl font-bold">
              Repetir Password
            </label>
            <input 
              type="password" 
              placeholder="Repite Tu Password" 
              className="border w-96 p-3 mt-3 bg-gray-100 rounded-xl text-center"
              value={repetirPassword} 
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input type="submit" value="Registrarme" className="bg-indigo-600 mt-3 text-center w-36 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"/>
        </form>
        <nav className='mt-10'>
          <Link to="/" className='block my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
        </nav>
      </div>
      </>
    )
  }
  
  export default Registrar;