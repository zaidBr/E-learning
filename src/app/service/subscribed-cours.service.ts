import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ParamMap } from '@angular/router';
import { Cours } from '../interface/Cours';
const httOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : '*'
  }) 
};
const apiUrl : string = "http://127.0.0.1:8000/api/";
@Injectable({
  providedIn: 'root'
})
export class SubscribedCoursService {
  msgNotAuthorized = false;
  myCourses :Cours[]=[];
  constructor(private http : HttpClient, private router:Router) {
    this.getMyCourses();
   }

  getMyCourses(){

    this.http.get<Cours[]>(`${apiUrl}get/my/formations`,httOptions).subscribe(
      data=>{
        this.myCourses = data
      }
    )
  }

  guardd(url:any){
    const idCourses =this.myCourses.map((cours)=>{
      return cours.id
    });
    const isExisit = idCourses.find(id=>{
      return id == url;
    })
    console.log('isExiiist ?',isExisit)
    if(isExisit){
      return true
    }else{
      return false
    }
  }
}
