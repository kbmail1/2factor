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
import { JwtService } from '../services/jwt/jwt.service';
import { RestClientService } from '../services/rest-client/rest-client.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    public loginService: LoginService,
    private jwtService: JwtService,
    public restClientService: RestClientService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.url.match(/\/login/) !== null) {
      // response is expected to have jwt token.
      return next.handle(request).pipe(map(event => {
        if (event instanceof HttpResponse) {
          if (event.body.token !== null) {
            this.jwtService.saveToken(event.body.token)
          }
        }
        return event
      }))
    } else {

      const token = this.jwtService.getToken()
      if (!token) {
        return next.handle(request)
      }

      const authRequest = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${token}`),
      })
      return next.handle(authRequest)
    }
  }
}
