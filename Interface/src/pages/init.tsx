import { Link } from "react-router-dom"
import "../App.css"
import { useEffect, useState } from "react"
import { getAllNotas, getAllNotasYoungOld } from "../api/notas"
import { Nota } from "../interfaces"
import { cartelError } from "../components/carteles/cartelError"

export default function Init(){
    const [ultimasNotas , setUltimasNomas] = useState<Nota[]>([])

    useEffect(() => {
        obtenerLasUltimasNotas()
    }, [])
    
    const obtenerLasUltimasNotas = async () => {
        const data:Nota[] | undefined = await getAllNotas()
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setUltimasNomas(data)
    }

    return (
        <div className="content-box centrado flex-column">
            <div className="centrado w100" style={{height: "25vh"}}>
                <h1>
                    Notes
                </h1>
            </div>
            <div className="d-flex flex-column w100 align-items-center" style={{height: "50vh"}}>
                <div className="centrado init-box-links">
                    <Link to="/notas/0">
                        New Note
                    </Link>
                </div>
                <div className="centrado init-box-links">
                    <Link to="/categorias/0">
                        New Categoria
                    </Link>
                </div>
                <div className="centrado init-box-links">
                    <Link to="/allNotes">
                        View Note
                    </Link>
                </div>
            </div>
            <ul 
                className="ultimas-notas d-flex flex-column align-items-center"
            >
                    {ultimasNotas.length > 0 && ultimasNotas.map((n , i) => 
                        <Link key={n.id} to={`/view/${n.id}`}>{n.nombre}</Link>
                    )}
            </ul>
        </div>
    )
}