import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/auth/service/api.service';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.css']
})
export class DraftComponent implements OnInit {


  @Input() connection: any;
  public addNewLink: string = ""

  public connections: any[] = []

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService) {
    const id = this.route.snapshot.params['id'];
    this.getScheduledPosts(id);
  }

  getScheduledPosts(connection_id : string){
    this.apiService.getRequest(`/social-posts?connectionId=${connection_id}&status=draft`).subscribe((res: any) => {
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