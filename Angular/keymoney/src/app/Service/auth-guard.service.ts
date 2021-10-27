import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    var user = this.userService.getU();
    alert( JSON.stringify(user));
    if (this.userService.getU() != null) {
      return true;
    } else {
      this.router.navigateByUrl('/home');
      return false;
    }
  }
}
