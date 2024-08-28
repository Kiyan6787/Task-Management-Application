import { Component } from '@angular/core';
import { Router, RouterLink,RouterModule } from '@angular/router';
import { LoginComponent } from '../user/auth/login/login.component';
import { RegisterComponent } from '../user/auth/register/register.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink,
    LoginComponent,
    RegisterComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  constructor(private router: Router) {}

}
