import { Component } from '@angular/core';
import { RouterModule, RouterLink, Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user/user.service';
import { AuthServiceService } from '../user/auth/auth-service.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  userId: string | null = sessionStorage.getItem('userId');

  constructor(private router: Router, private userService: UserService, private authService: AuthServiceService){
    console.log("User ID: ", this.userId)
  }

  naviagteToProfile(){
    this.router.navigate(['myProfile',this.userId]);
  }

  logout(){
    this.authService.logout();
  }

  navigateToTasks() {
    this.router.navigate(['tasks/mytasks'])
  }
}
