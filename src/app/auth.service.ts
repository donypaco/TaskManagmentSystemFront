import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7280';
  private isAuthenticated: boolean = false;
  private authToken: string | null = null;

  constructor(private http: HttpClient) { }

  register(username: string, password: string, email: string, roleId: number): Observable<any> {
    const requestBody = { username, password, email, roleId };
    console.log(requestBody)
    return this.http.post(`${this.baseUrl}/api/Auth/Register`, requestBody).pipe(
      tap((response: any) => {
        if (response && response.token.result) {
          this.isAuthenticated = true;
          this.setToken(response.token.result);
        }
      })
    );
  }

  logIn(username: string, password: string): Observable<any> {
    debugger
    const requestBody = { username, password };
    return this.http.post(`${this.baseUrl}/api/Auth/Login`, requestBody).pipe(
      tap((response: any) => {
        if (response && response.token.result) {
          this.isAuthenticated = true;
          this.setToken(response.token);
        }
      })
    );
  }
  getRoles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Auth/Roles`);
  }
  logOut() {
    this.clearToken();
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setToken(token: string) {
    this.authToken = token;
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return this.authToken || localStorage.getItem('authToken');
  }

  clearToken() {
    this.authToken = null;
    localStorage.removeItem('authToken');
  }
  setAuthenticated(bool: boolean) {
    this.isAuthenticated = bool;
  }
  getEmployess(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Auth/Employees`);
  }
}
