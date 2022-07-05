import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  popSnackbar(message) {
    let msg = "Whoa, something went wrong"
    msg = message
    this.snackBar.open(msg, "Heads Up!", {duration: 3000})
  }
  
}

