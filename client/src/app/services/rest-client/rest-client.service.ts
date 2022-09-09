import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { SessionService } from '../../shared/session.service'

const endpoint = 'http://localhost:4201/'

@Injectable({
  providedIn: 'root'
})
export class RestClientService {
static LOGIN = 'api/v1/login'
static HELLO = 'api/v1/hello'
static REGISTER = 'api/v1/register'

  constructor(
    private http: HttpClient,
    public sessionService: SessionService
  ) { }

  hello(): Observable<any> {
    let url = endpoint + RestClientService.HELLO
    console.log('url: ', url)
    return this.http.get(url).pipe(
      map(res => {
        const body = res;
        return body || {};
      }),
      catchError(this.handleError)
    )
  }

  register(credentials: any): Observable<any> {
    let url = endpoint + RestClientService.REGISTER
    const body = {
      'user': credentials['user'],
      'password': credentials['password']
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      // 'Authorization': 'Basic ' + btoa(credentials['user'] + ':' + credentials['password'])
    })
    let options = { headers: headers }

    // let queryParams = new HttpParams().set('user', credentials['user']).set('password', credentials['password'])
    console.log('restClientService: register: invoking post.')
    return this.http
      .post(url, body, options)
      .pipe(
        shareReplay(),
        map(res => {
          const body = res;
          console.log('body:', body)
          return body || {};
        }),
        catchError(this.handleError)
      )
  }


  basicAuth(credentials: any): Observable<any> {
    let url = endpoint + RestClientService.LOGIN
    const body = {
      user: credentials['user'],
      password: credentials['password']
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Max-Age': '86400',
      'Authorization': 'Basic ' + btoa(credentials['user'] + ':' + credentials['password'])
    })
    let options = { headers: headers }

    // let queryParams = new HttpParams().set('user', credentials['user']).set('password', credentials['password'])
    console.log('restClientService: login: invoking post.')
    return this.http
      .post(url, body, options)
      .pipe(
        shareReplay(),
        map(res => {
          const body = res;
          console.log('body:', body)
          return body || {};
        }),
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(() => {
      'Something bad happened; please try again later.';
    })
  }
}
