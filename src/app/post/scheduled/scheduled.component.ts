import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/auth/service/api.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {

  @Input() connection: any;

  public connections: any[] = []

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    
    const id = this.route.snapshot.params['id'];
    this.getScheduledPosts(id);
  }

  getScheduledPosts(connection_id : string){
    this.apiService.getRequest(`/social-posts?connectionId=${connection_id}&status=scheduled`).subscribe((res: any) => {
      if (res.status){
        this.connections = res.data;
      }
    })
  }

  ngOnInit() {
  }

  redirectAddNew(){
    this.router.navigate([`/post/create/${this.connection.ConnectionId}`], { queryParams: { "action": "add-new" } })
  }


}