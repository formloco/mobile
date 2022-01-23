import { Component, OnInit, ViewChild } from '@angular/core'
import * as _moment from 'moment'

import { Observable } from 'rxjs'
import { AppService } from "../../../service/app.service"
import { ApiService } from "../../../service/api.service"
import { EmailService } from "../../../service/email.service"
import { IdbCrudService } from "../../../service-idb/idb-crud.service"
import { NotificationService } from "../../../service/notification.service"

import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { WORKSITE_SAFETY_INSPECTION } from './state/worksite-safety-inspection-state.model'

import { environment } from '../../../../environments/environment'

import { AutoCompleteService } from "../../../service/auto-complete.service"

import { Store, Select } from '@ngxs/store'
import { AuthState } from '../../../state/auth/auth.state'
import { DeviceState } from '../../../state/device/device.state'

import { WorksiteSafetyInspectionState } from './state/worksite-safety-inspection.state'
import { SetIsWorksiteSafetyHeaderValid } from './state/worksite-safety-inspection-state.actions'

import { SetPics } from '../../../state/device/device-state.actions'
import { SetPage, SetChildPage } from '../../../state/auth/auth-state.actions'

import { SetNotificationOpen } from '../../../state/notification/notification-state.actions'

@Component({
  selector: 'app-worksite-safety-inspection',
  templateUrl: './worksite-safety-inspection.component.html',
  styleUrls: ['./worksite-safety-inspection.component.scss']
})
export class WorksiteSafetyInspectionComponent implements OnInit {

  @Select(WorksiteSafetyInspectionState.isWorksiteSafetyHeaderValid) isWorksiteSafetyHeaderValid$: Observable<boolean>
  
  pics
  formDataID
  step = 0
  history = []
  lookupLists

  headerForm: FormGroup
  hazardForm: FormGroup
  jobsiteForm: FormGroup
  fireExtinguisherForm: FormGroup
  erpPlanningForm: FormGroup
  groundForm: FormGroup
  equipmentForm: FormGroup
  confinedSpaceForm: FormGroup
  hotWorkForm: FormGroup
  discrepancyForm: FormGroup
  commentForm: FormGroup

  WORKSITE_SAFETY_INSPECTION = WORKSITE_SAFETY_INSPECTION

