import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStoreService {

  public TOKEN_KEY = 'token'
  public USER_KEY = 'auth_user'

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
  }
  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }
  public saveUser(user: any): void {
    window.sessionStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }
  public getUser(): any {
    const user = window.sessionStorage.getItem(this.USER_KEY);
    if (user) {
      return JSON.parse(user);
    }
    return {};
  }
}
