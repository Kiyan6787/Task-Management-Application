import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { TaskServiceService } from '../task-service.service';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-view-task',
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    HeaderComponent
],
  templateUrl: './view-task.component.html',
  styleUrl: './view-task.component.css'
})
export class ViewTaskComponent {
  taskId: string | null = '';
  taskName = '';
  description = '';
  dueDate = '';
  priority = '';

  constructor(private taskService: TaskServiceService, private router: Router, private actRoute: ActivatedRoute){
    this.taskId = this.actRoute.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe((task: any) => {
        this.taskName = task.taskName,
        this.description = task.description,
        this.dueDate = task.dueDate,
        this.priority = task.priority
      })
    }
  }

  navigateToEdit() {
    this.router.navigate(['/tasks/edit',this.taskId])
  }

  deleteTask() {
    this.taskService.deleteTask(this.taskId).subscribe({
      next : () => {
        alert('Task deleted successfully');
        this.router.navigate(['tasks/mytasks']);
      },
      error : (err) => {
        alert('Failed to delete task')
        console.warn("Error deleting forms: ",err)
      }
    })
  }

  backToList() {
    this.router.navigate(['tasks/mytasks']);
  }
}
