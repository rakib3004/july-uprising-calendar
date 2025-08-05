import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-july-custom-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './july-custom-calendar.component.html',
  styleUrl: './july-custom-calendar.component.css'
})
export class JulyCustomCalendarComponent implements OnInit {
  
  currentDate: Date = new Date();
  displayDate: Date = new Date(); // The month being displayed
  
  days: (number | null)[] = [];
  
  banglaDigits: string[] = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  
  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    const startingDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    this.days = [];

    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < startingDay; i++) {
      this.days.push(null);
    }

    // Add the days of the month
    for (let i = 1; i <= totalDays; i++) {
      this.days.push(i);
    }
  }

  // Returns the custom July day for a given regular date
  getCustomJulyDay(day: number | null): number | null {
    if (day === null) {
      return null;
    }
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();
    const date = new Date(year, month, day);
    
    // Calculate the day of the year
    const startOfYear = new Date(year, 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    return dayOfYear;
  }

  // Converts a number to Bangla numerals
  toBanglaNumber(num: number | null): string {
    if (num === null) {
      return '';
    }
    return num.toString().split('').map(d => this.banglaDigits[+d] || d).join('');
  }

  // Returns the month name in English
  get monthName(): string {
    return this.displayDate.toLocaleString('default', { month: 'long' });
  }

  // Returns the year
  get year(): number {
    return this.displayDate.getFullYear();
  }

  // Navigate to the previous month
  prevMonth(): void {
    this.displayDate.setMonth(this.displayDate.getMonth() - 1);
    this.generateCalendar();
  }

  // Navigate to the next month
  nextMonth(): void {
    this.displayDate.setMonth(this.displayDate.getMonth() + 1);
    this.generateCalendar();
  }

  // Returns true if the given day is today
  isToday(day: number | null): boolean {
    if (day === null) {
      return false;
    }
    const today = new Date();
    return (
      this.displayDate.getFullYear() === today.getFullYear() &&
      this.displayDate.getMonth() === today.getMonth() &&
      day === today.getDate()
    );
  }
}
