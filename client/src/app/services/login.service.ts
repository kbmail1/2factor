import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import { RestService } from './rest.service';

@Injectable({providedIn: 'root'})
export class LoginService {

  private _isLoginSubject = new BehaviorSubject<boolean>(false);
  readonly loginStatus$ = this._isLoginSubject.asObservable();

  constructor(
    public restService: RestService,
    public router: Router,
  ) { }

  ngOnInit() { }

  ngOnDestroy() {}

  login(userId: string, password: string): void {

    this.restService.login({ userId, password }).subscribe((data) => {
      console.log('login.component: received from ReST: ', JSON.stringify(data))
      console.log('LOGIN: Decide true or false')
      this._isLoginSubject.next(true)
    })
  }

  logout() {
    console.log('successful logout')
    this._isLoginSubject.next(false)
  }

}
