import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from '../user/auth/auth-service.service';
import { inject } from '@angular/core';

export const roleGuardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthServiceService);
  const router = inject(Router);
  const role = "admin";

  const userRole = authService.GetUserRole();
  if (userRole === role) {
    return true;
  } else {
    router.navigate(['access-denied']);
    return false;
  }
};
