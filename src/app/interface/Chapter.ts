export interface Chapter{
        id:number,
        name:string,
        formation:
                {
                        id:number,
                        type:string
                }
        files:[{
                id:number,
                title:string,
                description:string,
                file_path:string
        }],
        quizs:[{}],
        videos:[{
                id:number,
                url_video:string,
                title:string
        }],
        documents:[{
                id:number,
                text:string
        }]

}