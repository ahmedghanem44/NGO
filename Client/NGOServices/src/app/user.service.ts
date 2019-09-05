import { Injectable } from '@angular/core';
import { HttpClient , HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {IUser} from './UserInterface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url : string = "http://localhost:5000/users";

  constructor(private http : HttpClient) { }

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

  saveUser(user: IUser): Observable<IUser>{ // changed from IUser to any 
    return this.http.post<IUser>(this.url + '/signup' , user);
  }

  // need to know how to get id from the the user object
  updateUser(id:string,user:IUser):Observable<IUser>{
    return this.http.put<IUser>(this.url +'/update/' + id , user);
  }

  removeUser(id:string):Observable<IUser>{
    return this.http.delete<IUser>(this.url+ '/delete/' + id);
  }


}


