import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/auth/service/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  public connections: any[] = []
  constructor(
    private apiService: ApiService,
    private alertService: AlertService
  ) { }

  ngOnInit() {

    this.apiService.getRequest("/connections", true, new HttpParams()).subscribe((res: any) => {

      if(res.status){
        this.connections = res.data.results
      }else{
        this.alertService.showAlert(res.message)
      }

    }, err => {
      this.alertService.showAlert(err.message)
    })

  }

  deleteConnection(id: any){
    this.apiService.deleteRequest(`/connection/${id}`).subscribe((res: any) => {

      if(res.status){
        this.ngOnInit()
        this.alertService.showAlert(res.message, "success")
      }else{
        this.alertService.showAlert(res.message)
      }

    }, err => {
      this.alertService.showAlert(err.message)
    })
  }

  connectFacebook(){
    const url = `${environment.v1Api}/auth/facebook/start`
    window.location.href = url;
  }

  connectInstagram(){
    const url = `${environment.v1Api}/auth/instagram/start`
    window.location.href = url;
  }

  connectLinkedin(){
    const url = `${environment.v1Api}/auth/linkedin/start`
    window.location.href = url;
  }

  connectTwitter(){
    const url = `${environment.v1Api}/auth/twitter/start`
    window.location.href = url;
  }

  connectPintrest(){
    const url = `${environment.v1Api}/auth/pintrest/start`
    window.location.href = url;
  }

}