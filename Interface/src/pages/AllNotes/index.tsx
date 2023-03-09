import { useNavigate } from "react-router-dom";
import "../../App.css"

export default function Init(){
    const navigate = useNavigate();
    const categorias: string[] = ["..." , "..." ,"..." ,"..." ,"..." ,"..." ]
    
    return (
        <div className="d-flex" style={{backgroundColor: "black" , height: "auto" , width: "100%"}}>
            <div style={{width: "20%" , height: "96vh" , content: ""}}></div>
            <div className="d-flex flex-column" style={{width: "80%" , height: "96vh"}}>
                <div className="box-orden-categorias-all"> 
                    <select>
                        <option>Old - Young</option>
                        <option>Young - Old</option>
                    </select>
                </div>
                <div className="row box-categorias-all">
                    {categorias.length !== 0 && categorias.map((n , i) => 
                        <div key={i} className="cuadro-de-categorias" onClick={e => {e.preventDefault() ; navigate(`/allNotes/${i}`)}}>
                            <p>
                                {n}
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