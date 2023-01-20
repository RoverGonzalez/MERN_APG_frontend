import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});

    const {guardarPaciente, paciente} = usePacientes();

    useEffect(() => {
        if(paciente?.nombre){
            setNombre(paciente.nombre);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            setId(paciente._id);
        }
    }, [paciente]);

    const handleSubmit = e => {
        e.preventDefault();
        if([nombre, email, fecha, sintomas].includes('')){
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }

        setAlerta({});

        guardarPaciente({nombre, email, fecha, sintomas, id});
        setAlerta({
            msg: 'Guardado Correctamente'
        })

        setNombre('');
        setEmail('');
        setFecha('');
        setSintomas('');
        setId('');

        setTimeout(() => {
            setAlerta({})
        }, 3000);
    }

    const {msg} = alerta;

  return (
    <>
        <h2 className="font-black text-3xl text-center ">Administrador de Pacientes</h2>

        <p className="text-xl mt-5 mb-10 text-center">Añade tus paciente y {''}
          <span className="text-indigo-600 font-bold"> Administralos</span>
          </p>

        {msg && <Alerta alerta={alerta} />}

        <form
            className="bg-white md:10 py-10 px-5 mb-10 lg:mb-0 rounded-3xl shadow-md"
            onSubmit={handleSubmit}
        >
            <div className="mb-5">
                <label 
                htmlFor="paciente"
                className="text-gray-700 text-center uppercase font-bold"
                >Nombre del Paciente</label>
                <input
                    id="paciente" 
                    type="text" 
                    placeholder="Nombre del paciente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-3xl"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                htmlFor="email"
                className="text-gray-700 text-center uppercase font-bold"
                >Email del Paciente</label>
                <input
                    id="email" 
                    type="email" 
                    placeholder="Email del paciente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-3xl"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                htmlFor="fecha"
                className="text-gray-700 text-center uppercase font-bold"
                >Fecha Alta</label>
                <input
                    id="fecha" 
                    type="date" 
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-3xl"
                    value={fecha}
                    onChange={e => setFecha(e.target.value)}
                />
            </div>
            <div className="mb-5">
                <label 
                htmlFor="sintomas"
                className="text-gray-700 text-center uppercase font-bold"
                >Sintomas</label>
                <textarea
                    id="sintomas" 
                    type="text" 
                    placeholder="Sintomas del paciente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-3xl"
                    value={sintomas}
                    onChange={e => setSintomas(e.target.value)}
                />
            </div>
            <input 
                type="submit"
                value={id ? 'Guardar Cambios' : 'Agregar Paciente'}
                className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-3xl" 

            />
        </form>
    </>
  )
}

export default Formulario;