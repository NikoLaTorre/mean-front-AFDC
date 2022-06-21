import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { MainTaskComponent } from './pages/main-task/main-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskUpdateComponent } from './pages/task-update/task-update.component';


@NgModule({
  declarations: [
    MainTaskComponent,
    TaskUpdateComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TaskModule { }
