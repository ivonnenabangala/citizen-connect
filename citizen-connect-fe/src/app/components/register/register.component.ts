import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatInputModule, 
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  regForm!: FormGroup
  errorMessage: string = ''
  successMessage: string = ''
  isLoading: boolean = false
  hidePassword: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    this.regForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  

  onSubmit(): void{
    if(this.regForm.invalid){
      return
    }
    this.isLoading = true
    this.errorMessage = ''
    this.successMessage = ''

    const {username, email, password} = this.regForm.value
    console.log(username, email, password);
    
    this.registerService.register(username, email, password).subscribe({
      next: () => {
        this.isLoading = false
        this.successMessage = '✅ Account created successfully! Redirecting to login...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 3000);
      },
      error: (err) => {
        this.isLoading = false
        // console.error('Full Error Response:', err)

      this.errorMessage = err?.error?.message || 'Registration failed! Please try again'
      }
    })
  }

  get username() {
    return this.regForm.get('username')
  }

  get email() {
    return this.regForm.get('email')
  }

  get password() {
    return this.regForm.get('password')
  }

}
