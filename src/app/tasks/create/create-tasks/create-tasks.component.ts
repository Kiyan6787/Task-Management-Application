import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskServiceService } from '../../task-service.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../user/auth/auth-service.service';
import { HeaderComponent } from "../../../header/header.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-tasks',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    CommonModule
],
  templateUrl: './create-tasks.component.html',
  styleUrl: './create-tasks.component.css'
})
export class CreateTasksComponent {

  userEmail: string | null = sessionStorage.getItem('userId');

  constructor(private taskService: TaskServiceService, private router: Router, private authService: AuthServiceService){
    console.log(this.userEmail)
  }

  taskForm = new FormGroup({
    taskName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    userId: new FormControl(this.userEmail)
  });

  createTask() {
    const formVals2 = this.taskForm.getRawValue();
    this.taskService.createTask(formVals2).subscribe({
      next: () => {
        this.router.navigate(['tasks/mytasks']);
      },
      error: (err) => {
        console.log(err);
        alert("Failed to create task");
      }
    });
  }
}
