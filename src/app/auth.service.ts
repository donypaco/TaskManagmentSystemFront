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

  register(username: string, password: string, email: string): Observable<any> {
    const requestBody = { username, password, email};
    return this.http.post(`${this.baseUrl}/api/Auth/Register`, requestBody).pipe(
      tap((response: any) => {
        this.isAuthenticated = true; 
        this.setToken(response.token);
      })
    );
    }

  logIn(username: string, password: string): Observable<any> {
    const requestBody = { username, password };
    return this.http.post(`${this.baseUrl}/api/Auth/Login`, requestBody).pipe(
      tap((response: any) => {
        if (response && response.token) {
          this.isAuthenticated = true;
          this.setToken(response.token);
        }
        })
    );
  }

  logOut(){
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
  setAuthenticated(bool:boolean ){
    this.isAuthenticated = bool;
  }
}
