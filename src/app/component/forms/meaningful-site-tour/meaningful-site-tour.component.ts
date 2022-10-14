import { Component, OnInit } from '@angular/core'

import * as _moment from 'moment'
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { ApiService } from "../../../service/api.service"
import { AppService } from "../../../service/app.service"
import { FormService } from "../../../service/form.service"
import { EmailService } from '../../../service/email.service'

import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { AutoCompleteService } from "../../../service/auto-complete.service"

import { MEANINGFUL_SITE_TOUR } from './state/meaningful-site-tour.model'

import { Store } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'

import { NotificationState } from '../../../state/notification/notification.state'
import { environment } from '../../../../environments/environment';

import { SetPics } from '../../../state/device/device-state.actions'
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
  isOnline
  notificationObj
  messageUrl = environment.messageUrl;

  headerForm: FormGroup
  notesForm: FormGroup
  todoForm: FormGroup

  MEANINGFUL_SITE_TOUR = MEANINGFUL_SITE_TOUR

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    public appService: AppService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private emailService: EmailService,
    private idbCrudService: IdbCrudService,
    private autoCompleteService: AutoCompleteService) {
    this.headerForm = this.formBuilder.group({
      Date: [null, Validators.required],
      Name: [null, Validators.required],
      Location: [],
    })
    this.todoForm = this.formBuilder.group({
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
    this.isOnline = this.store.selectSnapshot(DeviceState.isOnline)

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
      this.headerForm.controls['Location'].setValue(data.header.Location)
      this.autoCompleteService.workersControl.setValue(data.header.Worker)
      this.autoCompleteService.supervisorsControl.setValue(data.header.Supervisor)
    }

    if (data.todo) {
      this.todoForm.controls['SiteOrientation'].setValue(data.todo.SiteOrientation)
      this.todoForm.controls['DailySafetyMeeting'].setValue(data.todo.DailySafetyMeeting)
      this.todoForm.controls['SiteTour'].setValue(data.todo.SiteTour)
      this.todoForm.controls['SiteTourWithWorker'].setValue(data.todo.SiteTourWithWorker)
      this.todoForm.controls['ReviewDiscuss'].setValue(data.todo.ReviewDiscuss)
      this.todoForm.controls['PositiveInterventionRecognition'].setValue(data.todo.PositiveInterventionRecognition)
      this.todoForm.controls['EngageWithContractors'].setValue(data.todo.EngageWithContractors)
      this.todoForm.controls['HousekeepingInspection'].setValue(data.todo.HousekeepingInspection)
      this.todoForm.controls['CompleteBBO'].setValue(data.todo.CompleteBBO)
      this.todoForm.controls['OpenTeamDiscussion'].setValue(data.todo.OpenTeamDiscussion)
      this.todoForm.controls['SafetyAlert'].setValue(data.todo.SafetyAlert)
      this.todoForm.controls['ProvideFeedback'].setValue(data.todo.ProvideFeedback)
      this.todoForm.controls['FormalAuditInspection'].setValue(data.todo.FormalAuditInspection)
    }

    if (data.notes) {
      this.notesForm.controls['PositiveObservations'].setValue(data.notes.PositiveObservations)
      this.notesForm.controls['ImprovementOpportunities'].setValue(data.notes.ImprovementOpportunities)
      this.notesForm.controls['FeedbackSummary'].setValue(data.notes.FeedbackSummary)
    }
  }

  updateForm() {
    const form = this.store.selectSnapshot(AuthState.selectedForm)
    const user = this.store.selectSnapshot(AuthState.user)
    const notification = this.store.selectSnapshot(NotificationState.notification)

    let header = this.headerForm.value
    let todo = this.todoForm.value
    header.Worker = this.autoCompleteService.workersControl.value
    header.Supervisor = this.autoCompleteService.supervisorsControl.value

    let data = {
      header: header,
      todo: todo,
      notes: this.notesForm.value
    }

    this.formService.updateForm(form, this.formData, data).subscribe(_ => {
      this.appService.sendEmail()
      this.resetForm()
    })

  }

  submitForm() {
    const user = this.store.selectSnapshot(AuthState.user)
    const form = this.store.selectSnapshot(AuthState.selectedForm)

    let userCreated = {
      email: user.email,
      date_created: this.appService.now
    }

    let header = this.headerForm.value
    header.Worker = this.autoCompleteService.workersControl.value
    header.Supervisor = this.autoCompleteService.supervisorsControl.value

    let todo = this.todoForm.value

    let data = {
      header: header,
      todo: todo,
      notes: this.notesForm.value
    }

    let obj = {
      data: JSON.stringify(data),
      user: userCreated,
      form: form,
      type: 'custom',
      date: this.appService.now,
      name: form["name"],
      pics: this.store.selectSnapshot(DeviceState.pics)
    }

    if (!this.isOnline) {
      this.setNotificationObj(header, form)
      obj['notification'] = this.notificationObj
      this.idbCrudService.put('data', obj)
    }
    else {
      this.apiService.save(obj).subscribe(idObj => {
        this.formDataID = idObj

        const workers: any = this.store.selectSnapshot(AuthState.workers)
        const supervisors: any = this.store.selectSnapshot(AuthState.supervisors)

        if (workers.length == 0 && supervisors.length == 0)
          this.snackBar.open("Notifications not setup, please add workers and supervisors.", 'Attention', {
            duration: 3000,
            verticalPosition: 'bottom'
          })
        else {
          this.setNotificationObj(header, form)
          const worker: any = this.appService.getWorker(header.Worker)
          const supervisor: any = this.appService.getSupervisor(header.Supervisor)

          this.appService.createNotification(this.notificationObj)
          this.resetForm()
        }
      })
    }
  }

  setNotificationObj(header, form) {
    this.notificationObj = {
      name: form["name"],
      worker: this.appService.getWorker(header.Worker),
      supervisor: this.appService.getSupervisor(header.Supervisor),
      description: 'Meaningful Site Tour ' + this.appService.now,
      message: 'Meaningful site tour completed for ' + this.headerForm.controls['Name'].value,
      subject: 'New Meaningful Site Tour from ' + header.Worker + ', ' + this.appService.now,
      form_id: form["form_id"],
      data_id: this.formDataID,
      pdf: 'meaningful-site-tour' + this.formDataID
    }
  }

  resetForm() {
    this.headerForm.reset()
    this.notesForm.reset()
    this.store.dispatch(new SetPics([]))
    this.autoCompleteService.workersControl.reset()
    this.autoCompleteService.supervisorsControl.reset()
  }

}
