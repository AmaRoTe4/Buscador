import { useNavigate } from "react-router-dom";
import "../../App.css"
import { useEffect, useState } from "react";
import { Categoria } from "../../interfaces";
import { getAllCategorias } from "../../api/categorias";
import { cartelError } from "../../components/carteles/cartelError";

export default function Init(){
    const navigate = useNavigate();
    const [orden , setOrden] = useState<string>("Default");
    const [categorias , setCategorias] = useState<Categoria[]>([])

    useEffect(() => {
        obtenerCategorias()
    }, [])
    
    const obtenerCategorias = async () => {
        const data:Categoria[] | undefined = await getAllCategorias()
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setCategorias(data)
    }
    
    return (
        <div className="d-flex" style={{backgroundColor: "black" , height: "auto" , width: "100%"}}>
            <div style={{width: "20%" , height: "96vh" , content: ""}}></div>
            <div className="d-flex flex-column" style={{width: "80%" , height: "96vh"}}>
                <div className="box-orden-categorias-all"> 
                    <select>
                        <option>Default</option>
                        {/*<option>Old - Young</option>
                        <option>Young - Old</option>*/}
                    </select>
                </div>
                <div className="row box-categorias-all">
                    {categorias.length !== 0 && categorias.map((n , i) => 
                        <div key={i} className="cuadro-de-categorias" onClick={e => {e.preventDefault() ; navigate(`/allNotes/${n.id}`)}}>
                            <p>
                                {n.nombre}
                            </p>
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