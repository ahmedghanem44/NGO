import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from './UserInterface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url : string = "http://localhost:5000/users";

  public currentUser ;

  constructor(private http : HttpClient, private router: Router) { }

  getAllUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.url + '/findAll');
  }

  getUserById(id:string):Observable<IUser>{
    return this.http.get<IUser>(this.url +'/find/'+id);
  } 

  getUserByEmailGet(email:string) : Observable<IUser>{
    return this.http.get<IUser>(this.url + '/find/' + email);
  }

  // NEED ATTENTION
  // getUserByEmailPost(user : IUser){
  //   return this.http.post<IUser>(this.url +'/findEmail',user.email);
  // }

  signup(user: IUser): Observable<IUser>{ // changed from IUser to any 
    return this.http.post<IUser>(this.url + '/signup' , user);
  }

  // need to know how to get id from the the user object
  updateUser(id:string,user:IUser):Observable<IUser>{
    return this.http.put<IUser>(this.url +'/update/' + id , user);
  }

  removeUser(id:string):Observable<IUser>{
    return this.http.delete<IUser>(this.url+ '/delete/' + id);
  }

  // singin(user){
  //  return this.http.post<any>(this.url+'/signin' , user);
  // }

  singin(user:any):Observable<any>{
    return this.http.post<any>(this.url+'/signin' , user);
   }

  signout(){
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('currentUser');
    localStorage.removeItem('userName');
    localStorage.clear();
    this.router.navigate(['/home']);
  }

  isSignedIn() {
    if (localStorage.getItem('token') != null){
      return true;
    }else{
      return false;
    } 
  }

  getUserName():any {
    return localStorage.getItem('name');
  }

  // getCurrentUser():Observable<IUser>{
  //   return  JSON.parse(JSON.stringify(localStorage.getItem('user')));
  // }


}


