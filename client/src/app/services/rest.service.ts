import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const endpoint = 'http://localhost:4201/api/'

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient
  ) { }

  hello(): Observable<any> {
    return this.http.get(endpoint + 'hello').pipe(
      map(res => {
        const body = res;
        return body || { };
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
