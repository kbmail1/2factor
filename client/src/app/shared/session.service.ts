import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface SessionState {
  user: string | null;
  token: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public STATE_KEY = 'state'

  private _stateSubject = new BehaviorSubject<object | null>(null);
  readonly state$ = this._stateSubject.asObservable();

  constructor() { }

  public getState(): SessionState | null {
    const existingState = window.sessionStorage.getItem(this.STATE_KEY)
    return existingState ? JSON.parse(existingState) : null
  }

  clearState(): void {
    window.sessionStorage.clear();
    this._stateSubject.next(null)
  }

  public updateState(state: any): void {


    const existingState = window.sessionStorage.getItem(this.STATE_KEY)
    let updatedState: any = null

    console.log(`updateState: arg: ${JSON.stringify(state)}`)
    if (existingState) {
      updatedState = { ...JSON.parse(existingState), ...state }
    } else {
      updatedState = { ...state }
    }
    window.sessionStorage.setItem(this.STATE_KEY, JSON.stringify(updatedState))
    this._stateSubject.next(state)
    console.log(`updateState: new state: ${existingState}`);

  }
}
