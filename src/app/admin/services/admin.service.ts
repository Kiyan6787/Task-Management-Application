import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/users");
  }

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/tasks");
  }

  getRecentActivity(): Observable<any[]> {
    return this.http.get<any[]>("http://localhost:3000/activities");
  }

  updateuser(id: any, data: any) {
    return this.http.patch(`http://localhost:3000/users/${id}`,data)
  }

  getUser(id: any): Observable<any> {
    return this.http.get<any[]>(`http://localhost:3000/users?id=${id}`)
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }
}
