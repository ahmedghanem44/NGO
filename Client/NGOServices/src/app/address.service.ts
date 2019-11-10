import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAddress } from './AddressInterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  
  private url : string = "http://localhost:5000/address";

  constructor(private http : HttpClient) { }

  getAllAddresses(): Observable<IAddress[]> {
    return this.http.get<IAddress[]>(this.url + '/findAll');
  }

  getAddressById(id:string):Observable<IAddress>{
    return this.http.get<IAddress>(this.url +'/find/'+id);
  }
  
  getAddressByZip(zip:string):Observable<IAddress>{
    return this.http.post<IAddress>(this.url +'/findZip', zip);
  } 

  addAddress(address:IAddress): Observable<IAddress>{
    return this.http.post<IAddress>(this.url + '/add' , address);
  }

  // need to know how to get id from the the user object
  updateAddress(id:string,address:IAddress):Observable<IAddress>{
    return this.http.put<IAddress>(this.url +'/update/' + id , address);
  }

  removeAddress(id:string):Observable<IAddress>{
    return this.http.delete<IAddress>(this.url+ '/delete/' + id);
  }
}
