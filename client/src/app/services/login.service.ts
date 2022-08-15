import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {

  private _isLoginSubject = new BehaviorSubject<boolean>(false);
  readonly loginStatus$ = this._isLoginSubject.asObservable();

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    //Close the Observable stream
    return this._isLoginSubject.unsubscribe()
  }

  login() {
    // successful login
    console.log('successful login')
    this._isLoginSubject.next(true)

  }

  logout() {
    console.log('successful logout')
    this._isLoginSubject.next(false)
  }

}
