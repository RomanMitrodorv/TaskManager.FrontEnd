import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Habit } from 'src/app/models/Habit';
import { HabitService } from 'src/app/services/habit.service';
import { CreateHabitComponent } from '../create-habit/create-habit.component';

@Component({
  selector: 'app-habit-list',
  templateUrl: './habit-list.component.html',
  styleUrls: ['./habit-list.component.css'],
})
export class HabitListComponent implements OnInit {
  constructor(private habitService: HabitService, public dialog: MatDialog) {}

  habits: Habit[];

  ngOnInit() {
    this.getHabits();
  }

  open() {
    const dialogRef = this.dialog.open(CreateHabitComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.getHabits();
    });
  }

  delete(id: number) {
    this.habitService.deleteHabit(id).subscribe({
      next: (data) => {
        this.getHabits();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getHabits() {
    this.habitService.getUserHabits().subscribe({
      next: (data) => {
        this.habits = data;
        console.log(this.habits);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
