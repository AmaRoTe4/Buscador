export interface Nota {
    id:number;
	nombre:string;
	categoria:number;
	jerarquia:number;
	color:string;
	createdAt:string;
	updatedAt?:string;
	text:string;
}

export interface Categoria {
    id:number;
	nombre:string;
	jerarquia:number;
	color:string;
	createdAt:string;
}