import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegisterComponent } from "./user/auth/register/register.component";
import { LoginComponent } from "./user/auth/login/login.component";
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from "./home-page/home-page.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RegisterComponent,
    LoginComponent,
    HttpClientModule,
    HomePageComponent,
    HeaderComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Frontend';
}
