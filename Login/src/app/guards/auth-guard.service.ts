import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  constructor(private router : Router) { }

  canActivate() {
    const token = window.localStorage.getItem('token');

    if (!token || token == ''){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
