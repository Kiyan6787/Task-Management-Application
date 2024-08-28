import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskServiceService } from '../../task-service.service';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { catchError, of } from 'rxjs';
import { HeaderComponent } from "../../../header/header.component";
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterModule,
    HeaderComponent,
    MatPaginatorModule
],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TaskListComponent {

  taskArray : any[] = [];
  tasks: any[] = [];
  pageSize = 5;
  currentPage = 0;
  totalTasks = 0;
  userId = sessionStorage.getItem('userId');

  constructor(private taskService: TaskServiceService, private router: Router){
  }

  ngOnInit(){
    this.getTasks();
  }

  navigateToCreate(){
    this.router.navigate(['tasks/create']);
  }

  getTasks() {
    const id:string = sessionStorage.getItem('userId')!;
    this.taskService.getUserTasks(id).pipe(
      catchError(error => {
        console.error('Error fetching tasks:', error);
        return of([]);
      })
    ).subscribe(data => {
      this.taskArray = data;
      this.totalTasks = data.length;
      this.paginateTasks();
    });
  }

  paginateTasks(event?: PageEvent): void {
    const startIndex = this.pageSize * this.currentPage;
    const endIndex = startIndex + this.pageSize;
    this.tasks = this.taskArray.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.paginateTasks();
  }

deleteTask(id: any) {
  if (confirm('Are you sure you want to delete this task?')) {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        alert('Task deleted successfully');
        this.getTasks();
      },
      error: (err) => {
        console.warn('Error deleting task: ', err);
      }
    });
  }
}


sort(sort: string, order: 'asc' | 'desc') {
  if (this.userId) {
    this.taskService.sortTasks(this.userId,sort,order).subscribe((data: any[]) => {
      this.taskArray = data;
      this.paginateTasks();
    })
  }
}

sortPriorityDesc() {
  const priorityOrder: any = {
    'High': 1,
    'Medium': 2,
    'Low': 3
  };

  this.taskArray.sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  this.paginateTasks();
}

sortPriorityAsc() {
  const priorityOrder: any = {
    'High': 3,
    'Medium': 2,
    'Low': 1
  };

  this.taskArray.sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  this.paginateTasks();
}

}
