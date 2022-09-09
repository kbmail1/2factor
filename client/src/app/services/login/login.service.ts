import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { StatusMessageService } from '../statusMessage/statusMessage.service';
import { RestClientService } from '../rest-client/rest-client.service';
import { SessionService } from '../../shared/session.service'

@Injectable({ providedIn: 'root' })
export class LoginService implements OnInit, OnDestroy {

  /*
   * TODO: login.service does not need status behavior subject right now.
   * once status starts storing more data (other than user and token), login
   * service may need it make login decisions.
   */

  constructor(
    public restClientService: RestClientService,
    public statusMessageService: StatusMessageService,
    public sessionService: SessionService,
  ) { }

  ngOnInit() { }

  ngOnDestroy() { }

  register(user: string, password: string): void {
    this.restClientService.register({ user, password }).subscribe(
      {
        // remember: register success or failure is not a login success or failure
        next: (data) => {
          console.log('login.service: register: received from ReST: ', JSON.stringify(data))

          if (data.error && data.error !== null) {
            console.log('login.service: register failed')
            this.statusMessageService.setStatusMessage(`401: registration failed : ${user}`)
          } else {
            console.log('login.service: register successful')
            this.statusMessageService.setStatusMessage(`register succeeded: ${user}`)
          }
        },
        error: (e) => {
          this.statusMessageService.setStatusMessage(`500: registration failed: ${user}`)
        }
      })
  }

  basicAuth(user: string, password: string): void {

    this.restClientService.basicAuth({ user, password }).subscribe(
      {
        next: (data) => {
          console.log('login.service: login: received from ReST: ', JSON.stringify(data))

          if (data.error && data.error !== null) {
            console.log(`bug: TODO: do this with unit-test -': login.service: login failed `)
            this.sessionService.clearState() // flush all; user/session logged out
            this.statusMessageService.setStatusMessage(`401: login failed : ${user}`)
          } else {
            console.log(`login.service: login successful: data: ${JSON.stringify(data)}`)
            this.sessionService.updateState({ user, token: data})
            // TODO need below line? confirm...
            // window.location.reload()

            this.statusMessageService.setStatusMessage(`log succeeded: ${user}`)
          }
        },
        error: (e) => {
            this.sessionService.clearState() // flush all; user/session logged out
          this.statusMessageService.setStatusMessage(`500: login failed: ${user}`)
        }
      })
  }

  logout() {
    this.sessionService.clearState()
    this.statusMessageService.setStatusMessage(null)
    console.log('successful logout')
  }

  isItLoginState(state: any): boolean {
    if (state && state.hasOwnProperty('user') && state.user && state.hasOwnProperty('token') && state.token) {
      return true
    }
    return false
  }
}
