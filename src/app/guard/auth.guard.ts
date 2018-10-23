import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Authenticate} from '../authentication/authenticate';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: Authenticate, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

}
