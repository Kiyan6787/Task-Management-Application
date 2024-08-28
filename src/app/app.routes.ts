import { Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './user/auth/login/login.component';
import { RegisterComponent } from './user/auth/register/register.component';
import { HomePageComponent } from './home-page/home-page.component';
import { TaskListComponent } from './tasks/list/task-list/task-list.component';
import { CreateTasksComponent } from './tasks/create/create-tasks/create-tasks.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EditComponent } from './tasks/edit/edit.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { authGuard } from './user/auth/auth-guard.service';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { AdminComponent } from './admin/admin.component';
import { roleGuardGuard } from './guards/role-guard.guard';
import { EditUserComponent } from './admin/edit-user/edit-user.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent},
    {path:'tasks', children: [
        {path:'mytasks', component: TaskListComponent, canActivate: [authGuard]},
        {path:'create', component: CreateTasksComponent, canActivate: [authGuard]},
        {path:'edit/:id', component: EditComponent, canActivate: [authGuard]},
        {path:'view/:id', component: ViewTaskComponent, canActivate: [authGuard]}
    ]},
    {path: 'myProfile/:id', component: UserProfileComponent, canActivate: [authGuard]},
    {path: 'access-denied', component: AccessDeniedComponent},
    {path: 'admin', canActivate: [roleGuardGuard], children: [
        {path: 'dashboard', component: AdminComponent},
        {path:'edit-user/:id', component: EditUserComponent}
    ]},
    {path:'**', component: NotFoundComponent},
];
