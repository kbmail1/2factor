import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { map, pipe, Observable } from 'rxjs';
import { LoginService } from '../services/login/login.service';
import { from, lastValueFrom } from 'rxjs';
import { SessionService } from '../shared/session.service'
import { RestClientService } from '../services/rest-client/rest-client.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public loginService: LoginService,
    private sessionService: SessionService,
    public restClientService: RestClientService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    // login request: no token yet.  get token from response and store it in session storage
    //  .. to use in subsequent requests
    if (request.url.match(/\/login/) !== null) {
      // check response for jwt token.
      return next.handle(request).pipe(map(event => {
        if (event instanceof HttpResponse) {
          if (event.body.token !== null) {
            this.sessionService.updateState({ token: event.body.token })
          }
        }
        return event
      }))
    } else {
      const sessionState = this.sessionService.getState()
      // token not found. just move on to next interceptor
      if (!sessionState || !sessionState.token) {
        return next.handle(request)
      }

      // token found. add it to request header
      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${sessionState.token}`),
      })
      return next.handle(authRequest)
    }
  }
}
