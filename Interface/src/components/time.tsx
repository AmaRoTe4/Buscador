import { useEffect, useState } from "react"
import "./styles.css"

export default function Time(){
    const [time , setTime] = useState<string>("")
    
    useEffect(() => {
        setTimeout(() => {
            let today = new Date();
            let now = today.toLocaleString();
            
            setTime(now);
        } , 1000)
    },[time])

    return (
        <div className="d-flex justify-content-end time-init">
            <p>
                {time}
            </p>
        </div>
    )
}