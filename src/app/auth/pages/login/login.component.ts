import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fb: FormBuilder, private _authService: AuthService, private router: Router) { 
    this.formulario = fb.group({
      email: ["test@test.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  login(){
    this.router.navigate(['/task']);
    /* this._authService.login().subscribe( res => console.log(res)); */
  }

}
