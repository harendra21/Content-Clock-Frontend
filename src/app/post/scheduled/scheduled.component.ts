import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/auth/service/api.service';

@Component({
  selector: 'app-scheduled',
  templateUrl: './scheduled.component.html',
  styleUrls: ['./scheduled.component.css']
})
export class ScheduledComponent implements OnInit {

  @Input() connection: any;

  @ViewChild('defaultDot', { static: true }) defaultDot?: TemplateRef<any>;
  @ViewChild('successDot', { static: true }) successDot?: TemplateRef<any>;
  @ViewChild('errorDot', { static: true }) errorDot?: TemplateRef<any>;
  @ViewChild('scheduledDot', { static: true }) scheduledDot?: TemplateRef<any>;

  public status: string = "";
  public loading: boolean = false;

  public connections: any[] = []

  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private apiService: ApiService,
    private msgService: NzMessageService
  ) {
    
    const id = this.route.snapshot.params['id'];
    this.getScheduledPosts(id);
  }

  statusChange(status: string){
    this.status = status;
    this.getScheduledPosts(this.connection.ConnectionId);
  }

  getScheduledPosts(connection_id : string){
    this.loading = true;
    this.apiService.getRequest(`/social-posts?connectionId=${connection_id}&status=${this.status}`).subscribe((res: any) => {
      if (res.status){
        this.connections = res.data;
      }else{
        this.msgService.error(res.message);
      }
      this.loading = false;
    }, err => {
      this.msgService.error(err.message);
      this.loading = false;
    })
  }

  ngOnInit() {
  }

  redirectAddNew(){
    this.router.navigate([`/post/create/${this.connection.ConnectionId}`], { queryParams: { "action": "add-new" } })
  }

  navigateToEdit(postId: any){
    this.router.navigate([`/post/create/${this.connection.ConnectionId}`], { queryParams: { "action": "queue", "edit": postId } })
  }

  deletePost(postId: any){
    this.apiService.deleteRequest(`/social-posts/${postId}`).subscribe((res: any) => {
      if (res.status){
        this.msgService.success(res.message);
        this.getScheduledPosts(this.connection.ConnectionId);
      }else{
        this.msgService.error(res.message);
      }
    }, err => {
      this.msgService.error(err.message);
    })
  }

  getDotTemplate(status: string): any {
    switch (status) {
      case 'published':
        return this.successDot;
      case 'draft':
        return this.scheduledDot;
      case 'failed':
        return this.errorDot;
      case 'scheduled':
        return this.scheduledDot;
      default:
        return this.defaultDot;
    }
  }


}