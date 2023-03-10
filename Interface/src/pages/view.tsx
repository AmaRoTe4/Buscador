import { useState } from "react";
import "../App.css"
import { Categoria, Nota } from "../interfaces"

const defaultNota:Nota = {
    id:0,
	nombre:"",
	categoria:0,
	jerarquía:0,
	color:"rgb(0 0 0)",
	createdAt:"0 - 0",
	text:"",
}

export default function Init(){
    const [editar , setEditar] = useState<boolean>(false);
    const [nota , setNota] = useState<Nota>(defaultNota);
    const [categorias , setCategorias] = useState<Categoria[]>([
        {
            id:0,
	        nombre:"personaje1",
	        jerarquía:0,
	        color:"",
	        createdAt:"",
        },
        {
            id:0,
	        nombre:"personaje2",
	        jerarquía:0,
	        color:"",
	        createdAt:"",
        },
    ])

    return (
        <div className="content-box centrado flex-column">
            <div className="d-flex justify-content-start align-items-center" style={{width: "100vw" , height: "16vh"}}>
                <h1 style={{marginLeft: 25}}>
                    View
                </h1>
            </div>
            <div className="d-flex" style={{width: "100vw" , height: "86vh"}}>

                <div className="d-flex flex-column align-items-center" style={{width: "20vw" , height: "100%"}}>
                    <div className="box-input-view">
                        <label>Nombre</label>
                        <input 
                            placeholder="Nombre"
                            style={{width: '16.5vw'}}
                            disabled={!editar}
                            type="text" 
                            value={nota.nombre}
                            onChange={e => setNota({
                                id:nota.id,
	                            nombre: e.target.value,
	                            categoria: nota.categoria,
	                            jerarquía: nota.jerarquía,
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
                            style={{width: '16.5vw'}}
                            disabled={!editar}
                            type="number"
                            value={nota.jerarquía}
                            onChange={e => 
                                //@ts-ignore
                                e.nativeEvent.data !== undefined ?
                                setNota({
                                    id:nota.id,
	                                nombre: nota.nombre,
	                                categoria: nota.categoria,
	                                jerarquía: 
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
                            disabled={!editar}
                            onChange={e => setNota({
                                id:nota.id,
	                            nombre: nota.nombre,
                                //@ts-ignore
	                            categoria: categorias.find(n => n.nombre === e.target.value).id,
	                            jerarquía: nota.jerarquía,
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
                            style={{width: '16.5vw'}}
                            disabled={!editar}
                            type="color" 
                            value={nota.color}
                            onChange={e => setNota({
                                id:nota.id,
                                nombre: nota.nombre,
                                categoria: nota.categoria,
                                jerarquía: nota.jerarquía,
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
                            jerarquía: nota.jerarquía,
                            color: nota.color,
                            createdAt: nota.createdAt,
                            text: e.target.value,
                        })}
                        style={{width: "90%" , height: "90%"}} 
                    />
                
                </div>
            
            </div>
        </div>
    )
}