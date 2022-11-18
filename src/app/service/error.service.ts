import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private snackBar: MatSnackBar) { }

  popSnackbar(message) {
    this.snackBar.open(message, "Heads Up!", {duration: 3000})
  }

  popInterceeptorSnackbar() {        
    this.snackBar.open("Whoa, something went wrong", "Heads Up!", {duration: 3000})
  }
  
}
