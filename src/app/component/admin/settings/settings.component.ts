import { Component, OnInit, Input } from '@angular/core'

import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { MatSnackBar } from '@angular/material/snack-bar'

import { environment } from '../../../../environments/environment'

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  prefs
  pin = environment.pin

  settingsForm: FormGroup

  constructor(
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private idbCrudService: IdbCrudService) { 
    this.settingsForm = this.formBuilder.group({
      name: [''],
      pin: ['']
    })
  }

  ngOnInit(): void {
    this.idbCrudService.readAll('prefs').subscribe(prefs => {
      this.prefs = prefs[0]
      this.settingsForm.patchValue({name: this.prefs.user.name })
      if (this.prefs.pin === undefined) 
        this.settingsForm.patchValue({pin: this.pin })
      else
        this.settingsForm.patchValue({pin: this.prefs.pin })
    })
  }

  save() {
    let obj = Object.assign(this.settingsForm.value)
    this.prefs.user.name = obj.name
    this.prefs.pin = obj.pin
    this.idbCrudService.put('prefs', this.prefs)

    this.snackBar.open("Settings Saved!", '', {
      duration: 3000,
      verticalPosition: 'bottom'
    })
  }

}
