import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from './services/admin.service';
import { catchError, of } from 'rxjs';
import { UserManagementComponent } from "./user-management/user-management.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    UserManagementComponent
],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {

  noOfTasks: number = 0;
  noOfUsers: number = 0;
  activityArray : any[] = [];

  constructor(private service: AdminService) {
    this.getTasks();
    this.getUsers();
    this.getRecentActivity();
  }

  getTasks() {
    this.service.getAllTasks().pipe(
      catchError(error => {
        console.error('Error fetching tasks: ',error);
        return of([]);
      })
    ).subscribe(data => {
      this.noOfTasks = data.length;
    })
  }

  getUsers() {
    this.service.getAllUsers().pipe(
      catchError(error => {
        console.error('Error fetching users: ',error);
        return of([]);
      })
    ).subscribe(data => {
      this.noOfUsers = data.length;
    })
  }

  getRecentActivity() {
    this.service.getRecentActivity().pipe(
      catchError(error => {
        console.error('Error fetching recent activity: ',error);
        return of([]);
      })
    ).subscribe(data => {
      this.activityArray = data;
    })
  }
}
