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
  
  displayDate: Date = new Date(); // The month being displayed
  days: (number | null)[] = [];
  banglaDigits: string[] = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  banglaMonths: string[] = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  customJulyStartDate: Date = new Date(2024, 6, 1); // July 1, 2024

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();

    if (year < 1901 || year > 2100) {
      return;
    }

    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const startingDay = firstDayOfMonth.getDay();
    const totalDays = lastDayOfMonth.getDate();

    this.days = [];

    for (let i = 0; i < startingDay; i++) {
      this.days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      this.days.push(i);
    }
  }

  getCustomJulyDay(day: number | null): number | null {
    if (day === null) {
      return null;
    }

    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();
    const currentDate = new Date(year, month, day);

    if (currentDate < this.customJulyStartDate) {
      return day; // Return the regular day
    }

    const diff = Math.floor((currentDate.getTime() - this.customJulyStartDate.getTime()) / (1000 * 3600 * 24));
    return diff + 1;
  }

  isCustomJulyDate(day: number | null): boolean {
    if (day === null) {
      return false;
    }
    const year = this.displayDate.getFullYear();
    const month = this.displayDate.getMonth();
    const currentDate = new Date(year, month, day);
    return currentDate >= this.customJulyStartDate;
  }

  toBanglaNumber(num: number | null): string {
    if (num === null) {
      return '';
    }
    return num.toString().split('').map(d => this.banglaDigits[+d] || d).join('');
  }

  get monthName(): string {
    const monthIndex = this.displayDate.getMonth();
    return this.banglaMonths[monthIndex];
  }

  get year(): number {
    return this.displayDate.getFullYear();
  }

  prevMonth(): void {
    const currentYear = this.displayDate.getFullYear();
    if (currentYear <= 1901 && this.displayDate.getMonth() === 0) {
      return;
    }
    this.displayDate.setMonth(this.displayDate.getMonth() - 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    const currentYear = this.displayDate.getFullYear();
    if (currentYear >= 2100 && this.displayDate.getMonth() === 11) {
      return;
    }
    this.displayDate.setMonth(this.displayDate.getMonth() + 1);
    this.generateCalendar();
  }

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
