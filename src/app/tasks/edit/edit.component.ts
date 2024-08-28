import { Component } from '@angular/core';
import { TaskServiceService } from '../task-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../../user/auth/auth-service.service';
import {ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HeaderComponent } from "../../header/header.component";

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent
],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  userId: string | null = sessionStorage.getItem('userId');
  taskId: string | null = '';

  constructor(private taskService: TaskServiceService, private router: Router, private authService: AuthServiceService, private actRoute: ActivatedRoute){

    this.taskId = this.actRoute.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.taskService.getTask(this.taskId).subscribe((task: any) => {
        this.taskForm.patchValue(task);
      })
    }
  }

  taskForm = new FormGroup({
    taskName: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    dueDate: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    id: new FormControl(this.userId)
  });

  updateTask() {
    const formVals = this.taskForm.getRawValue();
    this.taskService.updateTask(formVals,this.taskId).subscribe({
      next: () => {
        this.router.navigate(['tasks/mytasks']);
      },
      error: (err) => {
        console.log(err);
        alert("Failed to update task");
      }
    })
  }
}
