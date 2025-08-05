import { Component } from '@angular/core';
import { JulyCustomCalendarComponent } from '../july-custom-calendar/july-custom-calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [JulyCustomCalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title = 'জুলাই গণঅভ্যুত্থান ক্যালেন্ডার';
  today: Date;
  customDate: string;

  constructor() { 
    this.today = new Date();
    this.customDate = this.getCustomDate();
  }

  ngOnInit(): void {}

  getCustomDate(): string {
    const currentDate = new Date();
    const startOfCustomCalendar = new Date(2024, 6, 31); // July 31, 2024
    const timeDiff = currentDate.getTime() - startOfCustomCalendar.getTime();
    const customDaysPassed = Math.floor(timeDiff / (1000 * 3600 * 24));
    return `July ${31 + customDaysPassed}, 2024`;
  }
}
