import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-twitter',
  templateUrl: './twitter.component.html',
  styleUrls: ['./twitter.component.css']
})
export class TwitterComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    const queryParams = this.route.snapshot.queryParams;
    const requestToken = queryParams['requestToken'];
    const verifier = queryParams['verifier'];
   
    const uri = `/add-twitter-pages?requestToken=${requestToken}&verifier=${verifier}`
    this.apiService.getRequest(uri).subscribe((res: any) => {
      if(res.status){
        this.router.navigate(['/connections']);
      }
    })
  }

  ngOnInit() {
  }
}