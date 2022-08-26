import { Sondage } from './../../interfaces/Sondage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Categorie } from 'src/app/admin-dashboard/interfaces/Categorie';
import { Cours } from 'src/app/interface/Cours';
import { TokenStorageService } from '../../../service/token-storage.service';
import { CountRegistration } from '../../interfaces/CountRegistration';
import { Teacher } from '../../interfaces/Teacher';
import { Chapter } from 'src/app/interface/Chapter';
import { SomeData } from 'src/app/student/cours-space/cours-content/cours-content.component';
import { Comment } from 'src/app/student/cours-space/inside-cours/comment-manage/comment-manage.component';
import { Quiz } from '../../../interface/Quiz';
const apiUrl = "http://127.0.0.1:8000/api/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Access-Control-Allow-Origin' : '*'
  })
};
const httpOptionss = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin' : '*',
    'Accept' : '*/*'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ManagerService {
 

  constructor(private httpClient : HttpClient,private sessionStorage : TokenStorageService) {}

  isAdmin(): boolean{
    let sessionStorage : any = this.sessionStorage.getToken();
    let token : any = this.sessionStorage.decodeToken(sessionStorage);
    let roles = token.roles;
    if(!roles.includes('ROLE_ADMIN')){
      return false;
    }
    return true;
  }
  

  addCategorie(formData : FormData)
  {
    
    if(this.isAdmin()){
      return this.httpClient.post(apiUrl+'admin/categorie',formData,httpOptionss).pipe(
        catchError(this.errorHandler)
      );
    }else{
     return throwError("tu n'est pas autorise");
    }
  }

  editCategorie(id:number):Observable<Categorie>{
    const url = `${apiUrl}admin/edit/categorie/${id}`;
    return this.httpClient.get<Categorie>(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  updateCategorie(name:string,description:string,shortDescription:string,id:number){
    const url = `${apiUrl}admin/categorie/${id}`;
    if(this.isAdmin()){
      return this.httpClient.put(url,{name,description,shortDescription},httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }else{
     return throwError("tu n'est pas autorise");
    }
}

  deleteCategorie(id:number){
    const url = `${apiUrl}admin/categorie/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Accept' : '*/*'
      })
    };
    return this.httpClient.delete(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  showCategorie():Observable<Categorie[]>
  {
    return this.httpClient.get<Categorie[]>(apiUrl+'public/categorie',httpOptions).pipe(
      map( data=>{
        let val = data;
        return val;
     }),
      catchError(this.errorHandler)
    );

  }


  addTeacher(formData : FormData){
    return this.httpClient.post(apiUrl+'admin/add/formateur',formData,httpOptionss).pipe(
      catchError(this.errorHandler)
    );
  }
  showTeacher():Observable<Teacher[]>{
    const url = `${apiUrl}public/formateur`;
    return this.httpClient.get<Teacher[]>(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteTeacher(id:number){
    const url = `${apiUrl}admin/delete/formateur/${id}`;
    return this.httpClient.delete(url).pipe(
      catchError(this.errorHandler)
    );
  }



  addGroup(name:string,maxSize:number,id:number){
    const url = `${apiUrl}admin/group/${id}`;
    return this.httpClient.post(url,{name,maxSize},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  addMeeting(title:string,meetingUrl:string,id:number){
    const url = `${apiUrl}admin/meeting/${id}`;
    return this.httpClient.post(url,{title,meetingUrl},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  getMeeting(id:number){
    const url = `${apiUrl}get/url-conference/${id}`;
    return this.httpClient.get(url,httpOptions);
  }


  addCours(formData: any,idCategorie:number,idTeacher:number){
     
    const url = `${apiUrl}admin/formation/${idCategorie}/${idTeacher}`;
    return this.httpClient.post(url,formData,httpOptionss).pipe(
      catchError(this.errorHandler)
    );
  }
  showPublicCours():Observable<Cours[]>{
    return this.httpClient.get<Cours[]>(apiUrl+'public/formation',httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  showSomeDataCours(id:number):Observable<SomeData>{
    const url = `${apiUrl}public/some/formation/${id}`;
    return this.httpClient.get<SomeData>(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  deleteCours(id:number){
    const url = `${apiUrl}admin/formation/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin' : '*',
        'Accept' : '*/*'
      })
    };
    return this.httpClient.delete(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  editCours(id:number):Observable<Cours>
  {
    const url = `${apiUrl}admin/edit/formation/${id}`;
    return this.httpClient.get<Cours>(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  updateCours(name:string,description:string,shortDescription:string,periode:string,dateStart:string,type:string,price:string,formateurId:number,categorieId:number,id:number){

    const url = `${apiUrl}admin/update/formation/${id}`;
    return this.httpClient.put(url,{name,description,shortDescription,periode,dateStart,type,price,formateurId,categorieId},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  controleSessionCours(id:number){
    const url = `${apiUrl}admin/controle/session/${id}`;
    return this.httpClient.put(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  MakeCoursVisible(id:number){
    const url = `${apiUrl}formateur/controle/visibility/${id}`;
    return this.httpClient.put(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  addDoc(id:number, text:string){
  const url = `${apiUrl}formateur/add/document/${id}`;
  return this.httpClient.post(url,{text},httpOptions).pipe(
    catchError(this.errorHandler)
  );
  }
  addCalendar(title:string,start:string,id:number){
    const url = `${apiUrl}formateur/calender/${id}`;
    return this.httpClient.post(url,{title,start},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  addChapter(name:string,id:number){
    const url = `${apiUrl}formateur/add/chapter/${id}`;
  return this.httpClient.post(url,{name},httpOptions).pipe(
    catchError(this.errorHandler)
  );
  }
  getChapter(id:number):Observable<Chapter[]>{
  const url = `${apiUrl}public/get/chapters/${id}`;
  return this.httpClient.get<Chapter[]>(url,httpOptions).pipe(
    catchError(this.errorHandler)
  );
  }
  getDataChapter(id:number):Observable<Chapter>{
    const url = `${apiUrl}public/get/chapter/${id}`;
    return this.httpClient.get<Chapter>(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  addComment(comment:string,id:number){
    const url = `${apiUrl}comment/${id}`;
    return this.httpClient.post(url,{comment},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  evaluateCours(id:number,comment:string,stars:number){
    const url = `${apiUrl}evaluation/${id}`;
    return this.httpClient.post(url,{comment,stars},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  evaluateTeacher(id:number,comment:string,stars:number)
  {
    const url = `${apiUrl}evaluation/formateur/${id}`;
    return this.httpClient.post(url,{comment,stars},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  myRate(id:number){
  const url = `${apiUrl}my/rate/${id}`;
  return this.httpClient.get(url,httpOptions).pipe(
    catchError(this.errorHandler)
  );
  }

  editComment(comment:string,id:number){
    const url = `${apiUrl}edit/comment/${id}`;
    return this.httpClient.put(url,{comment},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  getComments(id:number):Observable<Comment[]>
  {
    const url = `${apiUrl}comment/${id}`;
    return this.httpClient.get<Comment[]>(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  addVideo(formaData:FormData,id:number){
    const url = `${apiUrl}formateur/add/video/${id}`;
    return this.httpClient.post(url,formaData,{
      reportProgress: true,
      observe: 'events'
  }).pipe(
      catchError(this.errorHandler)
    );
  }

  addQuiz(title:string,correctAnswer:string,choiseOne:string,
    choiseTwo:string,choiseThree:string,choiseFor:string,
    choiseFive:string,timePerQuestion:number,question:string, id:number){
      const url = `${apiUrl}formateur/quizz/${id}`;
    return this.httpClient.post(url,{title,correctAnswer,choiseOne,choiseTwo,choiseThree,choiseFor,choiseFive,timePerQuestion,question},httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  addFile(formData:FormData,id:number){
    const url = `${apiUrl}formateur/add/file/${id}`;
    return this.httpClient.post(url,formData).pipe(
      catchError(this.errorHandler)
    );
  }
  
  showCoursByType(type:string){
    const url = `${apiUrl}public/formation/${type}`;
    return this.httpClient.get(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  showCoursDetail(id:number){
    const url = `${apiUrl}public/formation/${id}`;
    return this.httpClient.get(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
/***  */
  showForFormateur():Observable<Cours[]>{
    return this.httpClient.get<Cours[]>(apiUrl+'formateur/my/formation',httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  showOneForFormateur(id:number):Observable<Cours>{
    const url = `${apiUrl}formateur/my/formation/${id}`;
    return this.httpClient.get<Cours>(url,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  rateOneCours(id:number){
  const url = `${apiUrl}public/rate/cours/${id}`;
  return this.httpClient.get(url,httpOptions).pipe(
    catchError(this.errorHandler)
  );
  }
  currentUser():Observable<Teacher>{
    return this.httpClient.get<Teacher>(`${apiUrl}current/user`, httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  editProfile(formData : FormData){
    return this.httpClient.post(apiUrl+'profile/modify?_method=PUT',formData).pipe(
      catchError(this.errorHandler)
    );
  }

  addSondage(title:string,text:string){
    return this.httpClient.post(`${apiUrl}admin/sondage`,{title,text},httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }

  getSondage():Observable<Sondage[]>{
    return this.httpClient.get<Sondage[]>(`${apiUrl}public/sondage`,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  addReact(id:number){
  const url = `${apiUrl}reagit/${id}`
  return this.httpClient.get(url,httpOptions)
  }

  mostRaitingCours():Observable<Cours[]>{
    return this.httpClient.get<Cours[]>(`${apiUrl}public/poppular/foramtion`,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  mostRatingTeacher():Observable<Teacher[]>{
    return this.httpClient.get<Teacher[]>(`${apiUrl}formateur/poppular`,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  cuurrentTeacherRating(){
    return this.httpClient.get(`${apiUrl}formateur/rates`,httpOptions).pipe(
      catchError(this.errorHandler)
    )
  }
  userRegistration():Observable<CountRegistration>{
    return this.httpClient.get<CountRegistration>(`${apiUrl}public/get/user/registration`,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  allStudent(){
    return this.httpClient.get(`${apiUrl}public/get/student/registration`,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  myCourses():Observable<Cours[]>{
    return this.httpClient.get<Cours[]>(`${apiUrl}get/my/formations`,httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }
  
  addQuestion(id:number, question:string, correctAnswer:number, timePerQuestion:number,choiseOne:string,choiseTwo:string,choiseThree:string,choiseFor:string,choiseFive:string){
    const url = `${apiUrl}add/question/${id}`;
    return this.httpClient.post(url,{question, correctAnswer, timePerQuestion,choiseOne,choiseTwo,choiseThree,choiseFor,choiseFive}, httpOptions);
  }
  
  addChoiseAnswer(id:number, answer:string){
    const url = `${apiUrl}add/choiseAnswer/${id}`;
    return this.httpClient.post(url,{answer}, httpOptions);
  }
  getQuiz(id:number):Observable<Quiz[]>
  {
    const url = `${apiUrl}get/quiz/${id}`;
    return this.httpClient.get<Quiz[]>(url, httpOptions);
  }
deleteQuiz(id:number){
const url = `${apiUrl}delete/quiz/${id}`;
return this.httpClient.delete(url, httpOptions);
}


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }



}
