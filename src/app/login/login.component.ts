import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

    logInForm: FormGroup = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

  onSubmit() {
    if (this.logInForm.valid) {
debugger
      const username = this.logInForm.get('username')?.value;
      const password = this.logInForm.get('password')?.value;
      console.log('Username:', username);
      console.log('Password:', password);
      this.authService.logIn(this.logInForm.get('username')?.value,this.logInForm.get('password')?.value).subscribe(
        response => {
          console.log('Login successful:', response);
          this.router.navigate(['/']);
        },        error => {
          console.error('Login failed:', error);
        }
      );

    }
  }
  navigateToRegister(){
    this.router.navigate(['/register']);
  }
}
