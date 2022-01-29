import { Component, OnInit } from '@angular/core'
import * as _moment from 'moment'

import { Observable } from 'rxjs'
import { AppService } from "../../../service/app.service"
import { ApiService } from "../../../service/api.service"
import { EmailService } from "../../../service/email.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { NotificationService } from "../../../service/notification.service"

import { AutoCompleteService } from "../../../service/auto-complete.service"

import { FormBuilder, FormGroup } from "@angular/forms"

import { MatSnackBar } from '@angular/material/snack-bar'

import { VEHICLE_INSPECTION } from './state/vehicle-inspection-state.model'

import { environment } from '../../../../environments/environment'

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'

import { VehicleInspectionState } from './state/vehicle-inspection.state'
import { SetIsHeaderValid } from './state/vehicle-inspection-state.actions'

import { SetPics } from '../../../state/device/device-state.actions'
import { SetPage, SetChildPage } from '../../../state/auth/auth-state.actions'

import { SetNotificationOpen } from '../../../state/notification/notification-state.actions'

@Component({
  selector: 'app-vehicle-inspection',
  templateUrl: './vehicle-inspection.component.html',
  styleUrls: ['./vehicle-inspection.component.scss']
})
export class VehicleInspectionComponent implements OnInit {

  @Select(VehicleInspectionState.isHeaderValid) isHeaderValid$: Observable<boolean>

  pics
  formDataID
  step = 0
  history = []
  lookupLists

  headerForm: FormGroup
  detailForm: FormGroup
  discrepancyForm: FormGroup

  VEHICLE_INSPECTION = VEHICLE_INSPECTION

  isPanelOpen = false

