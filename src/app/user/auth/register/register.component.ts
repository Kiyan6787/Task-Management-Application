import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  confirmPassword: string = '';
  passwordMatch: boolean = true;
  toast = inject(ToastrService);

  constructor (private authService: AuthServiceService, private router: Router){

  }

  registerForm = new FormGroup({
    firstName: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z]+$')]),
    lastName: new FormControl('',[Validators.required, Validators.pattern('^[A-Za-z]+$')]),
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(5)]),
    role: new FormControl('user')
  });

  register(){
    if (this.registerForm.get('password')?.value !== this.confirmPassword){
      this.passwordMatch = false;
      return;
    }

    const formVals = this.registerForm.getRawValue();

    this.authService.register(formVals).subscribe({
      next: (result: any) => {
        console.log(result);
        this.toast.success("Registration Successful")
        this.router.navigate(['tasks/mytasks'])
      },
      error: (err) => {
        console.error(err);
        this.toast.error("Registration Failed");
      }
    });
  }

  checkPassword(){
    this.passwordMatch = this.registerForm.get('password')?.value === this.confirmPassword;
  }
}
