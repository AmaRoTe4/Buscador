import { useEffect, useState } from "react"
import "../App.css"
import { useLocation, useNavigate } from "react-router-dom"
import { cartelError } from "../components/carteles/cartelError"
import { Categoria, Nota } from "../interfaces"
import { createNotas, getNotas, updateNotas } from "../api/notas"
import { getAllCategorias } from "../api/categorias"
import { cartelOk } from "../components/carteles/cartelesOkey"

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
    const location:number = Number(useLocation().pathname.split("/")[2])     
    const navigate = useNavigate()     
    const [nota , setNota] = useState<Nota>(defaultNota)
    const [name , setName] = useState<string>("")
    const [text , setText] = useState<string>("")
    const [color , setColor] = useState<string>("")
    const [jerarquia , setJerarquia] = useState<number>(100)
    
    const [categorias , setCategorias] = useState<Categoria[]>([])
    const [categoria , setCategoria] = useState<Categoria>(defaultCategoria)

    useEffect(() => {
        if(location !== 0 && nota.id === 0) obtenerNotasDefault()
        obtenerCategorias()
    }, [nota])
    
    const obtenerCategorias = async () => {
        const data:Categoria[] | undefined = await getAllCategorias()
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }

        data.unshift(defaultCategoria)
        setCategorias(data);

        const aux = categorias.find(n => n.id === nota.categoria)
        if(aux === undefined) return
        setCategoria(aux)
    }

    const obtenerNotasDefault = async () => {
        const data:Nota | undefined = await getNotas(location)
        if(data === undefined) {
            cartelError("Error de Conexion")
            return
        }
        setNota(data)
        setName(data.nombre)
        setText(data.text)
        setColor(data.color)
        setJerarquia(data.jerarquia)
    }

    const cargarCategoria = (nombre:string) => {
        const aux:Categoria | undefined = categorias.find(n => n.nombre === nombre)
        if(aux !== undefined) setCategoria(aux)
    }

    const crear = async () => {
        const resultado:boolean = await createNotas(
            {
                id:0,
	            nombre:name,
	            categoria:categoria.id,
	            jerarquia:jerarquia,
	            color:color,
	            createdAt:"",
	            updatedAt:"",
	            text:text,
            }
        )
        if(!resultado) {
            cartelError("Error de Conexion")
            return
        }

        cartelOk("Creado con Exito")
        clean();
    }

    const editar = async () => {
        console.log(categoria.id)
        return

        const resultado:boolean = await updateNotas(
            location,
            {
                id:nota.id,
	            nombre:name,
	            categoria:categoria.id,
	            jerarquia:jerarquia,
	            color:color,
	            createdAt: nota.createdAt,
	            updatedAt: nota.updatedAt,
	            text:text,
            }
        )

        console.log(resultado)

        if(!resultado) {
            cartelError("Error de Conexion")
            return
        }

        cartelOk("Editado con Exito")
                
        navigate(`/allNotes/${nota.categoria}`)
    }

    const clean = () => {
        setNota(defaultNota)
        setName("")
        setText("")
        setColor("")
    }

    return (
        <div className="content-box centrado flex-column">
            <div className="w100 d-flex justify-content-center" style={{height: "20vh"}}>
                <h1>{location === 0 ? "Create" : "Editar"}</h1>
            </div>
            <div className="w100 d-flex flex-column justify-content-around align-items-center" style={{height: "25vh"}}>
                <div className="w100 creat-input-box d-flex justify-content-between align-items-center">
                    <div>
                        <label>Name</label>
                        <input 
                            style={{padding: 3}}
                            value={name}
                            onChange={e => {e.preventDefault() ; setName(e.target.value)}}
                        />
                    </div>
                    <div>
                        <label>Jerarquia</label>
                        <input 
                            style={{textAlign: 'end' , padding: 3}}
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
                </div>    
                <div className="w100 creat-input-box d-flex justify-content-between align-items-center">
                    <div>
                        <label>Categoria</label>
                        <select 
                            style={{padding: 3}}
                            value={categoria.nombre} 
                            onChange={e => {e.preventDefault() ; cargarCategoria(e.target.value)}}>
                            {categorias.map((n , i) => 
                                <option key={n.id}>{n.nombre}</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label>Color</label>
                        <input 
                            style={{borderRadius: "10px" , padding: 1}} 
                            type="color" 
                            value={color}
                            onChange={e => {e.preventDefault() ; setColor(e.target.value)}}
                        />
                    </div>
                </div>    
            </div>
            <div className="w100 d-flex justify-content-center" style={{height: "45vh"}}>
                <textarea 
                    style={{height: "80%" , width: "40%" , borderRadius: 10 , padding: 10}} 
                    onChange={e => setText(e.target.value)}
                    value={text}
                />
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