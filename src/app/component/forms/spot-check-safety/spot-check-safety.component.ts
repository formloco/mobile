import { Component, OnInit } from '@angular/core'
import * as _moment from 'moment'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { ApiService } from "../../../service/api.service"
import { EmailService } from "../../../service/email.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { NotificationService } from "../../../service/notification.service"
import { AutoCompleteService } from "../../../service/auto-complete.service"

import { SPOT_CHECK_SAFETY } from './state/spot-check-safety.model'

import { environment } from '../../../../environments/environment'

import { Store } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'

import { SetPics } from '../../../state/device/device-state.actions'
import { SetPage, SetChildPage } from '../../../state/auth/auth-state.actions'

import { SetComments } from '../../comment/state/comment.actions'
import { SetNotificationOpen } from '../../../state/notification/notification-state.actions'
// import { SetCorrectiveActions } from '../../../state/notification/notification-state.actions'
import { SetCorrectiveActions } from '../../corrective-action/state/corrective-action.actions';
import { CorrectiveActionState } from '../../corrective-action/state/corrective-action.state';


@Component({
  selector: 'app-spot-check-safety',
  templateUrl: './spot-check-safety.component.html',
  styleUrls: ['./spot-check-safety.component.scss']
})

export class SpotCheckSafetyComponent implements OnInit {

  pics
  formData
  formDataID
  step = 0
  isEdit = false

  kioske = environment.kioske

  headerForm: FormGroup
  hazardForm: FormGroup
  rulesForm: FormGroup
  incidentForm: FormGroup
  communicationForm: FormGroup
  personalEquipmentForm: FormGroup
  safetyEquipmentForm: FormGroup
  correctiveActionForm: FormGroup
  discrepancyForm: FormGroup

  messageUrl = environment.messageUrl

