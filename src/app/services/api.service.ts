import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { TimezoneService } from 'src/app/services/timezone.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  constructor(
    private http: HttpClient, 
    private cookieService: CookieService, 
    private router: Router,
    private timezoneService: TimezoneService
  
  ) { }
  getRequest(uri: string, auth: boolean = true, params: HttpParams = new HttpParams()){

    var headers
    if (auth){
        const accessToken = this.cookieService.get('accessToken')
        const timezone = this.timezoneService.getUserTimezoneAbbreviation();
        headers = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            'Timezone': timezone
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
    this.cookieService.delete('accessToken', '/')
    this.router.navigate(['/auth/login'])
  }

  private addNewDataSource = new BehaviorSubject<any>({});
  addNewData = this.addNewDataSource.asObservable();

  changeAddNewData(data: any) {
    this.addNewDataSource.next(data);
  }

  private dailyPostCountSource = new BehaviorSubject<any>({});
  dailyPostCountData = this.dailyPostCountSource.asObservable();

  changeDailyPostCountData(data: any) {
    this.dailyPostCountSource.next(data);
  }

  setDailyPostCount(connection_id: string) {
    this.getRequest(`/daily-social-posts-count?connectionId=${connection_id}`).subscribe((res: any) => {
      this.changeDailyPostCountData(res);
    })
  }

  private postCountSource = new BehaviorSubject<any>({});
  postCountData = this.postCountSource.asObservable();

  changePostCountData(data: any) {
    this.postCountSource.next(data);
  }

  setPostCount(connection_id: string) {
    this.getRequest(`/social-post-count?connectionId=${connection_id}`).subscribe((res: any) => {
      this.changePostCountData(res);
    })
  }
  

}
