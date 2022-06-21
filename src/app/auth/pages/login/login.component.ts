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
      email: ["a@a.com", [Validators.required, Validators.email]],
      password: ["123456", [Validators.required, Validators.minLength(6)]]
    })
  }

  ngOnInit(): void {
  }

  login(){
    this._authService.login(this.formulario.value).subscribe({next: res => console.log(res), complete: () => console.log(this._authService.user)});
    console.log(this.formulario.value);
    
    this.router.navigate(['/task']);
  }

}
