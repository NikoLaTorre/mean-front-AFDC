import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) { 
    this.formulario = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  login(){
    this._authService.login(this.formulario.value).subscribe(
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
  }
}
