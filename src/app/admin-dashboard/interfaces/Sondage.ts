export interface Sondage{

        id: number,
        title: string,
        text: string,
        admin: {
            createdAt: Date,
            updatedAt: Date,
            id: number,
            name: string
        },
        reacts: [
            {
                id: number,
                is_intersted: true,
                candidat: {
                    id: number,
                    name: string,
                    createdAt: Date,
                    updatedAt: Date
                },
                createdAt: Date,
                updatedAt: Date
            }
        ],
        createdAt: Date,
        updatedAt: Date

}