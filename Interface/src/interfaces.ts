export interface Nota {
    id:number;
	nombre:string;
	categoria:number;
	jerarquía:number;
	color:string;
	createdAt:string;
	updatedAt?:string;
	text:string;
}

export interface Categoria {
    id:number;
	nombre:string;
	jerarquía:number;
	color:string;
	createdAt:string;
}