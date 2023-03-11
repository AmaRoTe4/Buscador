import { useEffect, useState } from "react";
import "../App.css"
import { Categoria, Nota } from "../interfaces"
import { cartelError } from "../components/carteles/cartelError";
import { getAllCategorias } from "../api/categorias";
import { useLocation } from "react-router-dom";
import { getNotas, updateNotas } from "../api/notas";
import { cartelOk } from "../components/carteles/cartelesOkey";

const defaultNota:Nota = {
    id:0,
	nombre:"",
	categoria:0,
	jerarquia:0,
	color:"rgb(0 0 0)",
	createdAt:"0 - 0",
	text:"",
}

const defaultCategoria:Categoria = {
    id:0,
	nombre:"",
	jerarquia:100,
	color:"",
	createdAt:"",
}

export default function Init(){
    const id_nota:number = Number((useLocation().pathname).split("/")[2])
    const [editar , setEditar] = useState<boolean>(false);
    const [nota , setNota] = useState<Nota>(defaultNota);
    const [categoriasSel , setCategoriasSel] = useState<Categoria>(defaultCategoria)


    const [categorias , setCategorias] = useState<Categoria[]>([])

    useEffect(() => {
        obtenerNota()
        obtenerCategoria()
    }, [])
    
    const obtenerNota = async () => {
        const data:Nota | undefined = await getNotas(id_nota)
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setNota(data)
    }

    const obtenerCategoria = async () => {
        const data:Categoria[] | undefined = await getAllCategorias()
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setCategorias(data)

        const categoriaSal:Categoria | undefined = data.find(n => n.id === nota.id)
        if(categoriaSal !== undefined) setCategoriasSel(categoriaSal)
    }

    const actualizar = async () => {
        const resultado:boolean = await updateNotas(id_nota , nota)
        if(!resultado) cartelError("Error de Conexion")
        if(resultado) cartelOk("Actualizado Con Exito")
    }

    return (
        <div className="content-box centrado flex-column">
            <div className="d-flex justify-content-start align-items-center" style={{width: "100vw" , height: "16vh"}}>
                <h1 style={{marginLeft: 25}}>
                    View
                </h1>
            </div>
            {nota.id !== 0 && <div className="d-flex" style={{width: "100vw" , height: "86vh"}}>

                <div className="d-flex flex-column align-items-center" style={{width: "20vw" , height: "100%"}}>
                    <div className="box-input-view">
                        <label>Nombre</label>
                        <input 
                            placeholder="Nombre"
                            style={{width: '16.5vw' , padding: 10}}
                            disabled={!editar}
                            type="text" 
                            value={nota.nombre}
                            onChange={e => setNota({
                                id:nota.id,
	                            nombre: e.target.value,
	                            categoria: nota.categoria,
	                            jerarquia: nota.jerarquia,
	                            color: nota.color,
	                            createdAt: nota.createdAt,
	                            text: nota.text,
                            })}
                        />
                    </div>
                    <div className="box-input-view">
                        <label>Jerarquia</label>
                        <input
                            max={100}
                            min={1}
                            placeholder="Jerarquia"
                            style={{width: '16.5vw', padding: 10}}
                            disabled={!editar}
                            type="number"
                            value={nota.jerarquia}
                            onChange={e => 
                                //@ts-ignore
                                e.nativeEvent.data !== undefined ?
                                setNota({
                                    id:nota.id,
	                                nombre: nota.nombre,
	                                categoria: nota.categoria,
	                                jerarquia: 
                                        Number(e.target.value) > 100 
                                        ? 100 : Number(e.target.value) < 1 
                                        ? 1 : Number(e.target.value),
	                                color: nota.color,
	                                createdAt: nota.createdAt,
	                                text: nota.text,
                                }) : ""}
                        />
                    </div>
                    {categorias.length > 0 && <div className="box-input-view">
                        <label>Categorias</label>
                        <select
                            style={{padding: 5}}
                            disabled={!editar}
                            onChange={e => setNota({
                                id:nota.id,
	                            nombre: nota.nombre,
                                //@ts-ignore
	                            categoria: categorias.find(n => n.nombre === e.target.value).id,
	                            jerarquia: nota.jerarquia,
	                            color: nota.color,
	                            createdAt: nota.createdAt,
	                            text: nota.text,
                            })}>
                            {categorias.map((n , i) => 
                                <option key={i}>{n.nombre}</option>
                            )}
                        </select>
                    </div>}
                    <div className="box-input-view">
                        <label>Color</label>
                        <input 
                            style={{width: '16.5vw' , padding: 5}}
                            disabled={!editar}
                            type="color" 
                            value={nota.color}
                            onChange={e => setNota({
                                id:nota.id,
                                nombre: nota.nombre,
                                categoria: nota.categoria,
                                jerarquia: nota.jerarquia,
                                color: e.target.value,
                                createdAt: nota.createdAt,
                                text: nota.text,
                            })}
                        />
                    </div>
                    <div className="box-input-view">
                        <label style={{width: "90%" , height: "40%"}}>Update</label>
                        <input 
                            checked={editar}
                            onChange={e => setEditar(!editar)}
                            type="checkbox" 
                            style={{width: "90%" , height: "40%"}} 
                        />
                    </div>
                    <div className="box-input-view">
                        <button 
                            disabled={!editar} 
                            className="btn btn-success" 
                            onClick={e => {e.preventDefault() ; actualizar()}}
                        >
                            Actualizar
                        </button>
                    </div>
                </div>
                
                <div className="d-flex justify-content-center" style={{width: "80vw" , height: "100%"}}>
                    
                    <textarea
                        className="textTareaView"
                        placeholder="Text"
                        value={nota.text}
                        disabled={!editar}
                        onChange={e => setNota({
                            id:nota.id,
                            nombre: nota.nombre,
                            categoria: nota.categoria,
                            jerarquia: nota.jerarquia,
                            color: nota.color,
                            createdAt: nota.createdAt,
                            text: e.target.value,
                        })}
                        style={{width: "90%" , height: "90%"}} 
                    />
                
                </div>
            
            </div>}
        </div>
    )
}