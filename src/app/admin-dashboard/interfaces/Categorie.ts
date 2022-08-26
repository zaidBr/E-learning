export interface Categorie{
    id:number,
    name:string;
    description:string,
    short_description:string,
    createdAt:Date,
    image : string,
    updatedAt:Date,
    formations : [{
        id : number,
        name:string
    }]
}