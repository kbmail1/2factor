import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StatusMessageService } from '../statusMessage/statusMessage.service';
import { RestClientService } from '../rest-client/rest-client.service';
import { SessionStoreService } from '../../shared/session-store.service'

@Injectable({ providedIn: 'root' })
export class LoginService implements OnInit, OnDestroy {

  private _isLoginSubject = new BehaviorSubject<boolean>(false);
  readonly loginStatus$ = this._isLoginSubject.asObservable();

  private statusMessageSubscription: Subscription
  private statusMessage: string | null = null

  constructor(
    public restClientService: RestClientService,
    public statusMessageService: StatusMessageService,
    public sessionStoreService: SessionStoreService,
  ) {
    this.statusMessageSubscription = this.statusMessageService.statusMessage$
      .subscribe((msg) => {
        this.statusMessage = msg;
      })
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.statusMessageSubscription.unsubscribe();
  }

  register(userId: string, password: string): void {

    this.restClientService.register({ userId, password }).subscribe(
      {
        next: (data) => {
          console.log('login.service: registration: received from ReST: ', JSON.stringify(data))

          if (data.error && data.error !== null) {
            console.log('login.service: registration failed')
            // registration failed.  But the existing logged in user stays as is.
            // this._isLoginSubject.next(false)
            this.statusMessageService.setStatusMessage(`401: registration failed : ${userId}`)
          } else {
            console.log('login.service: registration successful')
            this.sessionStoreService.saveToken(data.token)
            this.sessionStoreService.saveUser(userId)
            // This is registration - not login.
            // this._isLoginSubject.next(true)
            this.statusMessageService.setStatusMessage(`registration succeeded: ${userId}`)
          }
        },
        error: (e) => {
          this._isLoginSubject.next(false)
          this.statusMessageService.setStatusMessage(`500: registration failed: ${userId}`)
        }
      })
  }

  login(userId: string, password: string): void {

    this.restClientService.login({ userId, password }).subscribe(
      {
        next: (data) => {
          console.log('login.service: login: received from ReST: ', JSON.stringify(data))

          if (data.error && data.error !== null) {
            console.log('login.service: login failed')
            this._isLoginSubject.next(false)
            this.statusMessageService.setStatusMessage(`401: login failed : ${userId}`)
          } else {
            console.log('login.service: login successful')
            this.sessionStoreService.saveToken(data.accessToken)
            this.sessionStoreService.saveUser(userId)
            // TODO confirm!
            // window.location.reload()
            this._isLoginSubject.next(true)
            this.statusMessageService.setStatusMessage(`log succeeded: ${userId}`)
          }
        },
        error: (e) => {
          this._isLoginSubject.next(false)
          this.statusMessageService.setStatusMessage(`500: login failed: ${userId}`)
        }
      })
  }

  logout() {
    console.log('successful logout')
    this._isLoginSubject.next(false)
    this.statusMessageService.setStatusMessage(null)
    this.sessionStoreService.signOut()
  }
}
