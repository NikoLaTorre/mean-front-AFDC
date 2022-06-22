import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-task-update',
  templateUrl: './task-update.component.html',
  styleUrls: ['./task-update.component.css']
})
export class TaskUpdateComponent implements OnInit {

  formulario!: FormGroup;
  task: any;
  newTask: string = "";
  user:any;

  constructor(private _authService: AuthService, private _crudService: CrudService, private router: Router, private fb: FormBuilder, private route: ActivatedRoute) { 
    this.route.params.subscribe((params) =>{        
      this.task = params;
      console.log(this.task)
      this.newTask = this.task.nombre;
      }
    )
    this.formulario = fb.group({
      tarea: [this.newTask, [Validators.required]]
    })
    
  }

  ngOnInit(): void {
    this.user = this._crudService.user;
    
  }

  update(){
    this._crudService.update(this.newTask, this.task.id).subscribe( {next: res => console.log(res.ok),
    complete: () => this.router.navigateByUrl("/task")})
    
  }

}
