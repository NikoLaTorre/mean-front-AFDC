import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-main-task',
  templateUrl: './main-task.component.html',
  styleUrls: ['./main-task.component.css']
})
export class MainTaskComponent implements OnInit {

  formulario: FormGroup;

  constructor(private _authService: AuthService, private _crudService: CrudService, private router: Router, private fb: FormBuilder) { 
    this.formulario = fb.group({
      tarea: ["", [Validators.required]]
    })
  }


  user: any;
  tasks: Array<any> = [];
  newTask: string = '';

  ngOnInit(): void {
    this.user = this._crudService.user;
    this.cargarTareas();
  }

  logout(){
    localStorage.clear();
    this.router.navigateByUrl("/auth");
  }

  delete(id: string){
    this._crudService.delete(id).subscribe( res => {
      this.cargarTareas();
    });
  }

  create(){
    this._crudService.create(this.newTask).subscribe( res => this.cargarTareas());
    this.formulario.reset();
  }

  update(task: any){

    const {_id, nombre} = task;

    this.router.navigateByUrl(`/task/${_id}/${nombre}`);
  }

  cargarTareas(){
    this._crudService.read().subscribe( res => this.tasks = res.tareas )
  }

}
