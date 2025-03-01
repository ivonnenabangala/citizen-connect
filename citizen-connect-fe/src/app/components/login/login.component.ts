import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
@Component({
  selector: 'app-login',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup
  errorMessage: string = ''
  isLoading: boolean = false
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  // ngOnInit(): void {
  //   if(this.loginService.isLoggedIn()){
  //     this.router.navigate(['/dashboard'])
  //   }
  // }
  ngOnInit(): void {
    console.log('LoginComponent initialized');
    console.log('User logged in:', this.loginService.isLoggedIn());
  
    if (this.loginService.isLoggedIn()) {
      console.log('Redirecting to dashboard...');
      this.router.navigate(['/dashboard']);
    }
  }
  

  onSubmit(): void{
    if(this.loginForm.invalid){
      return
    }
    this.isLoading = true
    this.errorMessage = ''

    const {email, password} = this.loginForm.value

    this.loginService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/dashboard'])
      },
      error: (err) => {
        this.isLoading = false
        this.errorMessage = err.error?.message || 'Login failed! Please try again'
      }
    })
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

}
