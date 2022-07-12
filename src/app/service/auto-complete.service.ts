import { Injectable } from '@angular/core'

import { Observable } from 'rxjs'
import { map, startWith } from 'rxjs/operators'
import { FormControl } from "@angular/forms"

import { Store } from '@ngxs/store'

import { AuthState } from '../state/auth/auth.state'

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  lookupLists
  workers: string[] = []
  supervisors: string[] = []
  makes: string[] = []
  models: string[] = []
  clients: string[] = []

  public filteredSupervisors$: Observable<any[]>
  private _filterSupervisors(value: any): any[] {
    const filterValue = value?.toLowerCase()
    return this.supervisors.filter(supervisor => supervisor["name"]?.toLowerCase().includes(filterValue))
  }

  public filteredWorkers$: Observable<any[]>
  private _filterWorkers(value: any): any[] {
    const filterValue = value?.toLowerCase()
    return this.workers.filter(worker => worker["name"]?.toLowerCase().includes(filterValue))
  }

  public filteredMakes$: Observable<any[]>
  private _filterMakes(value: any): any[] {
    const filterValue = value?.toLowerCase()
    return this.makes.filter(m => m.toLowerCase().includes(filterValue))
  }

  public filteredModels$: Observable<any[]>
  private _filterModels(value: any): any[] {
    const filterValue = value?.toLowerCase()
    return this.models.filter(m => m.toLowerCase().includes(filterValue))
  }

  public filteredClients$: Observable<any[]>
  private _filterClients(value: any): any[] {
    const filterValue = value?.toLowerCase()
    return this.clients.filter(c => c.toLowerCase().includes(filterValue))
  }

  // form controls for lists
  public workersControl = new FormControl(null)
  public supervisorsControl = new FormControl(null)
  public makesControl = new FormControl(null)
  public modelsControl = new FormControl(null)
  public clientsControl = new FormControl(null)
  // public personResonsibleCorrectiveActionControl = new FormControl(null)

  constructor(private store: Store) { 
    this.workers = this.store.selectSnapshot(AuthState.workers)
    this.filteredWorkers$ = this.workersControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterWorkers(value))
    )
    this.supervisors = this.store.selectSnapshot(AuthState.supervisors)
    this.filteredSupervisors$ = this.supervisorsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterSupervisors(value))
    )
    this.lookupLists = this.store.selectSnapshot(AuthState.lookupListData)
    this.makes = this.lookupLists.filter(d => { return d.name == "makes" })[0]["rows"].map(d => { return d.data })
    this.filteredMakes$ = this.makesControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterMakes(value))
    )
    this.models = this.lookupLists.filter(d => { return d.name == "models" })[0]["rows"].map(d => { return d.data })
    this.filteredModels$ = this.modelsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterModels(value))
    )
    this.clients = this.lookupLists.filter(d => { return d.name == "clients" })[0]["rows"].map(d => { return d.data })
    this.filteredClients$ = this.modelsControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterClients(value))
    )
  }

}
