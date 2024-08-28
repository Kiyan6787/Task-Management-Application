import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {

  userId: any | null = '';
  currentPassword: any = '';
  passwordMatch: boolean = true;

  constructor (private fb: FormBuilder, private actRoute: ActivatedRoute, private service: AdminService, private router: Router) {
    this.userId = this.actRoute.snapshot.paramMap.get('id');
    console.log(this.userId)
    if (this.userId) {
      this.service.getUser(this.userId).subscribe((user: any) => {
        this,this.profileForm.patchValue(user[0]);
        this.currentPassword = user[0].password;
      })
    }
  }

  profileForm = this.fb.group({
    firstName: this.fb.control('',[Validators.required, Validators.pattern('^[A-Za-z]+$')]),
    lastName: this.fb.control('',[Validators.required, Validators.pattern('^[A-Za-z]+$')]),
    email: this.fb.control('',[Validators.required, Validators.email]),
    phoneNumber: this.fb.control('', [Validators.pattern(/^\d{3}\s?\d{3}\s?\d{4}$/), Validators.maxLength(10), Validators.minLength(10)]),
    address: this.fb.control(''),
  })

  updateUser() {
    const formVals = this.profileForm.getRawValue();
    this.service.updateuser(this.userId,formVals).subscribe({
      next: () => {
        alert('User updated');
      },
      error: (err) => {
        console.error(err);
        alert('Failed to update user');
      }
    })
  }

  deleteUser() {
    this.service.deleteUser(this.userId).subscribe({
      next : () => {
        alert('User deleted');
        this.router.navigate(['admin/dashboard']);
      },
      error : (err) => {
        console.log("Error deleting: ", err)
        alert('Failed to delete');
      }
    })
  }

}
