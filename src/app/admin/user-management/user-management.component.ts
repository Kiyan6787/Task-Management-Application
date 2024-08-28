import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { RouterModule, RouterLink } from '@angular/router';
import { catchError, of } from 'rxjs';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterLink,
    MatPaginatorModule
  ],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent {

  toast = inject(ToastrService);
  service = inject(AdminService);

  userArray : any[] = [];
  paginatedUsers: any[] = [];
  pageSize = 5;
  currentPage = 0;
  totalUsers = 0;

  constructor(){
    this.getUserList();
   }

  getUserList() {
    this.service.getAllUsers().pipe(
      catchError(error => {
        console.error('Error fetching users: ',error);
        return of([]);
      })
    ).subscribe(data => {
      this.userArray = data;
      this.totalUsers = data.length;
      this.paginateUsers();
    })
  }

  paginateUsers(): void {
    const start = this.pageSize * this.currentPage;
    const end = start + this.pageSize;
    this.paginatedUsers = this.userArray.slice(start,end);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateUsers();
  }
  
  deleteUser(id : any) {
    if (confirm("Are you sure you want delete this user?")) {
      this.service.deleteUser(id).subscribe({
        next : () => {
          this.toast.success("User deleted successfully");
          this.getUserList();
        },
        error : (err) => {
          console.log("Error deleting: ", err)
          this.toast.error("Failed to delete user");
        }
      })
    }
  }
}
