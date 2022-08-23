import { Injectable } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusMessageService {

  constructor() { }

  private _statusMessageSubject = new BehaviorSubject<string|null>('')
  readonly statusMessage$ = this._statusMessageSubject.asObservable();

  setStatusMessage (err: string|null) {
    this._statusMessageSubject.next(err)
  }
}
