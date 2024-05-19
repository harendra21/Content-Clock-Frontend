import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private route: Router,
    private apiService: ApiService
  ) { }

  private isAuthSubject = new BehaviorSubject<boolean>(false); // You can change the type and initial value as needed
  public isAuth$ = this.isAuthSubject.asObservable();

  setAuthStatus(value: boolean) {
    this.isAuthSubject.next(value);
  }

  getAuthStatus(): boolean {
    return this.isAuthSubject.value;
  }

  canActivate() {
    var isAuthenticated = this.apiService.getAccessToken()

    if (isAuthenticated) {
      this.setAuthStatus(true)
      return true
    }

    return this.apiService.getRequest(`/check-auth`).subscribe((res: any) => {
      if (res.status) {
        this.setAuthStatus(true)
        return true
      } else {
        this.setAuthStatus(false)
        this.route.navigate(["/auth/login"])
        return false
      }
    }, err => {
      this.setAuthStatus(false)
      this.route.navigate(["/auth/login"])
      return false
    })
  }
  

}
