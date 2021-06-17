import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core'

import { FormControl, Validators } from '@angular/forms'

import { BehaviorSubject } from 'rxjs'

import { BarcodeFormat, MultiFormatReader } from '@zxing/library'

import { AppService } from "../../../service/app.service"

import { IdbCrudService } from "../../../service-idb/idb-crud.service"
// import { ZXingScannerComponent } from '@zxing/ngx-scanner'
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scanner-qrcode-run',
  templateUrl: './scanner-qrcode-run.component.html',
  styleUrls: ['./scanner-qrcode-run.component.scss']
})
export class ScannerQrcodeRunComponent implements OnInit {

  @Input() index
  @Input() runForm

  loggedIn
  availableDevices: MediaDeviceInfo[]
  deviceCurrent: MediaDeviceInfo
  deviceSelected: string

  formatsEnabled: BarcodeFormat[] = [
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.UPC_EAN_EXTENSION,
    BarcodeFormat.CODE_128,
    BarcodeFormat.CODE_39
  ]

  hasDevices: boolean
  hasPermission: boolean

  qrResultString: string
  idbData
  tableData
  torchEnabled = false
  torchAvailable$ = new BehaviorSubject<boolean>(false)
  tryHarder = false

  isEnabled = false

  // @ViewChild(ZXingScannerComponent) scanner: ZXingScannerComponent
  constructor(public appService: AppService, public idb: IdbCrudService) { }

  ngOnInit(): void {
    // this.isEnabled = tsrue
    // this.runForm.addControl(this.builderService.detailArray[this.index].formControlName, new FormControl(''))
  }

  scan() {
    this.isEnabled = true
  }

  stop() {
    this.isEnabled = false
    // this.scanner.reset()
  }

  onTorchCompatible(isCompatible: boolean): void {
    this.torchAvailable$.next(isCompatible || false)
  }

  onHasPermission(has: boolean) {
    this.hasPermission = has
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString
    this.isEnabled = false
    //this.runForm.patchValue({'BarCodeScanner0': this.qrResultString})
    this.idb.put('data', { 'BarCodeScanner0': this.qrResultString })
    // this.scanner.reset()
  }

  onCamerasFound(devices: MediaDeviceInfo[]): void {
    this.availableDevices = devices
    this.isEnabled = true
    this.hasDevices = Boolean(devices && devices.length)
  }

}
