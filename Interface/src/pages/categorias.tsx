import { useEffect, useState } from "react"
import "../App.css"
import { useLocation } from "react-router-dom"
import { cartelError } from "../components/carteles/cartelError"
import { cartelOk } from "../components/carteles/cartelesOkey"
import { createCategoria, getCategoria, updateCategoria } from "../api/categorias"
import { Categoria } from "../interfaces"

const defaultCategoria:Categoria = {
    id:0,
	nombre:"",
	jerarquia:100,
	color:"",
	createdAt:"",
}

export default function Init(){
    const location:number = Number(useLocation().pathname.split("/")[2])     
    const [categoria , setCategoria] = useState<Categoria>(defaultCategoria)
    const [name , setName] = useState<string>("")
    const [color , setColor] = useState<string>("")
    const [jerarquia , setJerarquia] = useState<number>(100)

    useEffect(() => {
        if(location !== 0) obtenerNotasDefault()
    }, [])
    
    const obtenerNotasDefault = async () => {
        const data:Categoria | undefined = await getCategoria(location)
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setCategoria(data)
        setName(data.nombre)
        setColor(data.color)
        setJerarquia(data.jerarquia)
    }

    const crear = async () => {
        const resultado:boolean = await createCategoria(
            {
                id:0,
	            nombre:name,
	            jerarquia:jerarquia,
	            color:color,
	            createdAt:"",
            }
        )
        if(!resultado) {
            cartelError("Error de Conexion")
            return
        }

        cartelOk("Creado con Exito")
    }

    const editar = async () => {
        const resultado:boolean = await updateCategoria(
            location,
            {
                id:categoria.id,
	            nombre:name,
	            jerarquia:jerarquia,
	            color:color,
	            createdAt:categoria.createdAt,
            }
        )
        if(!resultado) {
            cartelError("Error de Conexion")
            return
        }

        cartelOk("Editado con Exito")
    }

    return (
        <div className="content-box centrado flex-column">
            <div className="w100 d-flex justify-content-center" style={{height: "20vh"}}>
                <h1>{location === 0 ? "Create" : "Editar"}</h1>
            </div>
            <div className="w100 create-categorias-box d-flex flex-column align-items-center" style={{height: "70vh"}}>
                <div>
                    <label>Name</label>
                    <input 
                        value={name}
                        onChange={e => {e.preventDefault() ; setName(e.target.value)}}
                    />
                </div>
                <div>
                    <label>Jerarquia</label>
                    <input 
                        style={{textAlign: 'end'}}
                        type="number"
                        min={1} 
                        max={100} 
                        value={jerarquia}
                        onChange={e => {e.preventDefault() ; 
                            //@ts-ignore 
                            e.nativeEvent.data !== undefined ?
                            setJerarquia(
                                Number(e.target.value) > 100 ? 100 : Number(e.target.value) < 1 ? 1 : Number(e.target.value)
                            ) : ""
                        }}
                    />
                </div>
                <div>
                    <label>Color</label>
                    <input 
                        style={{borderRadius: "10px"}} 
                        type="color" 
                        onChange={e => {e.preventDefault() ; setColor(e.target.value)}}
                    />
                </div>
            </div>  
            <div className="w100 mb-5 d-flex justify-content-center align-items-center" style={{height: "6vh"}}>
                <button 
                    className="btn btn-success btnAcciones"
                    onClick={e => {e.preventDefault(); location === 0 ? crear() : editar() }}
                >
                    {location === 0 ? "Create" : "Editar"}
                </button>
            </div>
        </div>
    )
}