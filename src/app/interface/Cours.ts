
export interface Cours{
    id: number,
    imageFor:string,
    name: string,
    createdAt : Date,
    updatedAt:Date,
    nameF:string,
    description: string,
    type: string,
    date_start: string,
    session_is_oppen: boolean,
    price: number,
    image: string,
    periode: string,
    rate : number,
    is_visible:string
    nbPerson : boolean,
    nbChapter:number,
    formateur: {
        id:number,
        name: string,
        last_name: string,
        phone_nbre: string,
        image:string,
        description:string
    },
    categorie: {
        id:number,
        name: string
    },
    short_description: string,
    calenderiers:[
        {
            id:number,
            title:string,
            start:any
        }
        
    ],
    chapitres:[
        {
        id:number,
        name:string
        }  
    ],
    groups:[
        {
        id:number,
        name:string,
        max_size :number,
        users:[{}],
        }
    ],
    evaluations:[
        {
            id:number,
            comment:string,
            satrs:number
        }
    ]


}