import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'https://localhost:7280';


  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.baseUrl}/api/Task/GetTasks`,{ headers });
  }
  getStatuses(): Observable<any[]> {    
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${this.baseUrl}/api/Task/Statuses`, { headers });
  }

  deleteTask(taskId: number): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    const url = `${this.baseUrl}/api/Task/DeleteTask/${taskId}`;
    const options = { headers: headers };
    return this.http.delete<any>(url, options)
      .pipe(
        catchError(this.handleError)
      );
  }
  updateTaskStatus(taskId: number, statusId: number): Observable<any> {
    const requestBody = statusId;
    const headers = this.createAuthorizationHeader();
  
    const options = { headers: headers };
  
    return this.http.patch<any>(`${this.baseUrl}/api/Task/UpdateStatus/${taskId}`, requestBody, options)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  editTask(taskId: number, title: string, description: string): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    const requestBody = { title, description };
    const url = `${this.baseUrl}/api/Task/UpdateTask/${taskId}`;
    const options = { headers: headers };
    return this.http.put<any>(url, requestBody, options)
      .pipe(
        catchError(this.handleError)
      );
  }
  
  addTask(task: any): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.post(`${this.baseUrl}/api/Task/CreateTask`, task,{ headers });
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred.';

    if (error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.message}`;
    } else if (error && error.error) {
      errorMessage = error.error;
    }
    return throwError(errorMessage);
  }
  private createAuthorizationHeader(): HttpHeaders {
    const storedTokenString = localStorage.getItem('authToken');
    
    if (storedTokenString) {
      const storedToken = JSON.parse(storedTokenString);
      const token = storedToken ? storedToken["result"] : null;
  
      if (token) {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        return headers;
      }
    }
    console.error('Authentication token not found or invalid in local storage');
    return new HttpHeaders();
  }
    
}
