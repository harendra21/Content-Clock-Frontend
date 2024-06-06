import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from './../../environments/environment';
import { AuthService } from '../auth/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent implements OnInit {
  public apiHost = environment.v1Api

  constructor(private authService: AuthService, private router: Router) {
    this.authService.checkAuth()
  }

  ngOnInit(): void {

  }


}
