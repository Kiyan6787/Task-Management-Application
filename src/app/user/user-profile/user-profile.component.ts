import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth/auth-service.service';
import { HeaderComponent } from "../../header/header.component";
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    HeaderComponent,
    ToastrModule,
    CommonModule
],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  userId: string | null = sessionStorage.getItem('userId');
  currentPassword:any = '';

  constructor(private userService: UserService, private toast: ToastrService, private router: Router){
    if (this.userId) {
      this.userService.getUser(this.userId).subscribe((user: any) => {
        this,this.profileForm.patchValue(user[0]);
        this.currentPassword = user[0].password;
      })
    }
  }

  profileForm = new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z]+$')]),
    lastName: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z]+$')]),
    email: new FormControl('',[Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.pattern(/^\d{3}\s?\d{3}\s?\d{4}$/), Validators.maxLength(10), Validators.minLength(10)]),
    address: new FormControl(''),
  });

  changePasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    newPassword: new FormControl('', [Validators.required]),
    confirmNewPassword: new FormControl('', [Validators.required])
  });

  passwordMatch: Boolean = true;

  updateUser() {
    const formVals = this.profileForm.getRawValue();
    this.userService.updateUser(this.userId,formVals).subscribe({
      next: () => {
        this.toast.success("Your information has been updated.");
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Failed to update information!");
      }
    })
  }

  updatePassword() {
    if (this.changePasswordForm.get('newPassword')?.value !== this.changePasswordForm.get('confirmNewPassword')?.value){
      this.passwordMatch = false;
      return;
    }

    const formVals = this.profileForm.getRawValue();
    const newPassword = this.changePasswordForm.get('newPassword')?.value;
    this.userService.updateUser(this.userId,{...formVals, password:newPassword}). subscribe({
      next: () => {
        this.toast.success("Your password has been updated.");
      },
      error: (err) => {
        console.log(err);
        this.toast.error("Failed to update password!");
      }
    })
  }

  checkPassword(){
    this.passwordMatch = this.changePasswordForm.get('newPassword')?.value === this.changePasswordForm.get('confirmNewPassword')?.value;
  }

  deleteUser() {
    if (confirm("Are you sure you want to delete your account?")) {
      this.userService.deleteUser(this.userId).subscribe({
        next : () => {
          this.toast.success("User deleted successfully.");
          this.router.navigate(['homePage']);
        },
        error : (err) => {
          console.log("Error deleting: ", err)
          this.toast.error("Failed to delete user!");
        }
      })
    }
  }

  currentPasswordMatch: Boolean = true;

  checkCurrentPassword() {
    this.currentPasswordMatch = this.changePasswordForm.get('currentPassword')?.value === this.currentPassword;
  }
}
