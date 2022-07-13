import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  popSnackbar(message) {
    let msg = typeof message === 'string' ? message : "Whoa, something went wrong"
        
    this.snackBar.open(msg, "Heads Up!", {duration: 3000})
  }
  
}
