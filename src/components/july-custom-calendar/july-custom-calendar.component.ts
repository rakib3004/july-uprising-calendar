import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-july-custom-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './july-custom-calendar.component.html',
  styleUrl: './july-custom-calendar.component.css'
})
export class JulyCustomCalendarComponent implements OnInit {
  
  displayDate: Date = new Date();
  days: (number | null)[] = [];
  banglaDigits: string[] = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  banglaMonths: string[] = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  customJulyStartDate: Date = new Date(2024, 6, 1);
  
  years: number[] = [];
  selectedYear!: number;
  selectedMonth!: number;

  // Modal properties
  modalVisible: boolean = false;
  modalContent: string = '';
  modalX: number = 0;
  modalY: number = 0;

  ngOnInit(): void {
    for (let i = 1901; i <= 2100; i++) {
      this.years.push(i);
    }
    this.selectedYear = this.displayDate.getFullYear();
    this.selectedMonth = this.displayDate.getMonth();
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

    for (let i = 0; i < startingDay; i++) {
      this.days.push(null);
    }

    for (let i = 1; i <= totalDays; i++) {
      this.days.push(i);
    }
  }

  onDateChange(): void {
    this.displayDate = new Date(this.selectedYear, this.selectedMonth, 1);
    this.generateCalendar();
  }

  getCustomJulyDay(day: number | null): number | null {
    if (day === null) return null;
    const currentDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), day);
    if (currentDate < this.customJulyStartDate) return day;
    const diff = Math.floor((currentDate.getTime() - this.customJulyStartDate.getTime()) / (1000 * 3600 * 24));
    return diff + 1;
  }

  isCustomJulyDate(day: number | null): boolean {
    if (day === null) return false;
    const currentDate = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), day);
    return currentDate >= this.customJulyStartDate;
  }

  getActualDate(day: number | null): string {
    if (day === null) return '';
    const date = new Date(this.displayDate.getFullYear(), this.displayDate.getMonth(), day);
    const monthName = this.banglaMonths[date.getMonth()];
    const dayInBangla = this.toBanglaNumber(date.getDate());
    const yearInBangla = this.toBanglaNumber(date.getFullYear());
    return `${monthName} ${dayInBangla}, ${yearInBangla}`;
  }

  toBanglaNumber(num: number | null): string {
    if (num === null) return '';
    return num.toString().split('').map(d => this.banglaDigits[parseInt(d)] || d).join('');
  }

  get monthName(): string {
    return this.banglaMonths[this.displayDate.getMonth()];
  }

  get year(): number {
    return this.displayDate.getFullYear();
  }

  isToday(day: number | null): boolean {
    if (day === null) return false;
    const today = new Date();
    return this.displayDate.getFullYear() === today.getFullYear() &&
           this.displayDate.getMonth() === today.getMonth() &&
           day === today.getDate();
  }

  showModal(event: MouseEvent, day: number | null): void {
    if (day === null) return;
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    this.modalContent = this.getActualDate(day);
    this.modalX = rect.left + window.scrollX + rect.width / 2;
    this.modalY = rect.top + window.scrollY - 40;
    this.modalVisible = true;
  }

  hideModal(): void {
    this.modalVisible = false;
  }

  onOverlayClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('fixed')) {
      this.hideModal();
    }
  }

}