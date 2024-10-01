import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.css']
})
export class SuccessComponent implements OnInit {

  constructor(private route: ActivatedRoute, private cookieService: CookieService, private router: Router) {
    

  }

  ngOnInit() {
    const queryParams = this.route.snapshot.queryParams;
    const accessToken = queryParams['accessToken'];
    var expirySeconds = 86400 * 7
    const expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (expirySeconds * 1000));
    this.cookieService.set('accessToken', accessToken, expiryDate, "/");
    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 1500)
  }

}