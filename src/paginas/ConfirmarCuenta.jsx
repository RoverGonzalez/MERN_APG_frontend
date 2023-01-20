import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

function ConfirmarCuenta() {

    const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
    const [cargando, setCargando] = useState(true);
    const [alerta, setAlerta] = useState({});

    const params = useParams();
    const {id} = params;

    useEffect(() => {
      const confirmarCuenta = async() => {
        try {
          const url = `/ginecologos/confirmar/${id}`;
          const {data} = await clienteAxios(url);
          setCuentaConfirmada(true);
            setAlerta({
              msg: data.msg,
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
        setCargando(false);
      }
      confirmarCuenta();
    }, [])


    return (
      <>
        <div>
          <h1 className="text-indigo-600 font-black text-6xl text-center">
            Confirma tu Usuario y Empieza a {""}<span className="text-8xl">Administrar {""}</span>tus <span className="text-black font-sans">Pacientes</span>
          </h1>
        </div>

        <div className=" mt-5 text-center shadow-lg px-5 py-5 rounded-3xl bg-white">
          {!cargando && <Alerta 
            alerta={alerta}
          />}
          {cuentaConfirmada && (
            <nav className='mt-10'>
              <Link to="/" className='block my-5 text-gray-500'>¡Ya tienes una cuenta! Inicia Sesión</Link>
            </nav>
          )}
      </div>
      </>
    )
  }
  
  export default ConfirmarCuenta;