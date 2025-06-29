// src/app/layout/header/header.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { Observable } from 'rxjs'; // Import Observable
import { AuthService } from '../services/auth.service';
import { CategoryService } from '../services/category.service';
import { MenuSvgComponent, XSvgComponent } from '../svg';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, MenuSvgComponent, XSvgComponent],
  template: `
    <header class="bg-gray-800 text-white shadow-md sticky top-0 z-50">
      <nav
        class="container mx-auto px-4 py-3 flex justify-between items-center"
      >
        <a
          routerLink="/"
          class="text-2xl font-bold text-white hover:text-gray-300 transition duration-200"
        >
          My E-commerce
        </a>

        <div class="md:hidden">
          <button
            (click)="toggleMobileMenu()"
            class="text-white focus:outline-none"
          >
            @if (!isMobileMenuOpen) {
              <app-menu-svg></app-menu-svg>
            } @else {
              <app-x-svg></app-x-svg>
            }
          </button>
        </div>

        <div class="hidden md:flex items-center space-x-6">
          <a
            routerLink="/"
            class="text-white hover:text-gray-300 transition duration-200"
            >Trang Chủ</a
          >

          <div class="relative group">
            <button
              class="text-white hover:text-gray-300 transition duration-200 focus:outline-none"
            >
              Danh Mục
            </button>
            <div
              class="absolute hidden group-hover:block bg-gray-700 text-white rounded-md shadow-lg py-2 mt-2 w-48 z-10"
            >
              <a
                *ngFor="let category of categories$ | async"
                [routerLink]="['/categories', category.slug]"
                (click)="closeMobileMenu()"
                class="block px-4 py-2 hover:bg-gray-600"
              >
                {{ category.name }}
              </a>
              <a
                *ngIf="(categories$ | async)?.length === 0"
                class="block px-4 py-2 text-gray-400"
                >Không có danh mục</a
              >
            </div>
          </div>

          <ng-container *ngIf="(isAuthenticated$ | async) === false">
            <a
              routerLink="/login"
              class="text-white hover:text-gray-300 transition duration-200"
              >Đăng Nhập</a
            >
            <a
              routerLink="/register"
              class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200"
              >Đăng Ký</a
            >
          </ng-container>

          <ng-container *ngIf="(isAuthenticated$ | async) === true">
            <span class="text-white"
              >Xin chào, {{ (currentUser$ | async)?.username }}!</span
            >
            <button
              (click)="onLogout()"
              class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-200"
            >
              Đăng Xuất
            </button>
          </ng-container>
        </div>
      </nav>

      <div *ngIf="isMobileMenuOpen" class="md:hidden bg-gray-700 py-2 pb-4">
        <div class="flex flex-col items-center space-y-3">
          <a
            routerLink="/"
            (click)="closeMobileMenu()"
            class="text-white hover:text-gray-300 transition duration-200 block w-full text-center py-2"
            >Trang Chủ</a
          >
          <a
            routerLink="/products"
            (click)="closeMobileMenu()"
            class="text-white hover:text-gray-300 transition duration-200 block w-full text-center py-2"
            >Sản Phẩm</a
          >

          <div class="w-full text-center">
            <button
              (click)="toggleCategoryDropdown()"
              class="text-white hover:text-gray-300 transition duration-200 focus:outline-none block w-full py-2"
            >
              Danh Mục
            </button>
            <div *ngIf="isMobileCategoryDropdownOpen" class="bg-gray-600 py-1">
              <a
                *ngFor="let category of categories$ | async"
                [routerLink]="['/categories', category.slug]"
                (click)="closeMobileMenu()"
                class="block px-4 py-2 hover:bg-gray-500 text-sm"
              >
                {{ category.name }}
              </a>
              <a
                *ngIf="(categories$ | async)?.length === 0"
                class="block px-4 py-2 text-gray-400 text-sm"
                >Không có danh mục</a
              >
            </div>
          </div>

          <a
            routerLink="/blog"
            (click)="closeMobileMenu()"
            class="text-white hover:text-gray-300 transition duration-200 block w-full text-center py-2"
            >Blog</a
          >

          <ng-container *ngIf="(isAuthenticated$ | async) === false">
            <a
              routerLink="/login"
              (click)="closeMobileMenu()"
              class="text-white hover:text-gray-300 transition duration-200 block w-full text-center py-2"
              >Đăng Nhập</a
            >
            <a
              routerLink="/register"
              (click)="closeMobileMenu()"
              class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-200 block w-fit mx-auto"
              >Đăng Ký</a
            >
          </ng-container>

          <ng-container *ngIf="(isAuthenticated$ | async) === true">
            <span class="text-white py-2 block w-full text-center"
              >Xin chào, {{ (currentUser$ | async)?.username }}!</span
            >
            <button
              (click)="onLogout()"
              class="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition duration-200 block w-fit mx-auto"
            >
              Đăng Xuất
            </button>
          </ng-container>
        </div>
      </div>
    </header>
  `,
})
export class HeaderComponent implements OnInit {
  public authService = inject(AuthService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  isAuthenticated$ = this.authService.isAuthenticated$;
  currentUser$ = this.authService.currentUser$;
  categories$ = this.categoryService.getCategories();
  isMobileMenuOpen = false;
  isMobileCategoryDropdownOpen = false;

  ngOnInit(): void {}

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    this.closeMobileMenu();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) {
      this.isMobileCategoryDropdownOpen = false;
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    this.isMobileCategoryDropdownOpen = false;
  }

  toggleCategoryDropdown(): void {
    this.isMobileCategoryDropdownOpen = !this.isMobileCategoryDropdownOpen;
  }
}
