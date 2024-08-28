import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  apiUrl = "http://localhost:3000/users"

  getUser(id: any): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?id=${id}`);
  }

  updateUser(code: any, data: any) {
    return this.http.patch(this.apiUrl + '/' + code, data);
  }

  deleteUser(id: any): Observable<any> {
    return this.http.delete(`http://localhost:3000/users/${id}`)
  }
}
