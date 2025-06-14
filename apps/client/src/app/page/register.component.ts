import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">
          Đăng Ký Tài Khoản
        </h2>

        <form [formGroup]="registerForm" (ngSubmit)="submitRegister($event)">
          <div class="mb-4">
            <label
              for="username"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Tên người dùng:</label
            >
            <input
              type="text"
              id="username"
              formControlName="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{
                'border-red-500':
                  registerForm.get('username')?.invalid &&
                  registerForm.get('username')?.touched
              }"
            />
            <p
              *ngIf="
                registerForm.get('username')?.invalid &&
                registerForm.get('username')?.touched
              "
              class="text-red-500 text-xs italic"
            >
              Tên người dùng là bắt buộc.
            </p>
          </div>

          <div class="mb-4">
            <label
              for="email"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Email:</label
            >
            <input
              type="email"
              id="email"
              formControlName="email"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              [ngClass]="{
                'border-red-500':
                  registerForm.get('email')?.invalid &&
                  registerForm.get('email')?.touched
              }"
            />
            <p
              *ngIf="
                registerForm.get('email')?.hasError('required') &&
                registerForm.get('email')?.touched
              "
              class="text-red-500 text-xs italic"
            >
              Email là bắt buộc.
            </p>
            <p
              *ngIf="
                registerForm.get('email')?.hasError('email') &&
                registerForm.get('email')?.touched
              "
              class="text-red-500 text-xs italic"
            >
              Email không hợp lệ.
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
                  registerForm.get('password')?.invalid &&
                  registerForm.get('password')?.touched
              }"
            />
            <p
              *ngIf="
                registerForm.get('password')?.hasError('required') &&
                registerForm.get('password')?.touched
              "
              class="text-red-500 text-xs italic"
            >
              Mật khẩu là bắt buộc.
            </p>
            <p
              *ngIf="
                registerForm.get('password')?.hasError('minlength') &&
                registerForm.get('password')?.touched
              "
              class="text-red-500 text-xs italic"
            >
              Mật khẩu phải có ít nhất 6 ký tự.
            </p>
          </div>

          <p *ngIf="errorMessage" class="text-red-500 text-sm mb-4">
            {{ errorMessage() }}
          </p>

          <div class="flex items-center justify-between">
            <button
              type="submit"
              [disabled]="registerForm.invalid"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Đăng Ký
            </button>
            <a
              routerLink="/login"
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Bạn đã có tài khoản? Đăng nhập!
            </a>
          </div>
        </form>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  router = inject(Router);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  errorMessage = signal('');
  registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this.fb.nonNullable.control('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  submitRegister(event: SubmitEvent): void {
    event.preventDefault();

    this.errorMessage.set('');
    if (this.registerForm.valid) {
      const { username, email, password } = this.registerForm.getRawValue();
      this.authService.register(username, email, password).subscribe({
        next: (response) => {
          console.log('User registered and logged in successfully!', response);
          this.router.navigate(['/']);
        },
        error: (error) => {
          console.error('Registration failed:', error);
          this.errorMessage =
            error.error?.error?.message ||
            'Registration failed. Please try again.';
        },
      });
    } else {
      this.errorMessage.set('Vui lòng điền đầy đủ và đúng thông tin.');
    }
  }
}
