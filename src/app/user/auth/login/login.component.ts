import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { RouterModule,RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule,
    RouterLink,
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errMessage: string = "";

  loginForm = new FormGroup({
    loginEmail: new FormControl('', [Validators.required, Validators.email]),
    loginPassword: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthServiceService, private router: Router){
    sessionStorage.clear();
  }

  login() {
    const email: string = this.loginForm.get('loginEmail')?.value!;
    const password = this.loginForm.get('loginPassword')?.value;

    if (this.loginForm.valid) {
      this.authService.GetByCode(email).subscribe(res => {
        let data = res;
        console.log("User data: ",data);
        const user = res[0];
        if (user.password === password) {
          sessionStorage.setItem('email', user.email);
          sessionStorage.setItem('role', user.role);
          sessionStorage.setItem('userId', user.id);
          if (user.role === 'admin') {
            this.router.navigate(['admin/dashboard']);
          } else {
            this.router.navigate(['tasks/mytasks']);
          }
        } else {
          this.errMessage = "Invalid Email or Password";
        }
      })
    } else {
      console.log('Invalid Form')
    }
  }
}
