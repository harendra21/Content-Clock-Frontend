import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private cookieService: CookieService, private router: Router) { }

  getRequest(uri: string, auth: boolean = true, params: HttpParams = new HttpParams()){

    var headers
    if (auth){
        const accessToken = this.cookieService.get('accessToken')
        headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });
    }

    return this.http.get(`${environment.v1Api}${uri}`, { headers, params })
  }

  postRequest(uri: string, body: any, auth: boolean = true, params: HttpParams = new HttpParams()){

    var headers
    if (auth){
      const accessToken = this.cookieService.get('accessToken')
      headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
      });
    }

    return this.http.post(`${environment.v1Api}${uri}`, body,{ headers, params })
  }

  deleteRequest(uri: string, auth: boolean = true, params: HttpParams = new HttpParams()){

    var headers
    if (auth){
        const accessToken = this.cookieService.get('accessToken')
        headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });
    }

    return this.http.delete(`${environment.v1Api}${uri}`, { headers, params })
  }

  getAccessToken(){
    return this.cookieService.get('accessToken')
  }

  logOut(){
    this.cookieService.delete('accessToken')
    this.router.navigate(['/auth/login'])
  }



}
