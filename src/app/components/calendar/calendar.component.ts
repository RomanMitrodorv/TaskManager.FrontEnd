import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {
  ngOnInit(): void {}

  constructor() {
    this.year = new Date().getFullYear();
  }

  year: number;

  day_names: string[] = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  month_names: string[] = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];

  yearInc(): number {
    return (this.year += 1);
  }

  yearDec(): number {
    return (this.year -= 1);
  }

  isLeapYear(year: number): boolean {
    return (
      (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
      (year % 100 === 0 && year % 400 === 0)
    );
  }

  getDaysFebruary(year: number): number {
    return this.isLeapYear(year) ? 29 : 28;
  }

  isDayOf(day: number, month: number): boolean {
    let date = new Date(this.year, month, day);
    var dayOfWeek = date.getDay();
    return dayOfWeek === 6 || dayOfWeek === 0;
  }

  daysOfMonth(): number[] {
    return [
      31,
      this.getDaysFebruary(this.year),
      31,
      30,
      31,
      30,
      31,
      31,
      30,
      31,
      30,
      31,
    ];
  }

  isToday(day: number, month: number): boolean {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    let comparableDate = new Date(this.year, month, day);
    return today.toDateString() === comparableDate.toDateString();
  }

  daysGenerater(): number[][] {
    let days: number[][] = [];
    for (let k = 0; k < this.daysOfMonth().length; k++) {
      days.push([]);
      for (let i = 1; i <= this.daysOfMonth()[k]; i++) {
        if (days[k].length < this.daysFormat(k)) {
          i -= i;
          days[k].push(0);
          continue;
        }
        days[k].push(i);
      }
    }
    return days;
  }

  daysFormat(month: number) {
    let dayOfWeek = new Date(this.year, month).getDay();
    switch (dayOfWeek) {
      case 0:
        dayOfWeek = 6;
        break;
      case 1:
        dayOfWeek = 0;
        break;
      case 2:
        dayOfWeek = 1;
        break;
      case 3:
        dayOfWeek = 2;
        break;
      case 4:
        dayOfWeek = 3;
        break;
      case 5:
        dayOfWeek = 4;
        break;
      case 6:
        dayOfWeek = 5;
        break;
      default:
        dayOfWeek = new Date(this.year, month).getDay();
        break;
    }
    return dayOfWeek;
  }
}
