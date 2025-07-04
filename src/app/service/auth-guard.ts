import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Route, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./auth-service.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor (private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    //if (this.authService.getCurrentUser()) {
      return true;
    // } else {
    //   this.router.navigate(['/login'])
    //    return false;
    // }
  }
}
