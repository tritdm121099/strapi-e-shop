import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng Nhập
        </h2>

        <form [formGroup]="loginForm" (ngSubmit)="onLogin()">
          <div class="mb-4">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Tên người dùng hoặc Email:</label
            >
            <input
              type="text"
              id="email"
              formControlName="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{
                'border-red-500':
                  loginForm.get('email')?.invalid &&
                  loginForm.get('email')?.touched
              }"
            />
            <p
              *ngIf="
                loginForm.get('email')?.invalid &&
                loginForm.get('email')?.touched
              "
              class="text-red-500 text-xs italic"
            >
              Email/Tên người dùng là bắt buộc.
            </p>
          </div>

          <div class="mb-6">
            <label
              for="password"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Mật khẩu:</label
            >
            <input
              type="password"
              id="password"
              formControlName="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{
                'border-red-500':
                  loginForm.get('password')?.invalid &&
                  loginForm.get('password')?.touched
              }"
            />
            <p
              *ngIf="
                loginForm.get('password')?.invalid &&
                loginForm.get('password')?.touched
              "
              class="text-red-500 text-xs italic"
            >
              Mật khẩu là bắt buộc.
            </p>
          </div>

          <p *ngIf="errorMessage" class="text-red-500 text-sm mb-4">
            {{ errorMessage }}
          </p>

          <div class="flex items-center justify-between">
            <button
              type="submit"
              [disabled]="loginForm.invalid"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Đăng Nhập
            </button>
            <a
              routerLink="/register"
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Bạn chưa có tài khoản? Đăng ký!
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class LoginComponent {
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  errorMessage: string = '';

  onLogin(): void {
    this.errorMessage = '';
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.getRawValue();
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('User logged in successfully!', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.errorMessage =
            error.error?.error?.message ||
            'Login failed. Please check your credentials.';
        },
      });
    } else {
      this.errorMessage = 'Vui lòng điền đầy đủ thông tin.';
    }
  }
}
