import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) { }

   getUserTasks(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?userId=${id}`);
  }

  createTask(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data).pipe(
      switchMap(() => this.logActivity('Task created'))
    );
  }

  deleteTask(id: any): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(
      switchMap(() => this.logActivity('Task deleted'))
    );
  }

  updateTask(data: any, id: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, data).pipe(
      switchMap(() => this.logActivity('Task update'))
    );
  }

  getTask(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  logActivity(activity: string) {
    const data = {activity}
    return this.http.post(`http://localhost:3000/activities`,data);
  }

  sortTasks(id: string, sort: string, order: 'asc' | 'desc'): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?userId=${id}&_sort=${sort}&_order=${order}`)
  }
}
