import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor() { }

  canActivate():boolean{
      let isAdmin = localStorage.getItem('isAdmin');
      if(isAdmin == "true"){
          return true;
      }else{
        return false;
      }
  }


}
