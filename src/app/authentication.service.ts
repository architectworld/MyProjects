import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }


  isLoggedIn(){
    if(localStorage.getItem('user'))
    {
      return true;
    }
    else{
      return false
    }

  }
  isLoggout()
  {
    localStorage.removeItem('user');
  }
}
