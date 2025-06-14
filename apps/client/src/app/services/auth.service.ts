import { afterNextRender, inject, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { StorageService } from './storage.service';
import { LOCAL_STORAGE } from '../tokens';

export interface AuthResponse {
  jwt: string;
  user: any;
}

export interface User {
  id: number;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private storageStorage = inject<StorageService>(LOCAL_STORAGE);

  private apiUrl = '/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(
    this.hasToken()
  );
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private userSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.userSubject.asObservable();

  constructor() {
    afterNextRender(() => {
      if (this.hasToken()) {
        this.fetchCurrentUser().subscribe({
          error: () => this.logout(),
        });
      }
    });
  }

  private hasToken(): boolean {
    return !!this.storageStorage.getItem('jwt_token');
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/local/register`, {
        username,
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.saveAuth(response.jwt, response.user);
        })
      );
  }

  login(identifier: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/auth/local`, {
        identifier,
        password,
      })
      .pipe(
        tap((response) => {
          this.saveAuth(response.jwt, response.user);
        })
      );
  }

  logout(): void {
    this.storageStorage.removeItem('jwt_token');
    this.storageStorage.removeItem('user_info');
    this.isAuthenticatedSubject.next(false);
    this.userSubject.next(null);
  }

  private saveAuth(jwt: string, user: User): void {
    this.storageStorage.setItem('jwt_token', jwt);
    this.storageStorage.setItem('user_info', JSON.stringify(user));
    this.isAuthenticatedSubject.next(true);
    this.userSubject.next(user);
  }

  getToken(): string | null {
    return this.storageStorage.getItem('jwt_token');
  }

  fetchCurrentUser(): Observable<User | null> {
    const token = this.getToken();
    if (!token) {
      return of(null);
    }
    return this.http.get<User>(`${this.apiUrl}/users/me`).pipe(
      // AuthInterceptor sẽ thêm token
      tap((user) => {
        this.userSubject.next(user);
        this.storageStorage.setItem('user_info', JSON.stringify(user));
      }),
      catchError((error) => {
        console.error('Failed to fetch current user:', error);
        this.logout();
        return of(null);
      })
    );
  }
}
