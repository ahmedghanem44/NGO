import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IEvent } from './EventInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url : string = "http://localhost:5000/events";

  constructor(private http : HttpClient) { }

  getAllEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.url + '/findAll');
  }

  getAllActiveEvents(): Observable<IEvent[]> {
    return this.http.get<IEvent[]>(this.url + '/findActive');
  }

  getEventById(id:string):Observable<IEvent>{
    return this.http.get<IEvent>(this.url +'/find/'+id);
  } 

  addEvent(event:IEvent): Observable<IEvent>{
    return this.http.post<IEvent>(this.url + '/add' , event);
  }

  // need to know how to get id from the the user object
  updateEvent(id:string,event:IEvent):Observable<IEvent>{
    return this.http.put<IEvent>(this.url +'/update/' + id , event);
  }

  removeEvent(id:string):Observable<IEvent>{
    return this.http.delete<IEvent>(this.url+ '/delete/' + id);
  }


}
