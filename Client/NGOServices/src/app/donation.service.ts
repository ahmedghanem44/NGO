import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IDonation } from './DonationInterface';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  
  private url : string = "http://localhost:5000/donations";

  constructor(private http : HttpClient) { }

  getAllDonations(): Observable<IDonation[]> {
    return this.http.get<IDonation[]>(this.url + '/findAll');
  }

  getDonationById(id:string):Observable<IDonation>{
    return this.http.get<IDonation>(this.url +'/find/'+id);
  }

  addDonation(donation:IDonation): Observable<IDonation>{
    return this.http.post<IDonation>(this.url + '/add' , donation);
  }

  // need to know how to get id from the the user object
  updateDonation(id:string,donation:IDonation):Observable<IDonation>{
    return this.http.put<IDonation>(this.url +'/update/' + id , donation);
  }

  removeDonation(id:string):Observable<IDonation>{
    return this.http.delete<IDonation>(this.url+ '/delete/' + id);
  }

  saveDonationsBulk(donations:IDonation[]):Observable<IDonation[]>{
    return this.http.post<IDonation[]>(this.url +'/savedonations',donations);
  }
}
