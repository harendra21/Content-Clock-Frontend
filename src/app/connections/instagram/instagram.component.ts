import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/auth/service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instagram',
  templateUrl: './instagram.component.html',
  styleUrls: ['./instagram.component.css']
})
export class InstagramComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    const queryParams = this.route.snapshot.queryParams;
    const accessToken = this.route.snapshot.queryParams['accessToken'];
    const userId = this.route.snapshot.queryParams['userId'];
    const uri = `/add-instagram-pages?accessToken=${accessToken}&userId=${userId}`
    this.apiService.getRequest(uri).subscribe((res: any) => {
      if(res.status){
        this.router.navigate(['/connections']);
      }
    })
  }

  ngOnInit() {
  }

}