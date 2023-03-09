import { useEffect, useState } from "react"
import "../App.css"
import { useLocation } from "react-router-dom"

export default function Init(){
    const location:number = Number(useLocation().pathname.split("/")[2])     
    const [name , setName] = useState<string>("")
    const [color , setColor] = useState<string>("")
    const [jerarquia , setJerarquia] = useState<number>(100)

    //useEffect(() => {
        //console.log(color)
        //console.log(name)
        //console.log(jerarquia)
        //console.log(categoria)
    //} , [color , name , jerarquia ,categoria])

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
                <button className="btn btn-success btnAcciones">{location === 0 ? "Create" : "Editar"}</button>
            </div>
        </div>
    )
}