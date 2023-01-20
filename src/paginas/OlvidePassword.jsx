import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

function OlvidePassword() {

  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});
  
  const handleSubmit = async e => {
    e.preventDefault();

    if(email === '' || email.length < 6){
      setAlerta({msg: 'El Email es Obligatorio', error: true})
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    try {
      const {data} = await clienteAxios.post('/ginecologos/olvide-password', {email});

      console.log(data);

      setAlerta({msg: data.msg});
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
          Recupera tu {""}<span className="text-8xl">Acceso {""}</span>mediante tu {""}<span className="text-black font-sans">Correo</span>
        </h1>
      </div>

      <div className=" mt-5 text-center shadow-lg px-5 py-5 rounded-3xl bg-white">
        { msg && <Alerta 
            alerta={alerta}
          />
        }
        <form
          onSubmit={handleSubmit}
        >
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
          <input type="submit" value="Recuperar Password" className="bg-indigo-600 mt-3 text-center w-52 py-3 rounded-xl text-white uppercase font-bold hover:cursor-pointer hover:bg-indigo-800"/>
        </form>
        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link to="/" className='block my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
          <Link to="/registrar" className='block my-5 text-gray-500'>¿No tienes una cuenta? Regístrate aquí</Link>
        </nav>
      </div>
      </>
    )
  }
  
  export default OlvidePassword;