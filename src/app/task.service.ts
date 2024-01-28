import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private baseUrl = 'https://localhost:7280';


  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Task/GetTasks`);
  }
  getStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/api/Task/Statuses`);
  }

  deleteTask(taskId: number): Observable<any[]> {
    return this.http.delete<any[]>(`${this.baseUrl}/api/Task/DeleteTask/${taskId}`);
  }
  updateTaskStatus(taskId: number, statusId: number): Observable<any> {
    const requestBody = statusId;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.patch<any>(`${this.baseUrl}/api/Task/UpdateStatus/${taskId}`, requestBody, { headers });
  }

  editTask(taskId: number, title: string, description: string): Observable<any[]> {
    const requestBody = { title, description };
    const url = `${this.baseUrl}/api/Task/UpdateTask/${taskId}`;
    return this.http.put<any>(url, requestBody);
  }
  addTask(task: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/Task/CreateTask`, task);
  }
}
