import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebook',
  templateUrl: './facebook.component.html',
  styleUrls: ['./facebook.component.css']
})
export class FacebookComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    const accessToken = this.route.snapshot.queryParams['accessToken'];
    const userId = this.route.snapshot.queryParams['userId'];
    const uri = `/add-facebook-pages?accessToken=${accessToken}&userId=${userId}`
    this.apiService.getRequest(uri).subscribe((res: any) => {
      if(res.status){
        this.router.navigate(['/connections']);
      }
    })
  }

  ngOnInit() {
  }

}