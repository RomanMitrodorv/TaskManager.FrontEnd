import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './components/calendar/calendar.component';
import { HabitListComponent } from './components/habit/habit-list/habit-list.component';
import { LoginComponent } from './components/login/login.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { LoginActivate } from './helpers/login.activate';

const routes: Routes = [
  {
    path: 'calendar',
    component: CalendarComponent,
    canActivate: [LoginActivate],
  },
  {
    path: 'task-list',
    component: TaskListComponent,
    canActivate: [LoginActivate],
  },
  {
    path: 'habit-list',
    component: HabitListComponent,
    canActivate: [LoginActivate],
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
