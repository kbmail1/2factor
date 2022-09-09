import { SessionService } from 'src/app/shared/session.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../../services/login/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loginState: boolean = false

  constructor(
    public loginService: LoginService,
    private router: Router,
    public sessionService: SessionService
  ) {
    this.sessionService.state$.subscribe((state: any) => {
      if (this.loginService.isItLoginState(state)) {
        this.loginState = true
      } else {
        this.loginState = false;
      }
      console.log('auth.guard in session state subscription: login state:', state)
    })
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    console.log('canActivate: ', this.loginState)
    if (this.loginState) {
      return true
    } else {
      this.router.navigate(['/home'])

    }
    return this.loginState
  }

}
