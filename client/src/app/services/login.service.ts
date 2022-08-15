import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class LoginService {

  isLoginSubject = new BehaviorSubject<boolean>(false);

  constructor() { }

  ngOnInit() { }

  ngOnDestroy() {
    //Close the Observable stream
    this.isLoginSubject.unsubscribe();
  }

  isLoggedIn(): Observable<boolean>{
    return this.isLoginSubject.asObservable();
  }
  login() {
    // successful login
    this.isLoginSubject.next(true)
  }

  logout() {
    this.isLoginSubject.next(false)
  }

}