  SPOT_CHECK_SAFETY = SPOT_CHECK_SAFETY

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private idbCrudService: IdbCrudService,
    private autoCompleteService: AutoCompleteService,
    private notificationService: NotificationService) {
    this.headerForm = this.formBuilder.group({
      Date: [null, Validators.required],
      CompanyName: [null, Validators.required],
      EmployeeName: [null, Validators.required],
      Location: [null, Validators.required],
      JobDescription: [null, Validators.required]
    })
    this.hazardForm = this.formBuilder.group({
      InspectionFrequency: [],
      HazardAssessmentSystem: [],
      HazardComments: []
    })
    this.rulesForm = this.formBuilder.group({
      Procedures: [],
      EmergencyPlan: [],
      RulesComments: []
    })
    this.incidentForm = this.formBuilder.group({
      IncidentReporting: [],
      NearMissReporting: [],
      ProblemFixed: [],
      SolvingIssues: [],
      IncidentComments: []
    })
    this.communicationForm = this.formBuilder.group({
      SafetyOrientation: [],
      SafetyMeetingFrequency: [],
      AppropriateTraining: [],
      FirstAidTraining: [],
      H2STraining: [],
      WHMISTraining: [],
      TDGTraining: [],
      GroundDisturbanceTraining: [],
      EGSOCSOTraining: [],
      JobSpecificTraining: [],
      CommunicationComments: []
    })
    this.personalEquipmentForm = this.formBuilder.group({
      PPEAvailable: [],
      HardHat: [],
      SafetyGlasses: [],
      Footwear: [],
      ProtectiveClothing: [],
      HearingProtection: [],
      RespiratoryProtection: [],
      PersonalGasMonitor: [],
      CommunicationEquipment: [],
      OtherEquipment: [],
      PersonalEquipmentComments: []
    })
    this.safetyEquipmentForm = this.formBuilder.group({
      SafetyEquipmentAvailable: [],
      FireFightingEquipment: [],
      RotatingEquimentGuards: [],
      FirstAidKit: [],
      FallArrestEquipment: [],
      EmergencySystems: [],
      Other: [],
      SafetyEquipmentComments: []
    })
    this.discrepancyForm = this.formBuilder.group({
      Discrepancy: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.store.select(AuthState.formData).subscribe(formData => {
      this.formData = formData
      if (formData["data"]) {
        this.isEdit = true
        this.setFormData(formData["data"])
      }
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++
  }

  prevStep() {
    this.step--
  }

  setFormData(data) {
    if (data.header) {
      this.headerForm.controls['Date'].setValue(data.header.Date)
      this.headerForm.controls['CompanyName'].setValue(data.header.CompanyName)
      this.headerForm.controls['EmployeeName'].setValue(data.header.EmployeeName)
      this.headerForm.controls['Location'].setValue(data.header.Location)
      this.headerForm.controls['JobDescription'].setValue(data.header.JobDescription)
      this.autoCompleteService.workersControl.setValue(data.header.Worker)
      this.autoCompleteService.supervisorsControl.setValue(data.header.Supervisor)
    }
    if (data.hazard) {
      this.hazardForm.controls['InspectionFrequency'].setValue(data.hazard.InspectionFrequency)
      this.hazardForm.controls['HazardAssessmentSystem'].setValue(data.hazard.HazardAssessmentSystem)
      this.hazardForm.controls['HazardComments'].setValue(data.hazard.HazardComments)
    }

    if (data.rules) {
      this.rulesForm.controls['Procedures'].setValue(data.rules.Procedures)
      this.rulesForm.controls['EmergencyPlan'].setValue(data.rules.EmergencyPlan)
      this.rulesForm.controls['RulesComments'].setValue(data.rules.RulesComments)
    }

    if (data.incident) {
      this.incidentForm.controls['IncidentReporting'].setValue(data.incident.IncidentReporting)
      this.incidentForm.controls['NearMissReporting'].setValue(data.incident.NearMissReporting)
      this.incidentForm.controls['ProblemFixed'].setValue(data.incident.ProblemFixed)
      this.incidentForm.controls['SolvingIssues'].setValue(data.incident.SolvingIssues)
      this.incidentForm.controls['IncidentComments'].setValue(data.incident.IncidentComments)
    }

    if (data.communication) {
      this.communicationForm.controls['SafetyOrientation'].setValue(data.communication.SafetyOrientation)
      this.communicationForm.controls['SafetyMeetingFrequency'].setValue(data.communication.SafetyMeetingFrequency)
      this.communicationForm.controls['AppropriateTraining'].setValue(data.communication.AppropriateTraining)
      this.communicationForm.controls['FirstAidTraining'].setValue(data.communication.FirstAidTraining)
      this.communicationForm.controls['H2STraining'].setValue(data.communication.H2STraining)
      this.communicationForm.controls['WHMISTraining'].setValue(data.communication.WHMISTraining)
      this.communicationForm.controls['TDGTraining'].setValue(data.communication.TDGTraining)
      this.communicationForm.controls['GroundDisturbanceTraining'].setValue(data.communication.GroundDisturbanceTraining)
      this.communicationForm.controls['EGSOCSOTraining'].setValue(data.communication.EGSOCSOTraining)
      this.communicationForm.controls['JobSpecificTraining'].setValue(data.communication.JobSpecificTraining)
      this.communicationForm.controls['CommunicationComments'].setValue(data.communication.CommunicationComments)
    }

    if (data.personalEquipment) {
      this.personalEquipmentForm.controls['PPEAvailable'].setValue(data.personalEquipment.PPEAvailable)
      this.personalEquipmentForm.controls['HardHat'].setValue(data.personalEquipment.HardHat)
      this.personalEquipmentForm.controls['SafetyGlasses'].setValue(data.personalEquipment.SafetyGlasses)
      this.personalEquipmentForm.controls['Footwear'].setValue(data.personalEquipment.Footwear)
      this.personalEquipmentForm.controls['ProtectiveClothing'].setValue(data.personalEquipment.ProtectiveClothing)
      this.personalEquipmentForm.controls['HearingProtection'].setValue(data.personalEquipmentHearingProtection)
      this.personalEquipmentForm.controls['RespiratoryProtection'].setValue(data.personalEquipment.RespiratoryProtection)
      this.personalEquipmentForm.controls['PersonalGasMonitor'].setValue(data.personalEquipment.PersonalGasMonitor)
      this.personalEquipmentForm.controls['CommunicationEquipment'].setValue(data.personalEquipment.CommunicationEquipment)
      this.personalEquipmentForm.controls['OtherEquipment'].setValue(data.personalEquipment.OtherEquipment)
      this.personalEquipmentForm.controls['PersonalEquipmentComments'].setValue(data.personalEquipment.PersonalEquipmentComments)
    }

    if (data.safetyEquipment) {
      this.safetyEquipmentForm.controls['SafetyEquipmentAvailable'].setValue(data.safetyEquipment.PersonalEquipmentComments)
      this.safetyEquipmentForm.controls['FireFightingEquipment'].setValue(data.safetyEquipment.PersonalEquipmentComments)
      this.safetyEquipmentForm.controls['RotatingEquimentGuards'].setValue(data.safetyEquipment.PersonalEquipmentComments)
      this.safetyEquipmentForm.controls['FirstAidKit'].setValue(data.safetyEquipment.PersonalEquipmentComments)
      this.safetyEquipmentForm.controls['FallArrestEquipment'].setValue(data.safetyEquipment.PersonalEquipmentComments)
      this.safetyEquipmentForm.controls['EmergencySystems'].setValue(data.safetyEquipment.PersonalEquipmentComments)
      this.safetyEquipmentForm.controls['Other'].setValue(data.safetyEquipment.PersonalEquipmentComments)
      this.safetyEquipmentForm.controls['SafetyEquipmentComments'].setValue(data.safetyEquipment.PersonalEquipmentComments)
    }

    // if (data.discrepancyComments.Discrepancy) {
    //   this.store.dispatch(new SetComments(data.correctiveAction))
    //   this.discrepancyForm.controls['Discrepancy'].setValue(data.discrepancyComments.Discrepancy)
    // }
console.log(data,data.correctiveAction)
    if (data.correctiveAction) {
      this.store.dispatch(new SetComments(data.correctiveAction))
      this.store.dispatch(new SetCorrectiveActions(data.correctiveAction))
    }

  }

  updateForm() {
    const form = this.store.selectSnapshot(AuthState.selectedForm)

    let header = this.headerForm.value
    header.Worker = this.autoCompleteService.workersControl.value
    header.Supervisor = this.autoCompleteService.supervisorsControl.value

    let data = {
      header: header,
      hazard: this.hazardForm.value,
      rules: this.rulesForm.value,
      incident: this.incidentForm.value,
      communication: this.communicationForm.value,
      personalEquipment: this.personalEquipmentForm.value,
      safetyEquipment: this.safetyEquipmentForm.value,
      discrepancyComments: this.discrepancyForm.value,
      correctiveAction: this.store.selectSnapshot(CorrectiveActionState.correctiveActions)
    }

    const obj = {
      id: form["id"],
      data: data,
      data_id: this.formData["id"],
      form_id: form["form_id"],
      date: new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
      pics: this.store.selectSnapshot(DeviceState.pics)
      // pics: JSON.stringify(this.store.selectSnapshot(DeviceState.pics))
    }
    this.apiService.update(obj).subscribe((res) => {
      this.resetForm()
      this.snackBar.open(res["data"].message, 'Success', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })

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
    header.Worker = this.autoCompleteService.workersControl.value
    header.Supervisor = this.autoCompleteService.supervisorsControl.value

    let data = {
      header: header,
      hazard: this.hazardForm.value,
      rules: this.rulesForm.value,
      incident: this.incidentForm.value,
      communication: this.communicationForm.value,
      personalEquipment: this.personalEquipmentForm.value,
      safetyEquipment: this.safetyEquipmentForm.value,
      discrepancyComments: this.discrepancyForm.value,
      correctiveAction: this.store.selectSnapshot(CorrectiveActionState.correctiveActions)
    }

    dataObj.push(null)
    dataObj.push(JSON.stringify(userCreated))
    dataObj.push(new Date())
    dataObj.push(new Date())
    dataObj.push(null)
    dataObj.push(JSON.stringify(data))

    this.SPOT_CHECK_SAFETY["form_id"] = form["form_id"]
    this.SPOT_CHECK_SAFETY["is_published"] = true
    this.SPOT_CHECK_SAFETY["is_data"] = true

    let obj = {
      data: dataObj,
      columns: this.SPOT_CHECK_SAFETY["columns"],
      user: userCreated,
      formObj: this.SPOT_CHECK_SAFETY,
      type: 'custom',
      name: form["name"],
      pics: JSON.stringify(this.store.selectSnapshot(DeviceState.pics)),
      location: data.header.Location,
      correctiveActions: (this.store.selectSnapshot(CorrectiveActionState.correctiveActions))

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

      let notificationObj = {
        name: form["name"],
        worker: worker,
        supervisor: supervisor,
        description: 'Spot Check Safety, ' + _moment().format('MMM D, h:mA'),
        message: 'Spot Check Safety completed for ' + this.headerForm.controls['CompanyName'].value + ', ' + this.headerForm.controls['Location'].value,
        subject: 'New Spot Check Safety from ' + header.Worker + ', ' + new Date(),
        form_id: form["form_id"],
        data_id: this.formDataID,
        pdf: 'spot-check-safety' + this.formDataID
      }

      this.notificationService.createNotification(notificationObj).subscribe((myNotifications: any) => {
        this.resetForm()
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

  resetForm() {
    this.headerForm.reset()
    this.hazardForm.reset()
    this.rulesForm.reset()
    this.incidentForm.reset()
    this.communicationForm.reset()
    this.personalEquipmentForm.reset()
    this.safetyEquipmentForm.reset()
    this.store.dispatch(new SetPage('home'))
    this.store.dispatch(new SetChildPage('Forms'))
    this.store.dispatch(new SetPics([]))
    this.autoCompleteService.workersControl.setValue('')
    this.autoCompleteService.supervisorsControl.setValue('')
  }
}
