import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ApiService } from './../../services/api.service';
import ApexCharts from 'apexcharts';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public connection: any = {};
  public action: string = '';
  public chatOptions: any = {
    chart: {
      height: '100%',
      maxWidth: '100%',
      type: 'area',
      fontFamily: 'Inter, sans-serif',
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: false,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: '#1C64F2',
        gradientToColors: ['#1C64F2'],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: 'Posts',
        data: [],
        color: '#1A56DB',
      },
    ],
    xaxis: {
      categories: [],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private msg: NzMessageService,
    private router: Router,
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => true;
    this.route.queryParams.subscribe((params) => {
      this.action = params['action'];
      if (this.action == undefined) {
        this.router.navigate(
          [`/post/create/${this.route.snapshot.params['id']}`],
          {
            queryParams: { action: 'queue' },
          },
        );
      } else {
        this.GetConnectionInfo(this.route.snapshot.params['id']);
      }
    });
  }

  public chart: any;
  ngOnInit() {
    this.GetPostCount();
    this.GetDailyPostCount();
  }
  public postCount: any = {};
  GetPostCount() {
    this.apiService
      .getRequest(
        `/social-post-count?connectionId=${this.route.snapshot.params['id']}`,
      )
      .subscribe((res: any) => {
        if (res.status) {
          this.postCount = res.data;
        } else {
          this.msg.error(res.message);
        }
      });
  }

  public totalPostCount: number = 0;

  GetDailyPostCount() {
    this.apiService.setDailyPostCount(this.route.snapshot.params['id']);
    this.apiService.dailyPostCountData.subscribe((res: any) => {
      if (res.status) {
        var postCount: any[] = [];
        var dates: any[] = [];
        const postCounts = this.generateDailyCounts(res.data);
        postCounts.forEach((element: any) => {
          postCount.push(element.daily_count);
          dates.push(this.formatDate(element.publish_date));
        });
        const el = document.querySelector('#area-chart') as HTMLElement;
        this.chart = new ApexCharts(el, this.chatOptions);
        this.chart.render();

        this.totalPostCount = postCount.reduce(
          (accumulator, currentValue) => accumulator + currentValue,
          0,
        );

        this.chart.updateOptions({
          series: [
            {
              data: postCount,
            },
          ],
          xaxis: {
            categories: dates,
          },
        });
      }
    });
  }

  generateDailyCounts(data: any) {
    // Initialize an array to hold the result
    let result = [];

    // Parse the provided data
    let providedCounts: any = {};
    data.forEach((item: any) => {
      providedCounts[item.publish_date] = item.daily_count;
    });

    // Get the start date and end date
    let startDate = new Date();
    let endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 29);

    // Generate the dates and fill counts
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      let isoDate = d.toISOString();
      let dateOnly = isoDate.split('T')[0] + 'T00:00:00Z';

      result.push({
        daily_count: providedCounts[dateOnly] || 0,
        publish_date: dateOnly,
      });
    }

    return result;
  }

  formatDate(date: Date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}-${this.addLeadingZero(month)}-${this.addLeadingZero(day)}`;
  }
  addLeadingZero(value: any) {
    return String(value).padStart(2, '0');
  }

  GetConnectionInfo(connection_id: string) {
    this.apiService.getRequest(`/connections/${connection_id}`).subscribe(
      (res: any) => {
        if (res.status) {
          this.connection = res.data;
        } else {
          this.msg.error(res.message);
        }
      },
      (err) => {
        this.msg.error(err.message);
      },
    );
  }
}
