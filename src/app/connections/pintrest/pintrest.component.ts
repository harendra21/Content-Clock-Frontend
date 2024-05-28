import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pintrest',
  templateUrl: './pintrest.component.html',
  styleUrls: ['./pintrest.component.css']
})
export class PintrestComponent implements OnInit {

  constructor(private route: ActivatedRoute, private apiService: ApiService, private router: Router) {
    const queryParams = this.route.snapshot.queryParams;
    const code = queryParams['code'];
    const uri = `/add-pintrest-pages?code=${code}`
    this.apiService.getRequest(uri).subscribe((res: any) => {
      if(res.status){
        this.router.navigate(['/connections']);
      }
    })
  }

  ngOnInit() {
  }

}