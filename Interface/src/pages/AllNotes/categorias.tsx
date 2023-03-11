import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css"
import { useEffect, useState } from "react";
import { deletNotas, getAllNotas, getAllNotasOldYoung, getAllNotasYoungOld, getNotas } from "../../api/notas";
import { Categoria, Nota } from "../../interfaces";
import { cartelError } from "../../components/carteles/cartelError";
import { getCategoria } from "../../api/categorias";
import { cartelOk } from "../../components/carteles/cartelesOkey";

export default function categoria(){
    const navigate = useNavigate();
    const id_categoria:number = Number((useLocation().pathname).split("/")[2])
    const [orden , setOrden] = useState<string>("Default");
    const [categoria , setCategoria] = useState<Categoria>();
    const [notas , setNotas] = useState<Nota[]>([])
    
    useEffect(() => {
        obtenerNotasDefault()
        obtenerCategoria()
    }, [])
    
    const obtenerNotasDefault = async () => {
        const data:Nota[] | undefined = await getAllNotas()
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setNotas(data.filter(n => n.categoria === id_categoria))
    }

    const obtenerNotasOldYoung = async () => {
        const data:Nota[] | undefined = await getAllNotasOldYoung()
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setNotas(data.filter(n => n.categoria === id_categoria))
    }

    const obtenerNotasYoungOld = async () => {
        const data:Nota[] | undefined = await getAllNotasYoungOld()
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setNotas(data.filter(n => n.categoria === id_categoria))
    }

    const obtenerCategoria = async () => {
        const data:Categoria | undefined = await getCategoria(id_categoria)
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setCategoria(data)
    }

    const cambiarOrden = (type:string | undefined) => {
        if(orden === type) return; 
        if(type !== undefined) setOrden(type)
        if(type === "Default") obtenerNotasDefault()
        else if(type === "Young - Old") obtenerNotasYoungOld()
        else if(type === "Old - Young") obtenerNotasOldYoung()
    }

    const eliminar = async (id:number) => {
        const resultado = await deletNotas(id)
        if(!resultado) cartelError("Error a la Hora de Eliminar")
        if(resultado) cartelOk("Eliminar con Exito")
        cambiarOrden(undefined);
    }

    return (
        <div className="d-flex" style={{backgroundColor: "black" , height: "auto" , width: "100%"}}>
            <div style={{width: "20%" , height: "96vh" , content: ""}}></div>
            <div className="d-flex flex-column" style={{width: "80%" , height: "96vh"}}>
                <div className="box-orden-categorias-all"> 
                    <select onChange={e => cambiarOrden(e.target.value)}>
                        <option>Default</option>
                        <option>Old - Young</option>
                        <option>Young - Old</option>
                    </select>
                    <div className="box-orden-categorias-all-div">
                        <h1>{categoria && categoria.nombre}</h1>
                    </div>
                    <div style={{width: "18%" , height: "35px" , content: ""}}></div>
                </div>
                <div className="row box-categorias-all">
                    {notas.length !== 0 && notas.map((n , i) => 
                        <div key={i} className="box-notas-end">
                            <div>
                                <p onClick={e => {e.preventDefault() ; navigate(`/view/${n.id}`)}}>{n.nombre}</p>
                                <div className="box-notas-bottom centrado">
                                    <button 
                                        style={{backgroundColor: "blue"}} 
                                        onClick={e => {e.preventDefault() ; navigate(`/notas/${n.id}`)}}
                                    ></button>
                                </div>
                                <div className="box-notas-bottom centrado">
                                    <button 
                                        style={{backgroundColor: "red"}} 
                                        onClick={e => {e.preventDefault() ; eliminar(n.id)}}
                                    ></button>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="box-final-categorias">
                        <p>
                            End
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}