import { Cours } from 'src/app/interface/Cours';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(courses : Cours[] , searchTerm : any): Cours[] | []  {
    // if(searchTerm && searchTerm2){
    //   if((searchTerm === 'online' || searchTerm === 'enregistré')&&(searchTerm2.indexOf(' ') > 0)){
    //     return courses ? courses.filter(cours=>{
    //       return (cours.type.toLowerCase() === searchTerm && cours.categorie.name === searchTerm2)
    //   }) : []
    //   }else if((searchTerm === 'online' || searchTerm === 'enregistré')&&(searchTerm2.indexOf(' ') <= 0)){
    //     return courses ? courses.filter(cours=>{
    //       return (cours.type.toLowerCase() === searchTerm && cours.name === searchTerm2)
    //   }) : []
    //   }else if((searchTerm === 'online' || searchTerm === 'enregistré')&&(searchTerm2='date')){
    //     return courses ? courses.filter(cours=>{
    //       return (cours.type.toLowerCase() === searchTerm )
    //     }).sort((a,b)=>{
    //       var dateA = new Date(a.createdAt).getTime();
    //       var dateB = new Date(b.createdAt).getTime();
    //       return dateA < dateB ? 1 : -1;
    //     }) : []
    //   }else{
    //     return courses ? courses.filter(cours=>{
    //       return (cours.categorie.name === searchTerm )
    //     }).sort((a,b)=>{
    //       var dateA = new Date(a.createdAt).getTime();
    //       var dateB = new Date(b.createdAt).getTime();
    //       return dateA < dateB ? 1 : -1;
    //     }) : []
    //   }

    // }
    // else
    //////////
    // if(searchTerm.indexOf(' ') >= 2 && ((searchTerm.substring(0,searchTerm.indexOf(' ')) === 'online' || 'enregistré' ) && (searchTerm.substring(searchTerm.indexOf(' ' + 1)).indexOf(' ') > 0 && searchTerm.substring(searchTerm.indexOf(' ' + 1)).length > 1))){
    //   return courses ? courses.filter(cours=>{
    //           return (cours.type.toLowerCase() === searchTerm && cours.categorie.name === searchTerm.substring(searchTerm.indexOf(' ' + 1)))
    //       }) : []
    // }
    //  else
     if(searchTerm === 'online' || searchTerm === 'enregistré'){
     return courses ? courses.filter(cours=>{
         return cours.type.toLowerCase() === searchTerm
     }) : []

    }else if(searchTerm === 'date' || searchTerm === 'pLowToHigh' || searchTerm === 'phighToLow' || searchTerm === 'poppular' ){
      if(searchTerm === 'date'){
        // return courses.sort((x,y)=>+new Date(x.createdAt)- +new Date(y.createdAt))
        return courses.sort( (a, b)=> {
          var dateA = new Date(a.createdAt).getTime();
          var dateB = new Date(b.createdAt).getTime();
          return dateA < dateB ? 1 : -1; // ? -1 : 1 for ascending/increasing order
        });
      }else if(searchTerm === 'pLowToHigh' ){
        return courses.sort((a,b)=>(a.price>b.price ? 1 : -1))
      }else {
        return courses.sort((a,b)=>(a.price<b.price ? 1 : -1))
    }
  }

    else if(typeof searchTerm == 'string' && searchTerm.indexOf(' ')<= 0){
      return courses ? courses.filter(cours=>{
        return cours.name.toLowerCase().includes(searchTerm)
      }):[]
    }else if(typeof searchTerm == 'string' ){
      return courses ? courses.filter(cours=>{
        return cours.categorie.name === searchTerm
      }):[]
      
    }
    else if(typeof searchTerm == 'number'){
      return courses ? courses.filter(cours=>{
        return cours.price <= searchTerm
      }):[]
    }else{
      return courses
    }
  }

}
