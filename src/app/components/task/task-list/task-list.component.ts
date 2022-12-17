import { DateHelper } from './../../../helpers/dateHelper';
import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task';
import { BaseDict } from 'src/app/models/BaseDict';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { TaskRequest } from 'src/app/models/TaskRequest';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  tasks: Task[];
  dates: Date[] = [];
  MAX_DAY_SHOW: number = 4;

  ngOnInit() {
    this.getDates();
    this.getTasks();
  }

  formatDate(dateTime: Date): string {
    const date = new Date(dateTime);
    const shortName = date.toLocaleString('en-US', { month: 'short' });
    return shortName + ' ' + date.getDate();
  }

  getTasks() {
    this.taskService.getUserTasks().subscribe({
      next: (data) => {
        this.tasks = data;

        this.tasks.forEach((element) => {
          let date = new Date(element.date);
          date.setHours(0, 0, 0, 0);
          element.date = date;
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  log(data: any) {
    console.log(data);
  }

  getCountByDate(date: Date): number {
    if (this.tasks) {
      return this.tasks.filter((x) => x.date.getDate() == date.getDate())
        .length;
    }
    return 0;
  }

  openDialog(date: Date) {
    const dialogRef = this.dialog.open(CreateTaskComponent, { data: date });
    dialogRef.afterClosed().subscribe((result) => {
      this.getTasks();
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    let task = event.previousContainer.data[event.previousIndex];
    task.itemIndex = event.currentIndex + 1;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const date = new Date(event.container.id);

      let index = this.tasks.indexOf(task);
      task.date = date;
      this.tasks[index] = task;

      const taskUpdate: TaskRequest = {
        date: DateHelper.formatDate(date),
        id: task.id,
        name: task.name,
        notes: task.notes,
        labelId: task.labelId,
      };

      this.taskService.updateTask(taskUpdate).subscribe({
        next: () => {
          this.getTasks();
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  delete(id: number) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.getTasks();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getDates() {
    for (let i = 0; i < this.MAX_DAY_SHOW; i++) {
      let today = new Date();
      today.setHours(0, 0, 0, 0);
      this.dates.push(new Date(today.setDate(today.getDate() + i)));
    }
  }
}
