import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from './CartInterface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private url : string = "http://localhost:5000/cart";

  constructor(private http : HttpClient) { }

  getAllCartsItems(): Observable<ICart[]> {
    return this.http.get<ICart[]>(this.url + '/findAll');
  }

  getCartItemById(id:string):Observable<ICart>{
    return this.http.get<ICart>(this.url +'/find/'+id);
  }

  addCartItem(donation:ICart): Observable<ICart>{
    return this.http.post<ICart>(this.url + '/add' , donation);
  }

  // need to know how to get id from the the user object
  updateCartItem(id:string,donation:ICart):Observable<ICart>{
    return this.http.put<ICart>(this.url +'/update/' + id , donation);
  }

  removeCartItem(id:string):Observable<ICart>{
    return this.http.delete<ICart>(this.url+ '/delete/' + id);
  }

  findUserCart(userid:string):Observable<ICart[]>{
    return this.http.get<ICart[]>(this.url + '/findbyuser/'+userid);
  }

  removeUserCart(userid:string):Observable<ICart[]>{
    return this.http.delete<ICart[]>(this.url + '/deleteusercart/'+ userid);
  }

}
