
export interface Teacher{
    id:number,
    nameF:string,
    roles : string[],
    name:string,
    last_name:string,
    email:string,
    location : string,
    rate : number,
    age:number
    nbFormation : number,
    image :string,
    cin:string
    phone_nbre:number,
    description : string,
    groupe:[

    ]
    formations : [{
        id : number,
        name:string
    }],


}

