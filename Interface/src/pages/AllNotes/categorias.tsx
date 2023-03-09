import { useNavigate } from "react-router-dom";
import "../../App.css"
import { useState } from "react";

export default function categoria(){
    const navigate = useNavigate();
    const [seleccionado , setSeleccionado] = useState<string>("Old - Young");
    const notas: string[] = ["name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name" , "name"]

    const eliminar = (id:Number) => {
        return
    }

    return (
        <div className="d-flex" style={{backgroundColor: "black" , height: "auto" , width: "100%"}}>
            <div style={{width: "20%" , height: "96vh" , content: ""}}></div>
            <div className="d-flex flex-column" style={{width: "80%" , height: "96vh"}}>
                <div className="box-orden-categorias-all"> 
                    <select onChange={e => setSeleccionado(e.target.value)}>
                        <option>Old - Young</option>
                        <option>Young - Old</option>
                    </select>
                    <div className="box-orden-categorias-all-div">
                        <h1>amaro</h1>
                    </div>
                    <div style={{width: "18%" , height: "35px" , content: ""}}></div>
                </div>
                <div className="row box-categorias-all">
                    {notas.length !== 0 && notas.map((n , i) => 
                        <div key={i} className="box-notas-end">
                            <span onClick={e => {e.preventDefault() ; navigate(`/view/${i}`)}}>
                                19-03
                            </span>
                            <div>
                                <p onClick={e => {e.preventDefault() ; navigate(`/view/${i}`)}}>{n}</p>
                                <div className="box-notas-bottom centrado">
                                    <button 
                                        style={{backgroundColor: "blue"}} 
                                        onClick={e => {e.preventDefault() ; navigate(`/notas/${i}`)}}
                                    ></button>
                                </div>
                                <div className="box-notas-bottom centrado">
                                    <button 
                                        style={{backgroundColor: "red"}} 
                                        onClick={e => {e.preventDefault() ; eliminar(i)}}
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