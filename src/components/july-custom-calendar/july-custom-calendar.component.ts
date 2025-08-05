import { Component } from '@angular/core';

@Component({
  selector: 'app-july-custom-calendar',
  standalone: true,
  imports: [],
  templateUrl: './july-custom-calendar.component.html',
  styleUrl: './july-custom-calendar.component.css'
})
export class JulyCustomCalendarComponent {
  today: Date = new Date();
  startOfCustomJuly: Date = new Date(2024, 6, 0); // July 1, 2024 (month is 0-indexed)
  banglaMonths: string[] = ['জুলাই'];
  banglaDigits: string[] = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];

  // Returns the custom July day number for a given date
  getCustomJulyDay(date: Date): number {
    const start = new Date(this.startOfCustomJuly.getFullYear(), this.startOfCustomJuly.getMonth(), 1);
    const diff = Math.floor((date.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return diff + 1;
  }

  // Returns the custom July year (always 2024+)
  getCustomJulyYear(date: Date): number {
    return date.getFullYear();
  }

  // Converts a number to Bangla numerals
  toBanglaNumber(num: number): string {
    return num.toString().split('').map(d => this.banglaDigits[+d] || d).join('');
  }

  // Returns today's custom July date in Bangla
  get todayCustomJulyBangla(): string {
    const day = this.getCustomJulyDay(this.today);
    const year = 2024;
    return `জুলাই ${this.toBanglaNumber(day)}, ${this.toBanglaNumber(year)}`;
  }

  // Generate a grid of July days (e.g., 1-401 for a year)
  get julyDays(): number[] {
    // For demonstration, let's show 1-401 days
    return Array.from({length: 401}, (_, i) => i + 1);
  }

  // Returns true if the given day is today
  isToday(day: number): boolean {
    return this.getCustomJulyDay(this.today) === day;
  }
}
