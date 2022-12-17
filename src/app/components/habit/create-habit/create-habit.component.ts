import { HabitCreateRequest } from './../../../models/HabitCreateRequest';
import { MatNativeDateModule } from '@angular/material/core';
import { Habit, Notification } from '../../../models/Habit';
import { HabitService } from '../../../services/habit.service';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-habit',
  templateUrl: './create-habit.component.html',
  styleUrls: ['./create-habit.component.css'],
})
export class CreateHabitComponent {
  habitForm: FormGroup;
  notificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private habtiService: HabitService,
    private dialogRef: MatDialogRef<CreateHabitComponent>
  ) {
    this.habitForm = this.fb.group({
      name: [''],
      count: [''],
      time: ['', Validators.required],
    });

    this.notificationForm = new FormGroup({
      notifications: new FormArray([]),
    });
  }

  get notifications() {
    return this.notificationForm.get('notifications') as FormArray;
  }

  timeChangeHandler(event: any) {
    const date = new Date(this.habitForm.value.time);
    const group = new FormGroup({
      time: new FormControl(date, Validators.required),
      hour: new FormControl(date.getHours(), Validators.required),
      minute: new FormControl(date.getMinutes(), Validators.required),
    });
    this.notifications.push(group);
  }

  removeNotification(index: number) {
    this.notifications.removeAt(index);
  }

  save() {
    let noticationsArray: Notification[] = [];

    this.notifications.controls.forEach((x) => {
      let notication: Notification = {
        time: `${x.value.hour}:${x.value.minute}:00`,
      };
      noticationsArray.push(notication);
    });

    const habit: HabitCreateRequest = {
      name: this.habitForm.value.name,
      periodicityId: 1,
      notifications: noticationsArray,
      count: this.habitForm.value.count,
    };
    this.habtiService.createHabit(habit).subscribe({
      next: (data) => {
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
