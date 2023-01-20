import AdminNav from "../components/AdminNav";
import { useState } from "react";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {

  const {guardarPassword} = useAuth();

  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: ''
  });

  const handleSubmit = async e => {
    e.preventDefault();

    if(Object.values(password).some(campo => campo === '')){
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      })
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    if(password.pwd_nuevo.length < 6){
      setAlerta({
        msg: 'El password debe tener minimo 6 caracteres',
        error: true
      })
      setTimeout(() => {
        setAlerta({});
      }, 3000);
      return;
    }

    const respuesta = await guardarPassword(password);

    setAlerta(respuesta);

    setTimeout(() => {
      setAlerta({});
    }, 3000);

    window.location.reload();
  }

  const {msg} = alerta;

  return (
    <>
        <AdminNav />

        <h2 className="font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''} 
            <span className="text-indigo-600 font-bold">Password</span>
        </p>

        <div className="flex justify-center text-center">
            <div className="w-full md:w-1/2 bg-white shadow rounded-3xl p-5">
                {msg && <Alerta alerta={alerta} />}
                <form 
                    onSubmit={handleSubmit}
                >
                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Password Actual
                            <input 
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-3xl text-center text-black"
                                placeholder="Escribe tu password actual"
                                name="pwd_actual"
                                onChange={e => setPassword({
                                  ...password,
                                  [e.target.name] : e.target.value
                                })}
                                />
                        </label>
                    </div>

                    <div className="my-3">
                        <label htmlFor="" className="uppercase font-bold text-gray-600">Password Nuevo
                            <input 
                                type="password"
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-3xl text-center text-black"
                                placeholder="Escribe tu nuevo password"
                                name="pwd_nuevo"
                                onChange={e => setPassword({
                                  ...password,
                                  [e.target.name] : e.target.value
                                })}
                                />
                        </label>
                    </div>

                    <input 
                        type="submit" 
                        value="Actualizar Password"
                        className="bg-indigo-700 px-10 py-3 font-bold text-white rounded-3xl uppercase w-full mt-5 hover:cursor-pointer hover:bg-indigo-800"
                    />
                </form>
            </div>
        </div>
    </>
  )
}

export default CambiarPassword