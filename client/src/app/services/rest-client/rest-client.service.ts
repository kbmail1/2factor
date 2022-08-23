import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay } from 'rxjs/operators';
import { JwtService } from '../jwt/jwt.service';

const endpoint = 'http://localhost:4201/'

@Injectable({
  providedIn: 'root'
})
export class RestClientService {
static LOGIN = 'login'
static HELLO = 'hello'
static REGISTER = 'register'

  constructor(
    private http: HttpClient,
    public jwtService: JwtService
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
      'userId': credentials['userId'],
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
      // 'Authorization': 'Basic ' + btoa(credentials['userId'] + ':' + credentials['password'])
    })
    let options = { headers: headers }

    // let queryParams = new HttpParams().set('userId', credentials['userId']).set('password', credentials['password'])
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


  login(credentials: any): Observable<any> {
    let url = endpoint + RestClientService.LOGIN
    const body = {
      'userId': credentials['userId'],
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
      'Authorization': 'Basic ' + btoa(credentials['userId'] + ':' + credentials['password'])
    })
    let options = { headers: headers }

    // let queryParams = new HttpParams().set('userId', credentials['userId']).set('password', credentials['password'])
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
