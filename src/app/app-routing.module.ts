import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskModule } from './task/task.module';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then( m => m.AuthModule)
  },
  {
    path: "task",
    loadChildren: () => import("./task/task.module").then( m => m.TaskModule)
  },
  {
    path: "**",
    redirectTo: "auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
