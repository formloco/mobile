import { Injectable } from '@angular/core'

import { BehaviorSubject } from 'rxjs'

import { AppState, Form, FORM_EMPTY } from "../model/state"
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class StateService {

  form = FORM_EMPTY
  tenant = environment.tenant

  private readonly _state = new BehaviorSubject<AppState[]>([])

  // observable state readonly
  readonly state$ = this._state.asObservable()

  constructor() { }

  // Get last value synchronously
  private setAppState(appState: AppState[]): void {
    return this._state.next(appState)
  }

  getStates(): AppState[] {
    return this._state.getValue()
  }

  setState(state: AppState): void {
    const states = [...this.getStates()]
    states.pop()
    states.push(state)
    this.setAppState(states)
  }

  removeAppState(state: AppState): void {
    const states = this.getStates().filter(s => s.page !== state.page)
    this.setAppState(states)
  }
  
}
