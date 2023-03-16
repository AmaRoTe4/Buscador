import axios from "axios";
import { Nota } from "../interfaces";

const path:string = "https://apifreeamaro.azurewebsites.net/api/notas/"

//@ts-ignore
export const getAllNotas = async ():Nota[] | undefined => {
    try{
        const data = await axios.get(path)
        return data.data
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const getAllNotasYoungOld = async ():Nota[] | undefined => {
    try{
        const data = await axios.get(path + "YoungOld")
        return data.data
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const getAllNotasOldYoung = async ():Nota[] | undefined => {
    try{
        const data = await axios.get(path + "oldYoung")
        return data.data
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const getNotas = async (id:number):Nota | undefined => {
    try{
        const data = await axios.get(path)
        //@ts-ignore
        return data.data.find(n => n.id === id)
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const updateNotas = async (id:number , data:Nota):boolean => {
    try{
        await axios.put(path + id , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const createNotas = async (data:Nota):boolean => {
    try{
        await axios.post(path , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const deletNotas = async (id:number):boolean => {
    try{
        await axios.delete(path + id)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}