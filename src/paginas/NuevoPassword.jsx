import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {

  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const {token} = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/ginecologos/olvide-password/${token}`);
        setAlerta({
          msg: 'Coloca tu nuevo password'
        })
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: 'Hubo un error con el enlace',
          error: true
        })
      }
    }
    comprobarToken();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password.length < 6){
      setAlerta({
        msg: 'El password debe ser mayor a 6 caracteres',
        error: true
      })
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      const url = `/ginecologos/olvide-password/${token}`;
      const {data} = await clienteAxios.post(url, {password});

      setAlerta({
        msg: data.msg
      })
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      setPasswordModificado(true);
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
          Recupera tu password y no pierdas {""}<span className="text-8xl">Acceso {""}</span>a tus <span className="text-black font-sans">Pacientes</span>
        </h1>
      </div>

      <div className=" mt-5 text-center shadow-lg px-5 py-5 rounded-3xl bg-white">

      {msg && <Alerta 
        alerta={alerta}
      />}

      {tokenValido && (
      <>
        <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label className="uppercase text-gray-600 block text-xl font-bold">
            Nuevo Password
          </label>
          <input 
            type="password" 
            placeholder="Tu Nuevo Password" 
            className="border w-96 p-3 mt-3 bg-gray-100 rounded-xl text-center"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
          <input type="submit" value="Guardar Nuevo Password" className="bg-indigo-600 mt-3 text-center w-60 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"/>
          </form>
        {passwordModificado && 
          <nav className='mt-10'>
            <Link to="/" className='block my-5 text-gray-500'>¡Ya tienes una cuenta! Inicia Sesión</Link>
          </nav>
        }
      </>
      )}
        </div>
    </>
  )
}

export default NuevoPassword;