  isERP = false
  isGround
  isVehicle
  isConfine
  isHot
  isERPDisabled = true

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
    private autoCompleteService: AutoCompleteService) {
    this.headerForm = this.formBuilder.group({
      Date: [null, Validators.required],
      Client: [null, Validators.required],
      Location: [],
      LSDUWI: [],
      Latitude: [],
      Longitude: [],
      SupervisorPhone: [null, Validators.required],
      JobNumber: [null, Validators.required],
      Division: [null, Validators.required],
      STARSSiteNumber: [],
      ScopeOfWork: [null, Validators.required]
    })
    this.hazardForm = this.formBuilder.group({
      SiteHazardAssessmentCompleted: [null, Validators.required],
      ScopeOfWorkClearlyDefined: [null, Validators.required],
      PotentialHazardsAndMitigationRequirementsIdentified: [null, Validators.required],
      SummitHealthAndSafetyManualAvailable: [null, Validators.required],
      OccupationalHealthAndSafetyLegislationAvailable: [null, Validators.required],
      DailySafetyMeetingsConductedDocumented: [null, Validators.required],
      AllSitePersonalTrainingAndSafetyTickets: [null, Validators.required],
      H2SPersonalGasMonitorsOnsiteHaveBeenBumped: [null, Validators.required],
      AllSitePersonnelSiteSpecificWearingPPE: [null, Validators.required]
    })
    this.jobsiteForm = this.formBuilder.group({
      WorkAreaClearlyIdentified: [null, Validators.required],
      AppropriateAccessAndEgressRoutesAreEstablished: [null, Validators.required],
      SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns: [null, Validators.required],
      AllOpenExcavationsAreClearlyMarked: [null, Validators.required],
      PublicAccessToTheSiteControlled: [null, Validators.required],
      PrimeContractorClearlyIdentifiedWithSignage: [null, Validators.required],
      IsThereEmergencyEquipmentOnSite: [null, Validators.required],
      FirstAidKitAvailable: [null, Validators.required],
      BlanketsAndStretcherAvailable: [null, Validators.required],
      EyeWashBottleAvailable: [null, Validators.required],
      SpillKitAvailable: [null, Validators.required]
    })
    this.fireExtinguisherForm = this.formBuilder.group({
      TwentyPoundMinimumFireExtinguisherAvailable: [null, Validators.required],
      FireExtinguisherInspected: [null],
      FireExtinguisherVisibleUnobstructed: [null],
      FireExtinguisherCharged: [null],
      FireExtinguisherSafetyPinSecured: [null],
      FireExtinguisherOperatingInstructions: [null],
      FireExtinguisherNoVisibleDamage: [null],
      FireExtinguisherCertification: [null]
    })
    this.erpPlanningForm = this.formBuilder.group({
      EmergencyResponsePlanOnSite: [null, Validators.required],
      MusterPointsIdentified: [null],
      STARSNumber: [null],
      ERPIncludesDirectionsToNearestHospital: [null],
      ERPResponderRolesAndResponsibilitiesIdentified: [null],
      CellularOrRadioCoverageConfirmed: [null, Validators.required]
    })
    this.groundForm = this.formBuilder.group({
      DoesTheProjectInvolveGroundDisturbance: ['na'],
      GroundDisturbanceChecklistIsInPlace: [null],
      OneCallNotificationHasBeenRegistered: [null],
      AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed: [null],
      ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined: [null],
      ThirdPartyLineLocatesCompletedWithinTheSearchArea: [null],
      AllRequiredCrossingOrProximityAgreementsInPlace: [null]
    })
    this.confinedSpaceForm = this.formBuilder.group({
      DoesTheProjectInvolveConfinedSpaceEntry: [null],
      ConfinedSpacePermitIssued: [null],
      ConfinedSpaceSafetyTraining: [null],
      SafetyWatchInPlace: [null],
      RescuePlanAvailable: [null]
    })
    this.hotWorkForm = this.formBuilder.group({
      DoesTheProjectInvolveHotWork: [null],
      HotWorkPermitIssued: [null],
      FireHazardsIdentifiedControls: [null],
      FireSafetyWatchAvailable: [null]
    })
    this.equipmentForm = this.formBuilder.group({
      ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects: [null],
      InteriorOfVehicleKeptTidyAndClean: [null],
      VehicleWindshieldFreeOfMajorChipsAndCracks: [null],
      DailyPreUseVehicleInspectionCompleted: [null],
      EquipmentPreUseInspectionCompleted: [null],
      CargoIinternalAndExternalProperlyStowedAndSecured: [null],
      HornIsInProperWorkingCondition: [null],
      HeadlightsAreInProperWorkingCondition: [null],
      SignalLightsAreInProperWorkingCondition: [null],
      EmergencyWarningStrobeLightEquippedOnVehicle: [null],
      SafetyBuggyWhipEquippedOnVehicle: [null],
      FirstAidKitEquippedInVehicle: [null],
      EmergencySurvivalKitEquippedInVehicle: [null],
      OtherCommentsKeyPositiveFindings: [null]
    })
    this.discrepancyForm = this.formBuilder.group({
      Discrepancy: [null, Validators.required]
    })
    this.commentForm = this.formBuilder.group({
      CommentsAndRequiredActionItems: [null]
    })
  }

  ngOnInit() {
    this.store.dispatch(new SetIsWorksiteSafetyHeaderValid(true))
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.checkValidHeader()
    this.step++
  }

  prevStep() {
    this.step--
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
      erpPlanning: this.erpPlanningForm.value,
      jobsite: this.jobsiteForm.value,
      fireExtinguisher: this.fireExtinguisherForm.value,
      ground: this.groundForm.value,
      confinedSpace: this.confinedSpaceForm.value,
      hotWork: this.hotWorkForm.value,
      equipment: this.equipmentForm.value,
      discrepancy: this.discrepancyForm.value,
      hazard: this.hazardForm.value,
      comment: this.hazardForm.value
    }

    dataObj.push(null)
    dataObj.push(JSON.stringify(userCreated))
    dataObj.push(new Date())
    dataObj.push(new Date())
    dataObj.push(null)
    dataObj.push(JSON.stringify(data))

    this.WORKSITE_SAFETY_INSPECTION["form_id"] = form["form_id"]
    this.WORKSITE_SAFETY_INSPECTION["is_published"] = true
    this.WORKSITE_SAFETY_INSPECTION["is_data"] = true

    let obj = {
      data: dataObj,
      columns: this.WORKSITE_SAFETY_INSPECTION["columns"],
      user: userCreated,
      formObj: this.WORKSITE_SAFETY_INSPECTION,
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
        description: 'Worksite Safety Inspection, '+_moment().format('MMM D, h:mA'),
        message: message,
        subject: 'New Worksite Safety Inspection for '+this.headerForm.controls['Client'].value+', '+new Date(),
        form_id: form["form_id"],
        data_id: this.formDataID,
        pdf: 'worksite-safety-inspection' + this.formDataID
      }

      this.notificationService.createNotification(notificationObj).subscribe((myNotifications: any) => {
        this.headerForm.reset()
        this.erpPlanningForm.reset()
        this.hazardForm.reset()
        this.jobsiteForm.reset()
        this.fireExtinguisherForm.reset()
        this.groundForm.reset()
        this.confinedSpaceForm.reset()
        this.hotWorkForm.reset()
        this.equipmentForm.reset()
        this.discrepancyForm.reset()
        this.commentForm.reset()
        this.store.dispatch(new SetPage('home'))
        this.store.dispatch(new SetChildPage('Forms'))
        this.store.dispatch(new SetPics([]))
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
          emailTo: notificationObj.supervisor.email,
          emailFrom: notificationObj.worker.email
        }
        this.emailService.sendNotificationEmail(obj).subscribe(() => {
          console.log('message sent')
        })
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
      && this.autoCompleteService.clientsControl.value != null
      && header.SupervisorPhone != null
      && header.Division != null
      && header.JobNumber != null
      && header.ScopeOfWork != null) this.store.dispatch(new SetIsWorksiteSafetyHeaderValid(false))
  }

}
