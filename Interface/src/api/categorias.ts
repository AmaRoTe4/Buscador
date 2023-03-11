import axios from "axios";
import { Categoria } from "../interfaces";

const path:string = "http://localhost:3500/api/categorias/"

//@ts-ignore
export const getAllCategorias = async ():Categoria[] | undefined => {
    try{
        const data = await axios.get(path)
        return data.data
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const getCategoria = async (id:number):Categoria | undefined => {
    try{
        const data = await axios.get(path + id)
        return data.data
    }catch(error){
        console.log(error)
        return undefined;
    }
}

//@ts-ignore
export const updateCategoria = async (id:number , data:Categoria):boolean => {
    try{
        await axios.put(path + id , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const createCategoria = async (data:Categoria):boolean => {
    try{
        await axios.post(path , data)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}

//@ts-ignore
export const deletCategoria = async (id:number):boolean => {
    try{
        await axios.delete(path + id)
        return true
    }catch(error){
        console.log(error)
        return false
    }
}