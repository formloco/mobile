import { Component, OnInit } from '@angular/core'

import * as _moment from 'moment'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { ApiService } from "../../../service/api.service"
import { EmailService } from "../../../service/email.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { NotificationService } from "../../../service/notification.service"
import { AutoCompleteService } from "../../../service/auto-complete.service"

import { MEANINGFUL_SITE_TOUR } from './state/meaningful-site-tour.model'

import { environment } from '../../../../environments/environment'

import { Store } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'

import { SetPics } from '../../../state/device/device-state.actions'
import { SetPage, SetChildPage, SetChildPageLabel } from '../../../state/auth/auth-state.actions'

import { SetNotificationOpen } from '../../../state/notification/notification-state.actions'

@Component({
  selector: 'app-meaningful-site-tour',
  templateUrl: './meaningful-site-tour.component.html',
  styleUrls: ['./meaningful-site-tour.component.scss']
})
export class MeaningfulSiteTourComponent implements OnInit {

  pics
  kioske
  formData
  formDataID
  step = 0
  isEdit = false

  headerForm: FormGroup
  notesForm: FormGroup

  messageUrl = environment.messageUrl

  MEANINGFUL_SITE_TOUR = MEANINGFUL_SITE_TOUR

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
      Name: [null, Validators.required],
      Location: [],
      SiteOrientation: [],
      DailySafetyMeeting: [],
      SiteTour: [],
      SiteTourWithWorker: [],
      ReviewDiscuss: [],
      PositiveInterventionRecognition: [],
      EngageWithContractors: [],
      HousekeepingInspection: [],
      CompleteBBO: [],
      OpenTeamDiscussion: [],
      SafetyAlert: [],
      ProvideFeedback: [],
      FormalAuditInspection: []
    })
    this.notesForm = this.formBuilder.group({
      PositiveObservations: [null, Validators.required],
      ImprovementOpportunities: [null, Validators.required],
      FeedbackSummary: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.kioske = this.store.selectSnapshot(AuthState.kioske)
    this.store.select(AuthState.formData).subscribe(formData => {
      this.formData = formData
      if (this.formData && formData["data"]) {
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

  showSnackBar(msg) {
    this.snackBar.open(msg.message, 'Success', {
      duration: 3000,
      verticalPosition: 'bottom'
    })
  }

  setFormData(data) {
    if (data.header) {
      this.headerForm.controls['Date'].setValue(data.header.Date)
      this.headerForm.controls['Name'].setValue(data.header.Name)
      this.autoCompleteService.workersControl.setValue(data.header.Worker)
      this.autoCompleteService.supervisorsControl.setValue(data.header.Supervisor)
      this.headerForm.controls['Location'].setValue(data.header.Location)
      this.headerForm.controls['SiteOrientation'].setValue(data.header.SiteOrientation)
      this.headerForm.controls['DailySafetyMeeting'].setValue(data.header.DailySafetyMeeting)
      this.headerForm.controls['SiteTour'].setValue(data.header.SiteTour)
      this.headerForm.controls['SiteTourWithWorker'].setValue(data.header.SiteTourWithWorker)
      this.headerForm.controls['ReviewDiscuss'].setValue(data.header.ReviewDiscuss)
      this.headerForm.controls['PositiveInterventionRecognition'].setValue(data.header.PositiveInterventionRecognition)
      this.headerForm.controls['EngageWithContractors'].setValue(data.header.EngageWithContractors)
      this.headerForm.controls['HousekeepingInspection'].setValue(data.header.HousekeepingInspection)
      this.headerForm.controls['CompleteBBO'].setValue(data.header.CompleteBBO)
      this.headerForm.controls['OpenTeamDiscussion'].setValue(data.header.OpenTeamDiscussion)
      this.headerForm.controls['SafetyAlert'].setValue(data.header.SafetyAlert)
      this.headerForm.controls['ProvideFeedback'].setValue(data.header.ProvideFeedback)
      this.headerForm.controls['FormalAuditInspection'].setValue(data.header.FormalAuditInspection)
    }

    if (data.notes) {
      this.notesForm.controls['PositiveObservations'].setValue(data.notes.PositiveObservations)
      this.notesForm.controls['ImprovementOpportunities'].setValue(data.notes.ImprovementOpportunities)
      this.notesForm.controls['FeedbackSummary'].setValue(data.notes.FeedbackSummary)
    }
  }

  updateForm() {
    const form = this.store.selectSnapshot(AuthState.selectedForm)

    let header = this.headerForm.value
    header.Worker = this.autoCompleteService.workersControl.value
    header.Supervisor = this.autoCompleteService.supervisorsControl.value

    let data = {
      header: header,
      notes: this.notesForm.value
    }
    
    const obj = {
      id: form["id"],
      data: data,
      data_id: this.formData["id"],
      form_id: form["form_id"],
      date: new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
      pics: this.store.selectSnapshot(DeviceState.pics)
    }
    this.apiService.update(obj).subscribe((res) => {
      this.resetForm()
      this.store.dispatch(new SetPage('notification'))
      this.store.dispatch(new SetChildPageLabel('Forms'))
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
      notes: this.notesForm.value
    }
    
    dataObj.push(null)
    dataObj.push(JSON.stringify(userCreated))
    dataObj.push(new Date())
    dataObj.push(new Date())
    dataObj.push(null)
    dataObj.push(JSON.stringify(data))

    // this.MEANINGFUL_SITE_TOUR["form_id"] = form["form_id"]
    // this.MEANINGFUL_SITE_TOUR["is_published"] = true
    // this.MEANINGFUL_SITE_TOUR["is_data"] = true

    let obj = {
      data: dataObj,
      columns: this.MEANINGFUL_SITE_TOUR["columns"],
      user: userCreated,
      form: this.MEANINGFUL_SITE_TOUR,
      type: 'custom',
      date: new Date().toLocaleString("en-US", { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
      name: form["name"],
      pics: this.store.selectSnapshot(DeviceState.pics)
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
        description: 'Meaningful Site Tour ' + _moment().format('MMM D, h:mA'),
        message: 'Meaningful site tour completed for ' + this.headerForm.controls['Name'].value,
        subject: 'New Meaningful Site Tour from ' + this.headerForm.controls['Name'].value + ', ' + new Date(),
        form_id: form["form_id"],
        data_id: this.formDataID,
        pdf: 'meaningful-site-tour' + this.formDataID
      }

      this.notificationService.createNotification(notificationObj).subscribe((myNotifications: any) => {
        this.resetForm()
        this.store.dispatch(new SetPage('home'))
        this.store.dispatch(new SetChildPage('Forms'))
        this.store.dispatch(new SetNotificationOpen(myNotifications.data))

        this.showSnackBar(myNotifications.message) 

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
      this.idbCrudService.put('pics', [])
    })
  }

  resetForm() {
    this.headerForm.reset()
    this.notesForm.reset()
    this.store.dispatch(new SetPics([]))
    this.autoCompleteService.workersControl.setValue('')
    this.autoCompleteService.supervisorsControl.setValue('')
  }
  
}
