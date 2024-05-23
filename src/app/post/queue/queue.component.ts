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
  public schedulesPost: any[] = [];
  public postId: number = 0;
  public isEdit: boolean = false;
  public loading: boolean = true

  public postingTimes: any = {
    Monday: ['04:00 AM', '10:00 AM', '11:00 AM', '04:00 PM', '07:00 PM'],
    Tuesday: ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '07:00 PM'],
    Wednesday: ['09:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM'],
    Thursday: ['10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '04:00 PM'],
    Friday: ['08:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '06:00 PM'],
    Saturday: ['08:00 AM', '09:00 AM', '10:00 AM', '04:00 PM', '08:05 PM'],
    Sunday: ['10:00 AM', '11:00 AM', '03:00 PM', '07:00 PM', '12:10 AM'],
  };
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
        `/social-posts?connectionId=${connection_id}&status=scheduled`,
      )
      .subscribe((res: any) => {
        this.loading = false
        if (res.status) {
          this.schedulesPost = res.data;
          this.schedules = this.assignPostsToSlots(
            this.postingTimes,
            this.schedulesPost,
          );
        }else{
          this.msgService.error(res.message)
        }
      }, err => {
        this.loading = false
        this.msgService.error(err.message)
      });
  }

  convertTime12to24(time12h: any) {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
      hours = '00';
    }

    if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
  }

  getDatesArray(days: number) {
    const datesArray = [];
    const currentDate = new Date();

    for (let i = 0; i < days; i++) {
      const futureDate = new Date(currentDate);
      futureDate.setDate(currentDate.getDate() + i);
      datesArray.push(futureDate);
    }

    return datesArray;
  }

  isValidDate(dateString: string) {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
  }

  convertDateToISO(dateStr: any) {

    const [month, day, year] = dateStr.split('/');

    const paddedMonth = month.padStart(2, '0');
    const paddedDay = day.padStart(2, '0');

    // Combine the components in the format yyyy-mm-dd
    const isoDateStr = `${year}-${paddedMonth}-${paddedDay}`;

    return isoDateStr;
  }

  assignPostsToSlots(postingTimes: any, posts: any[] = []) {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const timeSlots: any = {};

    const futureDates = this.getDatesArray(7);

    futureDates.forEach((date) => {
      var isValid = this.isValidDate(date.toDateString())
      if (isValid) {
        const day = daysOfWeek[date.getDay()];
        const dayKey = this.convertDateToISO(
          date.toLocaleString().split(', ')[0],
        );
        const slots = postingTimes[day].map((slot: any) =>
          this.convertTime12to24(
            slot + ' ' + (slot.includes('AM') || slot.includes('PM') ? '' : 'AM'),
          ),
        );
        timeSlots[dayKey] = [];

        slots.forEach((slot: any) => {
          const emptySlot: any = {};
          emptySlot[slot] = {};
          if (new Date(dayKey + 'T' + slot) > new Date()) {
            timeSlots[dayKey].push(emptySlot);
          }
        });
      }
      
    });

    if (posts == null || posts.length <= 0) {
      return timeSlots;
    }

    posts.forEach((post: any) => {
      const publishDate = new Date(new Date(post.PublishAt).toLocaleString());
      var localTime = new Date(post.PublishAt).toLocaleString();

      var isValid = this.isValidDate(localTime)
      if (isValid) {

      const dayKey = this.convertDateToISO(localTime.split(', ')[0]);
      var time = this.convertTime12to24(localTime.split(', ')[1]);
      time = parseInt(time.split(':')[0]) < 10 ? '0' + time : time;

      if (timeSlots[dayKey]) {
        const slotIndex = timeSlots[dayKey].findIndex(
          (slot: any) => Object.keys(slot)[0] === time,
        );
        if (slotIndex !== -1) {
          timeSlots[dayKey][slotIndex] = { [time]: { ...post } };
        } else {
          const newSlot: any = {};
          newSlot[time] = { ...post };
          timeSlots[dayKey].push(newSlot);
          timeSlots[dayKey].sort((a: any, b: any) =>
            Object.keys(a)[0].localeCompare(Object.keys(b)[0]),
          );
        }
      }
    }
    });

    return timeSlots;
  }

  getDates(): string[] {
    return Object.keys(this.schedules);
  }

  getTimeFromSlot(slot: any): string {
    return Object.keys(slot)[0];
  }

  getPostFromSlot(slot: any): any {
    return slot[this.getTimeFromSlot(slot)];
  }
}
