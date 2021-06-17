import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Observable, from } from 'rxjs';

import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class IdbPersistenceService {

  private idb;
  idbName = environment.idbName

  async connect(): Promise<void> {
    this.idb = await openDB(this.idbName, 1, {
      upgrade(db) {
        db.createObjectStore('prefs', { keyPath: 'id', autoIncrement: false })
        db.createObjectStore('form', { keyPath: 'id', autoIncrement: true })
      }
    });
  }

  read(storeName: string, key): Observable<any> {
    return from(this.idb.get(storeName, key));
  }

  readAll(storeName: string): Observable<any> {
    return from(this.idb.getAll(storeName));
  }

  add(storeName: string, item: any): Observable<any> {
    return from(this.idb.add(storeName, item));
  }
  
  // update, create for auto-increment store
  put(storeName: string, item: any): Observable<any> {
    return from(this.idb.put(storeName, item));
  }

  delete(storeName: string, key: any): Observable<any> {
    return from(this.idb.delete(storeName, key));
  }

  clear(storeName: string): Observable<any> {
    return from(this.idb.clear(storeName));
  }

}

