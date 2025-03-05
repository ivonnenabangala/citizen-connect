// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://51.20.7.110';  // Replace with your API URL
  private tokenKey = 'auth_token';
  
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserFromToken();
  }

  private loadUserFromToken(): void {
    const token = this.getToken();
    if (token) {
      try {
        // Simple approach to extract payload from JWT
        const payload = JSON.parse(atob(token.split('.')[1]));
        const user = {
          id: payload.id,
          email: payload.email,
          role: payload.role
        };
        
        // Check if token is expired
        const isExpired = payload.exp * 1000 < Date.now();
        
        if (isExpired) {
          this.logout();
        } else {
          this.currentUserSubject.next(user);
        }
      } catch (e) {
        this.logout();
      }
    }
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, { email, password })
      .pipe(
        tap(response => {
          // Store the token in localStorage
          localStorage.setItem(this.tokenKey, response.token);
          
          // Extract user info from token
          try {
            const payload = JSON.parse(atob(response.token.split('.')[1]));
            const user = {
              id: payload.id,
              email: payload.email,
              role: payload.role
            };
            this.currentUserSubject.next(user);
          } catch (e) {
            console.error('Error parsing token:', e);
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.currentUserSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    
    try {
      // Extract expiration from token
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch (e) {
      return false;
    }
  }

  getUserData(): any {
    const token = this.getToken();
    if (!token) return null;
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        email: payload.email,
        role: payload.role
      };
    } catch (e) {
      return null;
    }
  }

  getUserRole(): string | null {
    const userData = this.getUserData();
    return userData ? userData.role : null;
  }
}