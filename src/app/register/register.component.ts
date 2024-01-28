import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  signUpForm: FormGroup;
  roles: any[] = [];
  selectedRoleId: number | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)]],
        selectedRoleId: [null, Validators.required]
      }
    )
  }
  ngOnInit() {
    this.getRoles();
  }

  getRoles() {
    this.authService.getRoles().subscribe((data: any) => {
      console.log('roles',this.roles);
      this.roles = data;
    });
  }

  getUsernameControl() {
    return this.signUpForm.get('username');
  }
  getPasswordControl() {
    return this.signUpForm.get('password');
  }
  getEmailControl() {
    return this.signUpForm.get('email');
  }
  getRoleIdControl() {
    return this.signUpForm.get('selectedRoleId');
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('email',this.getRoleIdControl());
      this.authService.register(this.getUsernameControl()!.value, this.getPasswordControl()!.value, 
      this.getEmailControl()!.value, this.getRoleIdControl()!.value).subscribe(
        response => {
          console.log('Registration successful:', response);
          this.router.navigate(['/']);
        }, error => {
          console.error('Registration failed:', error);
        }
      );
    }
  }
}