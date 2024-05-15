import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private route: Router,
    private apiService: ApiService
  ) { }

  canActivate() {
    var isAuthenticated = sessionStorage.getItem('isAuthenticated')

    if (isAuthenticated) {
      return true
    }

    return this.apiService.getRequest(`/check-auth`).subscribe((res: any) => {
      if (res.status) {
        sessionStorage.setItem('isAuthenticated', 'true')
        return true
      } else {
        this.route.navigate(["/auth/login"])
        return false
      }
    }, err => {
      this.route.navigate(["/auth/login"])
      return false
    })
  }

}
