import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from 'src/app/auth/service/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public postCount: number = 0
  public publishedCount: number = 0
  public failedCount: number = 0
  public scheduledCount: number = 0
  public connectionsCount: number = 0
  public posts: any = {};
  public loading: boolean = true

  constructor(
    private apiService: ApiService,
    private msgService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getDashboardData()
    this.getPosts()
  }
  getPosts(){

    this.apiService.getRequest(`/social-posts?from=2024-05-01&to=2024-05-31`).subscribe((res: any) => {
      if (res.status) {
        this.posts = this.formatPosts(res.data)
        this.loading = false
      }else{
        this.msgService.error(res.message)
        this.loading = false
      }

    }, err => {
      this.loading = false
      this.msgService.error(err.error.message)
    })

  }

  formatPosts(posts: any[]){
    const result: any = {};

    posts.forEach(post => {
      const date = post.PublishAt.split('T')[0];
      
      if (!result[date]) {
        result[date] = [];
      }
      
      result[date].push({...post});
    });
    return result
  }


  getPostsForDate(date: Date): any {
    const formattedDate = date.toISOString().split('T')[0];
    if (this.posts[formattedDate]) {
      return this.posts[formattedDate]
    };
    return []
  }

  getDashboardData() {
    this.apiService.getRequest(`/dashboard`).subscribe((res: any) => {
      if (res.status) {
        this.postCount = res.data.post_count
        this.publishedCount = res.data.published_count
        this.failedCount = res.data.failed_count
        this.scheduledCount = res.data.scheduled_count
        this.connectionsCount = res.data.connections_count
      }else{
        this.msgService.error(res.message)
      }

    }, err => {
      this.msgService.error(err.error.message)
    })
  }


  // getMonthData(date: Date): number | null {
  //   if (date.getMonth() === 8) {
  //     return 1394;
  //   }
  //   return null;
  // }

}
