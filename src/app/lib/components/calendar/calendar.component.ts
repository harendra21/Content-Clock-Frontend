import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  month: number;
  year: number;
  daysInMonth: any[] = [];
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  @Input() data: any;
  env = environment

  constructor() {
    const currentDate = new Date();
    this.month = currentDate.getMonth(); // Current month (0-based index)
    this.year = currentDate.getFullYear(); // Current year
    

  }

  ngOnInit(): void {
    this.generateCalendar(this.month, this.year);
  }

  generateCalendar(month: number, year: number): void {
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = [];

    // Fill initial empty slots
    for (let i = 0; i < firstDayOfMonth; i++) {
      this.daysInMonth.push(null);
    }

    // Fill the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      this.daysInMonth.push(day);
    }


  }

  getMonthName(month: number): string {
    return new Date(this.year, month).toLocaleString('default', { month: 'long' });
  }

  getPostsForDate(day: number): any {

    var date = new Date(this.year, this.month, day - 1);

    const formattedDate = date.toISOString().split('T')[0];
    if (this.data[formattedDate]) {
      return this.data[formattedDate]
    };
    return []
  }

  getImage(images: string){
    return images.split(',')[0]
  }

}