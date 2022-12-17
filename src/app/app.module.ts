import { CreateHabitComponent } from './components/habit/create-habit/create-habit.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { TaskListComponent } from './components/task/task-list/task-list.component';
import { TaskSidebarComponent } from './components/task-sidebar/task-sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginActivate } from './helpers/login.activate';
import { httpInterceptorProviders } from './interceptor/http.request.interceptor';
import { LoginComponent } from './components/login/login.component';
import { FilterArrayPipe } from './pipes/filter.array.pipe';
import { CreateTaskComponent } from './components/task/create-task/create-task.component';
import { MaterialModule } from './material.module';
import { HabitListComponent } from './components/habit/habit-list/habit-list.component';
import { OrderByPipe } from './pipes/orderby.pipe';
import { MatTimepickerModule } from 'mat-timepicker';

@NgModule({
  declarations: [
    AppComponent,
    TaskSidebarComponent,
    TaskListComponent,
    CalendarComponent,
    LoginComponent,
    FilterArrayPipe,
    OrderByPipe,
    CreateTaskComponent,
    HabitListComponent,
    CreateHabitComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatTimepickerModule,
  ],
  providers: [httpInterceptorProviders, LoginActivate],
  bootstrap: [AppComponent],
})
export class AppModule {}
