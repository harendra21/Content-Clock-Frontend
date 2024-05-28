import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-linkedin',
  templateUrl: './linkedin.component.html',
  styleUrls: ['./linkedin.component.css']
})
export class LinkedinComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    const queryParams = this.route.snapshot.queryParams;
    const accessToken = queryParams['accessToken'];
    const uri = `/add-linkedin-pages?accessToken=${accessToken}`
    this.apiService.getRequest(uri).subscribe((res: any) => {
      if(res.status){
        this.router.navigate(['/connections']);
      }
    })
  }

  ngOnInit() {
  }

}