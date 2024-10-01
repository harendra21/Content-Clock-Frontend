import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from './../../../services/api.service';

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
  public loading: boolean = false

  constructor(
    private apiService: ApiService,
    private msgService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.getDashboardData()
    this.getPosts()
  }
  getPosts() {
    const dates = this.getFirstAndLastDateOfCurrentMonth()
    this.apiService.getRequest(`/social-posts?from=${dates.firstDate}&to=${dates.lastDate}`).subscribe((res: any) => {
      if (res.status) {
        this.posts = this.formatPosts(res.data)
      } else {
        this.msgService.error(res.message)
      }
      this.loading = false

    }, err => {
      this.loading = false
      this.msgService.error(err.message)
    })

  }

  formatPosts(posts: any[]) {
    const result: any = {};
    posts.forEach(post => {
      const date = post.publish_at.split('T')[0];
      if (!result[date]) {
        result[date] = [];
      }
      result[date].push({ ...post });
    });
    return result
  }

  getDashboardData() {
    this.apiService.getRequest(`/dashboard`).subscribe((res: any) => {
      if (res.status) {
        this.postCount = res.data.post_count
        this.publishedCount = res.data.published_count
        this.failedCount = res.data.failed_count
        this.scheduledCount = res.data.scheduled_count
        this.connectionsCount = res.data.connections_count
      } else {
        this.msgService.error(res.message)
      }

    }, err => {
      this.msgService.error(err.error.message)
    })
  }

  getFirstAndLastDateOfCurrentMonth() {
    // Get the current date
    const now = new Date();

    // Get the first date of the current month
    const firstDate = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get the last date of the current month
    const lastDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Format dates to yyyy-mm-dd
    const formatDate = (date: any) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      firstDate: formatDate(firstDate),
      lastDate: formatDate(lastDate)
    };
  }


  // getMonthData(date: Date): number | null {
  //   if (date.getMonth() === 8) {
  //     return 1394;
  //   }
  //   return null;
  // }

}
