import { Link } from "react-router-dom"
import "../App.css"

export default function Init(){
    const links:string[] = ["note1" , "note2", "note3" , "note4" , "note5", "note6", "note7" , "note8" , "note9", "note10"]

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
                    <Link to="/categorias/1">
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
                className="ultimas-notas d-flex flex-column w100 align-items-center"
            >
                    {links.map((n , i) => 
                        <Link key={i} to={`/view/${i}`}>{n}</Link>
                    )}
            </ul>
        </div>
    )
}