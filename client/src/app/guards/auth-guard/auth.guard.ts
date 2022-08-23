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
  loginSubscription: Subscription

  constructor(
    public loginService: LoginService,
    private router: Router,
  ) {
    this.loginSubscription = this.loginService.loginStatus$.subscribe((status) => {
      this.loginState = status
      console.log('auth.guard in constructor: status:', status)
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
