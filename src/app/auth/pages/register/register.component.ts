import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) { 
    this.formulario = fb.group({
      username: ["", [Validators.required, Validators.minLength(6)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      password2: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  register(){

    const {password, password2} = this.formulario.value;

    if(password === password2){
      this._authService.register(this.formulario.value).subscribe(
        {next: res => {
          if (res === true){
            localStorage.setItem("user", JSON.stringify(this._authService.user));
            this.router.navigateByUrl("task")
          }
          else{
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: res
            })
          }
        }
        })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: "Las contraseñas no coinciden"
      })
    }
  }
}