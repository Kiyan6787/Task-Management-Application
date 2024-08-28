import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {

  private userEmail = new BehaviorSubject<string | null>(null);
  userEmail$ = this.userEmail.asObservable();
  private userId = new BehaviorSubject<string | null>(null);
  userId$ = this.userId.asObservable();
  private token!: string;

  constructor(private http: HttpClient, private router: Router) { }
  apiUrl = "http://localhost:3000/users"

  GetAll() {
    return this.http.get(this.apiUrl);
  }

  GetByCode(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?email=${email}`);
  }

  register(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateUser(code: any, data: any) {
    return this.http.patch(this.apiUrl + '/' + code, data);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('email');
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  GetUserRole() {
    return sessionStorage.getItem('role') != null ? sessionStorage.getItem('role')?.toString():'';
  }

}