  apiURL = environment.apiUrl
  messageUrl = environment.messageUrl
  tenant_id = environment.tenant.tenant_id

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    public appService: AppService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private idbCrudService: IdbCrudService,
    private notificationService: NotificationService,
    public autoCompleteService: AutoCompleteService) {
    this.headerForm = this.formBuilder.group({
      Date: [],
      Worker: [],
      Supervisor: [],
      Stakeholder: [],
      Division: [],
      Mileage: [],
      Make: [],
      Model: [],
      Year: [],
      RegistrationDate: []
    })
    this.detailForm = this.formBuilder.group({
      IgnitionKey: [],
      IgnitionKeyComments: [],
      OilLevel: [],
      OilLevelComments: [],
      WasherFluidLevel: [],
      WasherFluidLevelComments: [],
      CoolantLevel: [],
      CoolantLevelComments: [],
      PowerSteeringFluidLevel: [],
      PowerSteeringFluidLevelComments: [],
      AirGauge: [],
      AirGaugeComments: [],
      Horn: [],
      HornComments: [],
      HeaterDefroster: [],
      HeaterDefrosterComments: [],
      WindshieldWipersWashers: [],
      WindshieldWipersWashersComments: [],
      AllSignalLights: [],
      AllSignalLightsComments: [],
      InteriorLights: [],
      InteriorLightsComments: [],
      MirrorsDamageAdjustments: [],
      MirrorsDamageAdjustmentsComments: [],
      WindshieldVisibility: [],
      WindshieldVisibilityComments: [],
      VisualInspectionExterior: [],
      VisualInspectionExteriorComments: [],
      InsideEngineCompartment: [],
      InsideEngineCompartmentComments: [],
      TransmissionFluidLevel: [],
      TransmissionFluidLevelComments: [],
      HighlightSignal4wayTailBackup: [],
      HighlightSignal4wayTailBackupComments: [],
      FuelLevel: [],
      FuelLevelComments: [],
      FirstAidKit: [],
      FirstAidKitComments: [],
      FireExtinguisher: [],
      FireExtinguisherComments: [],
      SurvivalKit: [],
      SurvivalKitComments: [],
      FuelKey: [],
      FuelKeyComments: [],
      TwoWayRadio: [],
      TwoWayRadioComments: [],
      Tires: [],
      TiresComments: [],
      SpillKit: [],
      SpillKitComments: []
    })
    this.discrepancyForm = this.formBuilder.group({
      Discrepancy: [null]
    })
  }

  ngOnInit(): void {
    this.store.select(AuthState.formData).subscribe(data => {
      if (data) this.setFormData(data)
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  detailStep() {
    this.appService.currentDetailForm = this.detailForm.value
    this.step++
  }

  nextStep() {
    this.checkValidHeader()
    this.step++
  }

  prevStep() {
    this.step--
  }

  setFormData(data) {
    if (data.header) {
      this.headerForm.controls['Date'].setValue(data.header.Date)
      this.headerForm.controls['Worker'].setValue(data.header.Worker)
      this.headerForm.controls['Supervisor'].setValue(data.header.Supervisor)
      this.headerForm.controls['Stakeholder'].setValue(data.header.Stakeholder)
      this.headerForm.controls['Division'].setValue(data.header.Division)
      this.headerForm.controls['Mileage'].setValue(data.header.Mileage)
      this.headerForm.controls['Make'].setValue(data.header.Make)
      this.headerForm.controls['Model'].setValue(data.header.Model)
      this.headerForm.controls['Year'].setValue(data.header.Year)
      this.headerForm.controls['RegistrationDate'].setValue(data.header.RegistrationDate)
    }

    if (data.detail) {
      this.detailForm.controls['IgnitionKey'].setValue(data.detail.Year)
      this.detailForm.controls['IgnitionKeyComments'].setValue(data.detail.Year)
      this.detailForm.controls['OilLevel'].setValue(data.detail.Year)
      this.detailForm.controls['OilLevelComments'].setValue(data.detail.Year)
      this.detailForm.controls['WasherFluidLevel'].setValue(data.detail.Year)
      this.detailForm.controls['WasherFluidLevelComments'].setValue(data.detail.Year)
      this.detailForm.controls['CoolantLevel'].setValue(data.detail.Year)
      this.detailForm.controls['CoolantLevelComments'].setValue(data.detail.Year)
      this.detailForm.controls['PowerSteeringFluidLevel'].setValue(data.detail.Year)
      this.detailForm.controls['PowerSteeringFluidLevelComments'].setValue(data.detail.Year)
      this.detailForm.controls['AirGauge'].setValue(data.detail.Year)
      this.detailForm.controls['AirGaugeComments'].setValue(data.detail.Year)
      this.detailForm.controls['Horn'].setValue(data.detail.Year)
      this.detailForm.controls['HornComments'].setValue(data.detail.Year)
      this.detailForm.controls['HeaterDefroster'].setValue(data.detail.Year)
      this.detailForm.controls['HeaterDefrosterComments'].setValue(data.detail.Year)
      this.detailForm.controls['WindshieldWipersWashers'].setValue(data.detail.Year)
      this.detailForm.controls['WindshieldWipersWashersComments'].setValue(data.detail.Year)
      this.detailForm.controls['AllSignalLights'].setValue(data.detail.Year)
      this.detailForm.controls['AllSignalLightsComments'].setValue(data.detail.Year)
      this.detailForm.controls['InteriorLights'].setValue(data.detail.Year)
      this.detailForm.controls['InteriorLightsComments'].setValue(data.detail.Year)
      this.detailForm.controls['MirrorsDamageAdjustments'].setValue(data.detail.Year)
      this.detailForm.controls['MirrorsDamageAdjustmentsComments'].setValue(data.detail.Year)
      this.detailForm.controls['WindshieldVisibility'].setValue(data.detail.Year)
      this.detailForm.controls['WindshieldVisibilityComments'].setValue(data.detail.Year)
      this.detailForm.controls['VisualInspectionExterior'].setValue(data.detail.Year)
      this.detailForm.controls['VisualInspectionExteriorComments'].setValue(data.detail.Year)
      this.detailForm.controls['InsideEngineCompartment'].setValue(data.detail.Year)
      this.detailForm.controls['InsideEngineCompartmentComments'].setValue(data.detail.Year)
      this.detailForm.controls['TransmissionFluidLevel'].setValue(data.detail.Year)
      this.detailForm.controls['TransmissionFluidLevelComments'].setValue(data.detail.Year)
      this.detailForm.controls['HighlightSignal4wayTailBackup'].setValue(data.detail.Year)
      this.detailForm.controls['FuelLevel'].setValue(data.detail.Year)
      this.detailForm.controls['FuelLevelComments'].setValue(data.detail.Year)
      this.detailForm.controls['FirstAidKit'].setValue(data.detail.Year)
      this.detailForm.controls['FirstAidKitComments'].setValue(data.detail.Year)
      this.detailForm.controls['FireExtinguisher'].setValue(data.detail.Year)
      this.detailForm.controls['FireExtinguisherComments'].setValue(data.detail.Year)
      this.detailForm.controls['SurvivalKit'].setValue(data.detail.Year)
      this.detailForm.controls['SurvivalKitComments'].setValue(data.detail.Year)
      this.detailForm.controls['FuelKey'].setValue(data.detail.Year)
      this.detailForm.controls['FuelKeyComments'].setValue(data.detail.Year)
      this.detailForm.controls['TwoWayRadio'].setValue(data.detail.Year)
      this.detailForm.controls['TwoWayRadioComments'].setValue(data.detail.Year)
      this.detailForm.controls['Tires'].setValue(data.detail.Year)
      this.detailForm.controls['TiresComments'].setValue(data.detail.Year)
      this.detailForm.controls['SpillKit'].setValue(data.detail.Year)
      this.detailForm.controls['SpillKitComments'].setValue(data.detail.Year)
    }

    if (data.discrepancy) {
      this.discrepancyForm.controls['SpillKitComments'].setValue(data.discrepancy.Discrepancy)
    }

  }
  submitForm() {

    let dataObj = []
    const user = this.store.selectSnapshot(AuthState.user)
    const form = this.store.selectSnapshot(AuthState.selectedForm)
    let userCreated = {
      email: user.email,
      date_created: new Date()
    }

    let header = this.headerForm.value
    header.Make = this.autoCompleteService.makesControl.value
    header.Model = this.autoCompleteService.modelsControl.value
    header.Worker = this.autoCompleteService.workersControl.value
    header.Supervisor = this.autoCompleteService.supervisorsControl.value

    let data = {
      header: header,
      detail: this.detailForm.value,
      discrepancy: this.discrepancyForm.value
    }

    dataObj.push(null)
    dataObj.push(JSON.stringify(userCreated))
    dataObj.push(new Date())
    dataObj.push(new Date())
    dataObj.push(null)
    dataObj.push(JSON.stringify(data))

    this.VEHICLE_INSPECTION["form_id"] = form["form_id"]
    this.VEHICLE_INSPECTION["is_published"] = true
    this.VEHICLE_INSPECTION["is_data"] = true

    let obj = {
      data: dataObj,
      columns: this.VEHICLE_INSPECTION["columns"],
      user: userCreated,
      formObj: this.VEHICLE_INSPECTION,
      type: 'custom',
      name: form["name"],
      pics: JSON.stringify(this.store.selectSnapshot(DeviceState.pics))
    }

    this.apiService.save(obj).subscribe(idObj => {
      this.formDataID = idObj
      const workers: any = this.store.selectSnapshot(AuthState.workers)
      const supervisors: any = this.store.selectSnapshot(AuthState.supervisors)
      let worker = workers.find(worker => worker.name === header.Worker)
      if (!worker) {
        worker["name"] = header.Worker
        worker["email"] = header.Worker.charAt(0) + header.Worker.slice(header.Worker.indexOf(' ') + 1) + '@summitearth.com'
      }
      let supervisor = supervisors.find(supervisor => supervisor.name === header.Supervisor)
      if (!supervisor) {
        supervisor["name"] = header.Supervisor
        supervisor["email"] = header.Supervisor.charAt(0) + header.Supervisor.slice(header.Supervisor.indexOf(' ') + 1) + '@summitearth.com'
      }
      let message = this.discrepancyForm.value

      if (message.Discrepancy == null) message.Discrepancy = 'No discrepancies.'

      let notificationObj = {
        name: form["name"],
        worker: worker,
        supervisor: supervisor,
        description: 'Vehicle Inspection, ' + _moment().format('MMM D, h:mA'),
        subject: 'New Vehicle Inspection from ' + header.Worker + ', ' + new Date(),
        message: message.Discrepancy,
        form_id: form["form_id"],
        data_id: this.formDataID,
        pdf: 'vehicle-inspection' + this.formDataID
      }

      this.notificationService.createNotification(notificationObj).subscribe((myNotifications: any) => {
        this.headerForm.reset()
        this.detailForm.reset()
        this.discrepancyForm.reset()
        this.store.dispatch(new SetPage('home'))
        this.store.dispatch(new SetChildPage('Forms'))
        this.store.dispatch(new SetIsHeaderValid(false))
        this.store.dispatch(new SetPics([]))
        this.autoCompleteService.makesControl.setValue('')
        this.autoCompleteService.modelsControl.setValue('')
        this.autoCompleteService.workersControl.setValue('')
        this.autoCompleteService.supervisorsControl.setValue('')
        this.store.dispatch(new SetNotificationOpen(myNotifications.data))

        this.snackBar.open(myNotifications.message, 'Success', {
          duration: 3000,
          verticalPosition: 'bottom'
        })
        const obj = {
          toName: notificationObj.supervisor.name,
          messageID: myNotifications.data[0]["id"],
          url: this.messageUrl,
          subject: notificationObj.subject,
          emailTo: notificationObj.supervisor.email,
          emailFrom: notificationObj.worker.email
        }
        this.emailService.sendNotificationEmail(obj).subscribe(() => { })
      })
      const pics = this.store.selectSnapshot(DeviceState.pics)
      const selectedForm = this.store.selectSnapshot(AuthState.selectedForm)

      const picObj = {
        id: selectedForm["id"] + this.formDataID,
        pics: pics
      }
      this.idbCrudService.put('pics', picObj)
    })
  }

  checkValidHeader() {
    const header = this.headerForm.value
    if (header.Date != null
      && this.autoCompleteService.workersControl.value != null
      && this.autoCompleteService.supervisorsControl.value != null
      && this.autoCompleteService.makesControl.value != null
      && this.autoCompleteService.modelsControl.value != null
      && header.Stakeholder != null
      && header.Division != null
      && header.Mileage != null
      && header.Year != null
      && header.RegistrationDate != null) this.store.dispatch(new SetIsHeaderValid(true))
  }

}
