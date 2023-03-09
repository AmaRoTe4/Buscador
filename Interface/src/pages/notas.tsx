import { useEffect, useState } from "react"
import "../App.css"
import { useLocation } from "react-router-dom"

export default function Init(){
    const location:number = Number(useLocation().pathname.split("/")[2])     
    const [name , setName] = useState<string>("")
    const [color , setColor] = useState<string>("")
    const [jerarquia , setJerarquia] = useState<number>(100)
    
    const [categorias , setCategorias] = useState<string[]>(["1" , "2" , "3" , "4"])
    const [categoria , setCategoria] = useState<string>(categorias[0])

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
            <div className="w100 d-flex flex-column justify-content-around align-items-center" style={{height: "25vh"}}>
                <div className="w100 creat-input-box d-flex justify-content-between align-items-center">
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
                </div>    
                <div className="w100 creat-input-box d-flex justify-content-between align-items-center">
                    <div>
                        <label>Categoria</label>
                        <select onChange={e => {e.preventDefault() ; setCategoria(e.target.value)}}>
                            {categorias.map((n , i) => 
                                <option key={i}>{n}</option>
                            )}
                        </select>
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
            </div>
            <div className="w100 d-flex justify-content-center" style={{height: "45vh"}}>
                <textarea style={{height: "80%" , width: "40%" , borderRadius: 10}} />
            </div>
            <div className="w100 mb-5 d-flex justify-content-center align-items-center" style={{height: "6vh"}}>
                <button className="btn btn-success btnAcciones">{location === 0 ? "Create" : "Editar"}</button>
            </div>
        </div>
    )
}