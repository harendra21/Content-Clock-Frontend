import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ApiService } from 'src/app/auth/service/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css'],
})
export class QueueComponent implements OnInit {
  @Input() connection: any = {};
  public schedules: any = [];
  public isVisible: boolean = false;
  public slot: any;
  public posts: any[] = [];
  public postId: number = 0;
  public isEdit: boolean = false;
  public loading: boolean = true

  constructor(
    private modalService: NzModalService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private msgService: NzMessageService
  ) {}

  
  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async runLoopWithDelay() {
    for (let i = 0; i < 50; i++) {
      if (Object.keys(this.connection).length !== 0){
        this.getScheduledPosts(this.connection.ConnectionId);
        break
      }
      await this.sleep(100);
    }
  }
  ngOnInit() {
    this.runLoopWithDelay();
    this.addPostModal()
    
    this.route.queryParams.subscribe(params => {
      if (params['edit']) {
        this.editPost(params['edit']);
        this.isEdit = true;
      }
    });

    this.addPostModal()

  }

  public modalWidth = "1024px"
  addPostModal(): void {
    if (window.innerWidth <= environment.lgBreakpoint) {
      this.modalWidth = "100%"
    }
  }

  handleCancel() {
    this.showConfirm();
    return false;
  }

  addNew(dateTime: any = null) {
    if (dateTime == null) {
      dateTime = new Date();
    }
    this.slot = new Date(dateTime);
    this.isVisible = true;
  }

  editPost(postId: number) {
    this.postId = postId;
    this.isVisible = true;
  }

  showConfirm(): void {
    this.modalService.confirm({
      nzTitle: 'Confirm',
      nzContent: 'Do you want to close?',
      nzOkText: 'OK',
      nzCancelText: 'Cancel',
      nzOnCancel: () => {
        this.isVisible = true;
      },
      nzOnOk: () => {
        this.isVisible = false;
        this.postId = 0;
        if (this.isEdit) {
          this.router.navigate([`/post/create/${this.connection.ConnectionId}`], { queryParams: { "action": "queue" } })
          this.isEdit = false;
        }
      },
    });
  }

  getScheduledPosts(connection_id: string) {
    this.apiService
      .getRequest(
        `/social-posts?connectionId=${connection_id}&status=scheduled&action=queue`,
      )
      .subscribe((res: any) => {
        this.loading = false
        if (res.status) {
          this.posts = res.data;
          
        }else{
          this.msgService.error(res.message)
        }
      }, err => {
        this.loading = false
        this.msgService.error(err.message)
      });
  }
}
