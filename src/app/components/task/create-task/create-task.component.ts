import { Component, Inject, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/models/Task';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskRequest } from 'src/app/models/TaskRequest';
import { DatePipe, formatDate } from '@angular/common';
import { BaseDict } from 'src/app/models/BaseDict';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateHelper } from 'src/app/helpers/dateHelper';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
})
export class CreateTaskComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public date: any
  ) {}

  taskForm: FormGroup;
  labels: BaseDict[];

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: ['', Validators.required],
      notes: [''],
      labelId: ['', Validators.required],
    });

    this.taskService.getLabels().subscribe({
      next: (data) => {
        this.labels = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  create() {
    const task: TaskRequest = {
      date: DateHelper.formatDate(this.date),
      name: this.taskForm.value.name,
      notes: this.taskForm.value.notes,
      labelId: this.taskForm.value.labelId,
    };

    this.taskService.createTask(task).subscribe({
      next: (data) => {
        console.log(data);
        this.dialogRef.close();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
