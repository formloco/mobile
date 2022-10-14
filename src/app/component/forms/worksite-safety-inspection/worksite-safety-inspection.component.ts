import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';

import { Observable } from 'rxjs';
import { AppService } from '../../../service/app.service';
import { ApiService } from '../../../service/api.service';
import { FormService } from '../../../service/form.service';
import { IdbCrudService } from '../../../service-idb/idb-crud.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { WORKSITE_SAFETY_INSPECTION } from './state/worksite-safety-inspection-state.model';

import { environment } from '../../../../environments/environment';

import { AutoCompleteService } from '../../../service/auto-complete.service';

import { Store, Select } from '@ngxs/store';
import { AuthState } from '../../../state/auth/auth.state';
import { DeviceState } from '../../../state/device/device.state';

import { WorksiteSafetyInspectionState } from './state/worksite-safety-inspection.state';
import { SetIsWorksiteSafetyHeaderValid } from './state/worksite-safety-inspection-state.actions';

import { SetPics } from '../../../state/device/device-state.actions';
import {
  SetPage,
  SetChildPageLabel,
} from '../../../state/auth/auth-state.actions';

import { CommentState } from '../../comment/state/comment.state';
import { SetComments } from '../../comment/state/comment.actions';

import { CorrectiveActionState } from '../../corrective-action/state/corrective-action.state';
import { SetCorrectiveActions } from '../../corrective-action/state/corrective-action.actions';

@Component({
  selector: 'app-worksite-safety-inspection',
  templateUrl: './worksite-safety-inspection.component.html',
  styleUrls: ['./worksite-safety-inspection.component.scss'],
})
export class WorksiteSafetyInspectionComponent implements OnInit {
  @Select(WorksiteSafetyInspectionState.isWorksiteSafetyHeaderValid)
  isWorksiteSafetyHeaderValid$: Observable<boolean>;

  pics;
  isEdit = false;
  isOnline;
  formData;
  formDataID;
  step = 0;
  history = [];
  lookupLists;
  notificationObj

  headerForm: FormGroup;
  hazardForm: FormGroup;
  jobsiteForm: FormGroup;
  fireExtinguisherForm: FormGroup;
  erpPlanningForm: FormGroup;
  groundForm: FormGroup;
  equipmentForm: FormGroup;
  confinedSpaceForm: FormGroup;
  hotWorkForm: FormGroup;
  keyPositiveFindingsForm: FormGroup;
  discrepancyForm: FormGroup;

  WORKSITE_SAFETY_INSPECTION = WORKSITE_SAFETY_INSPECTION;

  isERP = false;
  isGround;
  isVehicle;
  isConfine;
  isHot;
  isERPDisabled = true;

  isPanelOpen = false;

  apiURL = environment.apiUrl;
  messageUrl = environment.messageUrl;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    public appService: AppService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private idbCrudService: IdbCrudService,
    private autoCompleteService: AutoCompleteService
  ) {
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
      ScopeOfWork: [null, Validators.required],
    });
    this.hazardForm = this.formBuilder.group({
      SiteHazardAssessmentCompleted: [null, Validators.required],
      ScopeOfWorkClearlyDefined: [null, Validators.required],
      PotentialHazardsAndMitigationRequirementsIdentified: [
        null,
        Validators.required,
      ],
      SummitHealthAndSafetyManualAvailable: [null, Validators.required],
      OccupationalHealthAndSafetyLegislationAvailable: [
        null,
        Validators.required,
      ],
      DailySafetyMeetingsConductedDocumented: [null, Validators.required],
      AllSitePersonalTrainingAndSafetyTickets: [null, Validators.required],
      AllSitePersonnelSiteSpecificWearingPPE: [null, Validators.required],
    });
    this.jobsiteForm = this.formBuilder.group({
      WorkAreaClearlyIdentified: [null, Validators.required],
      SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns: [
        null,
        Validators.required,
      ],
      AllOpenExcavationsAreClearlyMarked: [null, Validators.required],
      PublicAccessToTheSiteControlled: [null, Validators.required],
      PrimeContractorClearlyIdentifiedWithSignage: [null, Validators.required],
      IsThereEmergencyEquipmentOnSite: [null, Validators.required],
      FirstAidKitAvailable: [null, Validators.required],
      BlanketsAndStretcherAvailable: [null, Validators.required],
      EyeWashBottleAvailable: [null, Validators.required],
      SpillKitAvailable: [null, Validators.required],
      H2SPersonalGasMonitorsOnsiteHaveBeenBumped: [null, Validators.required],
    });
    this.fireExtinguisherForm = this.formBuilder.group({
      TwentyPoundMinimumFireExtinguisherAvailable: [null, Validators.required],
      FireExtinguisherInspected: [null],
      FireExtinguisherVisibleUnobstructed: [null],
      FireExtinguisherCharged: [null],
      FireExtinguisherSafetyPinSecured: [null],
      FireExtinguisherOperatingInstructions: [null],
      FireExtinguisherNoVisibleDamage: [null],
      FireExtinguisherCertification: [null],
    });
    this.erpPlanningForm = this.formBuilder.group({
      EmergencyResponsePlanOnSite: [null, Validators.required],
      MusterPointsIdentified: [null],
      STARSNumber: [null],
      ERPIncludesDirectionsToNearestHospital: [null],
      ERPResponderRolesAndResponsibilitiesIdentified: [null],
      CellularOrRadioCoverageConfirmed: [null, Validators.required],
    });
    this.groundForm = this.formBuilder.group({
      DoesTheProjectInvolveGroundDisturbance: [null],
      GroundDisturbanceChecklistIsInPlace: [null],
      OneCallNotificationHasBeenRegistered: [null],
      AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed: [null],
      ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined: [null],
      ThirdPartyLineLocatesCompletedWithinTheSearchArea: [null],
      AllRequiredCrossingOrProximityAgreementsInPlace: [null],
    });
    this.confinedSpaceForm = this.formBuilder.group({
      DoesTheProjectInvolveConfinedSpaceEntry: [null],
      ConfinedSpacePermitIssued: [null],
      ConfinedSpaceSafetyTraining: [null],
      SafetyWatchInPlace: [null],
      RescuePlanAvailable: [null],
    });
    this.hotWorkForm = this.formBuilder.group({
      DoesTheProjectInvolveHotWork: [null],
      HotWorkPermitIssued: [null],
      FireHazardsIdentifiedControls: [null],
      FireSafetyWatchAvailable: [null],
    });
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
    });
    this.keyPositiveFindingsForm = this.formBuilder.group({
      KeyPositiveFindings: [null, Validators.required],
    });
    this.discrepancyForm = this.formBuilder.group({
      Discrepancy: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.isOnline = this.store.selectSnapshot(DeviceState.isOnline);

    this.store.select(AuthState.formData).subscribe((formData) => {
      this.formData = formData;
      if (this.formData && formData['data']) {
        this.isEdit = true;
        this.setFormData(formData['data']);
      } else this.store.dispatch(new SetIsWorksiteSafetyHeaderValid(true));
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.checkValidHeader();
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setFormData(data) {
    if (data.header) {
      this.headerForm.controls['Date'].setValue(data.header.Date);
      this.headerForm.controls['Client'].setValue(data.header.Client);
      this.headerForm.controls['Location'].setValue(data.header.Location);
      this.headerForm.controls['LSDUWI'].setValue(data.header.LSDUWI);
      this.headerForm.controls['Latitude'].setValue(data.header.Latitude);
      this.headerForm.controls['Longitude'].setValue(data.header.Longitude);
      this.headerForm.controls['SupervisorPhone'].setValue(
        data.header.SupervisorPhone
      );
      this.headerForm.controls['JobNumber'].setValue(data.header.JobNumber);
      this.headerForm.controls['Division'].setValue(data.header.Division);
      this.headerForm.controls['STARSSiteNumber'].setValue(
        data.header.STARSSiteNumber
      );
      this.headerForm.controls['ScopeOfWork'].setValue(data.header.ScopeOfWork);
      this.autoCompleteService.clientsControl.setValue(data.header.Client);
      this.autoCompleteService.workersControl.setValue(data.header.Worker);
      this.autoCompleteService.supervisorsControl.setValue(
        data.header.Supervisor
      );
    }
    if (data.hazard) {
      this.hazardForm.controls['SiteHazardAssessmentCompleted'].setValue(
        data.hazard.SiteHazardAssessmentCompleted
      );
      this.hazardForm.controls['ScopeOfWorkClearlyDefined'].setValue(
        data.hazard.ScopeOfWorkClearlyDefined
      );
      this.hazardForm.controls[
        'PotentialHazardsAndMitigationRequirementsIdentified'
      ].setValue(
        data.hazard.PotentialHazardsAndMitigationRequirementsIdentified
      );
      this.hazardForm.controls['SummitHealthAndSafetyManualAvailable'].setValue(
        data.hazard.SummitHealthAndSafetyManualAvailable
      );
      this.hazardForm.controls[
        'OccupationalHealthAndSafetyLegislationAvailable'
      ].setValue(data.hazard.OccupationalHealthAndSafetyLegislationAvailable);
      this.hazardForm.controls[
        'DailySafetyMeetingsConductedDocumented'
      ].setValue(data.hazard.DailySafetyMeetingsConductedDocumented);
      this.hazardForm.controls[
        'AllSitePersonalTrainingAndSafetyTickets'
      ].setValue(data.hazard.AllSitePersonalTrainingAndSafetyTickets);
      this.hazardForm.controls[
        'AllSitePersonnelSiteSpecificWearingPPE'
      ].setValue(data.hazard.AllSitePersonnelSiteSpecificWearingPPE);
    }
    if (data.jobsite) {
      this.jobsiteForm.controls['WorkAreaClearlyIdentified'].setValue(
        data.jobsite.WorkAreaClearlyIdentified
      );
      this.jobsiteForm.controls[
        'SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns'
      ].setValue(
        data.jobsite.SiteIsFreeOfTripHazardsAndOtherHousekeepingConcerns
      );
      this.jobsiteForm.controls['AllOpenExcavationsAreClearlyMarked'].setValue(
        data.jobsite.AllOpenExcavationsAreClearlyMarked
      );
      this.jobsiteForm.controls['PublicAccessToTheSiteControlled'].setValue(
        data.jobsite.PublicAccessToTheSiteControlled
      );
      this.jobsiteForm.controls[
        'PrimeContractorClearlyIdentifiedWithSignage'
      ].setValue(data.jobsite.PrimeContractorClearlyIdentifiedWithSignage);
      this.jobsiteForm.controls['IsThereEmergencyEquipmentOnSite'].setValue(
        data.jobsite.IsThereEmergencyEquipmentOnSite
      );
      this.jobsiteForm.controls['FirstAidKitAvailable'].setValue(
        data.jobsite.FirstAidKitAvailable
      );
      this.jobsiteForm.controls['BlanketsAndStretcherAvailable'].setValue(
        data.jobsite.BlanketsAndStretcherAvailable
      );
      this.jobsiteForm.controls['EyeWashBottleAvailable'].setValue(
        data.jobsite.EyeWashBottleAvailable
      );
      this.jobsiteForm.controls['SpillKitAvailable'].setValue(
        data.jobsite.SpillKitAvailable
      );
      this.jobsiteForm.controls[
        'H2SPersonalGasMonitorsOnsiteHaveBeenBumped'
      ].setValue(data.jobsite.H2SPersonalGasMonitorsOnsiteHaveBeenBumped);
    }
    if (data.fireExtinguisher) {
      this.fireExtinguisherForm.controls[
        'TwentyPoundMinimumFireExtinguisherAvailable'
      ].setValue(
        data.fireExtinguisher.TwentyPoundMinimumFireExtinguisherAvailable
      );
      this.fireExtinguisherForm.controls['FireExtinguisherInspected'].setValue(
        data.fireExtinguisher.FireExtinguisherInspected
      );
      this.fireExtinguisherForm.controls[
        'FireExtinguisherVisibleUnobstructed'
      ].setValue(data.fireExtinguisher.FireExtinguisherVisibleUnobstructed);
      this.fireExtinguisherForm.controls['FireExtinguisherCharged'].setValue(
        data.fireExtinguisher.FireExtinguisherCharged
      );
      this.fireExtinguisherForm.controls[
        'FireExtinguisherSafetyPinSecured'
      ].setValue(data.fireExtinguisher.FireExtinguisherSafetyPinSecured);
      this.fireExtinguisherForm.controls[
        'FireExtinguisherOperatingInstructions'
      ].setValue(data.fireExtinguisher.FireExtinguisherOperatingInstructions);
      this.fireExtinguisherForm.controls[
        'FireExtinguisherNoVisibleDamage'
      ].setValue(data.fireExtinguisher.FireExtinguisherNoVisibleDamage);
      this.fireExtinguisherForm.controls[
        'FireExtinguisherCertification'
      ].setValue(data.fireExtinguisher.FireExtinguisherCertification);
    }
    if (data.erpPlanning) {
      this.erpPlanningForm.controls['EmergencyResponsePlanOnSite'].setValue(
        data.erpPlanning.EmergencyResponsePlanOnSite
      );
      this.erpPlanningForm.controls['MusterPointsIdentified'].setValue(
        data.erpPlanning.MusterPointsIdentified
      );
      this.erpPlanningForm.controls['STARSNumber'].setValue(
        data.erpPlanning.STARSNumber
      );
      this.erpPlanningForm.controls[
        'ERPIncludesDirectionsToNearestHospital'
      ].setValue(data.erpPlanning.ERPIncludesDirectionsToNearestHospital);
      this.erpPlanningForm.controls[
        'ERPResponderRolesAndResponsibilitiesIdentified'
      ].setValue(
        data.erpPlanning.ERPResponderRolesAndResponsibilitiesIdentified
      );
      this.erpPlanningForm.controls[
        'CellularOrRadioCoverageConfirmed'
      ].setValue(data.erpPlanning.CellularOrRadioCoverageConfirmed);
    }
    if (data.ground) {
      this.groundForm.controls[
        'DoesTheProjectInvolveGroundDisturbance'
      ].setValue(data.ground.DoesTheProjectInvolveGroundDisturbance);
      this.groundForm.controls['GroundDisturbanceChecklistIsInPlace'].setValue(
        data.ground.GroundDisturbanceChecklistIsInPlace
      );
      this.groundForm.controls['OneCallNotificationHasBeenRegistered'].setValue(
        data.ground.OneCallNotificationHasBeenRegistered
      );
      this.groundForm.controls[
        'AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed'
      ].setValue(
        data.ground
          .AllUndergroundLinesWithinFiveMetresOfTheWorkAreaManuallyExposed
      );
      this.groundForm.controls[
        'ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined'
      ].setValue(
        data.ground.ThirtyMetreSearchAreaAroundTheWorkAreaClearlyDefined
      );
      this.groundForm.controls[
        'ThirdPartyLineLocatesCompletedWithinTheSearchArea'
      ].setValue(data.ground.ThirdPartyLineLocatesCompletedWithinTheSearchArea);
      this.groundForm.controls[
        'AllRequiredCrossingOrProximityAgreementsInPlace'
      ].setValue(data.ground.AllRequiredCrossingOrProximityAgreementsInPlace);
    }
    if (data.confinedSpace) {
      this.confinedSpaceForm.controls[
        'DoesTheProjectInvolveConfinedSpaceEntry'
      ].setValue(data.confinedSpace.DoesTheProjectInvolveConfinedSpaceEntry);
      this.confinedSpaceForm.controls['ConfinedSpacePermitIssued'].setValue(
        data.confinedSpace.ConfinedSpacePermitIssued
      );
      this.confinedSpaceForm.controls['ConfinedSpaceSafetyTraining'].setValue(
        data.confinedSpace.ConfinedSpaceSafetyTraining
      );
      this.confinedSpaceForm.controls['SafetyWatchInPlace'].setValue(
        data.confinedSpace.SafetyWatchInPlace
      );
      this.confinedSpaceForm.controls['RescuePlanAvailable'].setValue(
        data.confinedSpace.RescuePlanAvailable
      );
    }
    if (data.hotWork) {
      this.hotWorkForm.controls['DoesTheProjectInvolveHotWork'].setValue(
        data.hotWork.DoesTheProjectInvolveHotWork
      );
      this.hotWorkForm.controls['HotWorkPermitIssued'].setValue(
        data.hotWork.HotWorkPermitIssued
      );
      this.hotWorkForm.controls['FireHazardsIdentifiedControls'].setValue(
        data.hotWork.FireHazardsIdentifiedControls
      );
      this.hotWorkForm.controls['FireSafetyWatchAvailable'].setValue(
        data.hotWork.FireSafetyWatchAvailable
      );
    }
    if (data.equipment) {
      this.equipmentForm.controls[
        'ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects'
      ].setValue(
        data.equipment.ExteriorOfVehicleGenerallyCleanAndFreeOfVisualDefects
      );
      this.equipmentForm.controls['InteriorOfVehicleKeptTidyAndClean'].setValue(
        data.equipment.InteriorOfVehicleKeptTidyAndClean
      );
      this.equipmentForm.controls[
        'VehicleWindshieldFreeOfMajorChipsAndCracks'
      ].setValue(data.equipment.VehicleWindshieldFreeOfMajorChipsAndCracks);
      this.equipmentForm.controls[
        'DailyPreUseVehicleInspectionCompleted'
      ].setValue(data.equipment.DailyPreUseVehicleInspectionCompleted);
      this.equipmentForm.controls[
        'EquipmentPreUseInspectionCompleted'
      ].setValue(data.equipment.EquipmentPreUseInspectionCompleted);
      this.equipmentForm.controls[
        'CargoIinternalAndExternalProperlyStowedAndSecured'
      ].setValue(
        data.equipment.CargoIinternalAndExternalProperlyStowedAndSecured
      );
      this.equipmentForm.controls['HornIsInProperWorkingCondition'].setValue(
        data.equipment.HornIsInProperWorkingCondition
      );
      this.equipmentForm.controls[
        'HeadlightsAreInProperWorkingCondition'
      ].setValue(data.equipment.HeadlightsAreInProperWorkingCondition);
      this.equipmentForm.controls[
        'SignalLightsAreInProperWorkingCondition'
      ].setValue(data.equipment.SignalLightsAreInProperWorkingCondition);
      this.equipmentForm.controls[
        'EmergencyWarningStrobeLightEquippedOnVehicle'
      ].setValue(data.equipment.EmergencyWarningStrobeLightEquippedOnVehicle);
      this.equipmentForm.controls['SafetyBuggyWhipEquippedOnVehicle'].setValue(
        data.equipment.SafetyBuggyWhipEquippedOnVehicle
      );
      this.equipmentForm.controls['FirstAidKitEquippedInVehicle'].setValue(
        data.equipment.FirstAidKitEquippedInVehicle
      );
      this.equipmentForm.controls[
        'EmergencySurvivalKitEquippedInVehicle'
      ].setValue(data.equipment.EmergencySurvivalKitEquippedInVehicle);
    }
    if (data.keyPositiveFindings) {
      this.keyPositiveFindingsForm.controls['KeyPositiveFindings'].setValue(
        data.keyPositiveFindings.KeyPositiveFindings
      );
    }

    if (data.comments) {
      this.store.dispatch(new SetComments(data.comments));
    }

    if (data.correctiveActions) {
      this.store.dispatch(new SetCorrectiveActions(data.correctiveActions));
    }

    this.store.dispatch(new SetIsWorksiteSafetyHeaderValid(false));
  }

  updateForm() {
    const form = this.store.selectSnapshot(AuthState.selectedForm);

    let header = this.headerForm.value;
    header.Worker = this.autoCompleteService.workersControl.value;
    header.Supervisor = this.autoCompleteService.supervisorsControl.value;

    let data = {
      header: header,
      erpPlanning: this.erpPlanningForm.value,
      jobsite: this.jobsiteForm.value,
      fireExtinguisher: this.fireExtinguisherForm.value,
      ground: this.groundForm.value,
      confinedSpace: this.confinedSpaceForm.value,
      hotWork: this.hotWorkForm.value,
      equipment: this.equipmentForm.value,
      keyPositiveFindings: this.keyPositiveFindingsForm.value,
      comments: this.store.selectSnapshot(CommentState.comments),
      correctiveActions: this.store.selectSnapshot(
        CorrectiveActionState.correctiveActions
      ),
      hazard: this.hazardForm.value,
    };

    this.formService.updateForm(form, this.formData, data).subscribe((_) => {
      this.appService.sendEmail();
      this.resetForm();
    });
  }

  submitForm() {
    const user = this.store.selectSnapshot(AuthState.user);
    const form = this.store.selectSnapshot(AuthState.selectedForm);

    const now = new Date().toLocaleString('en-US', {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    });

    let userCreated = {
      email: user.email,
      date_created: now,
    };

    let header = this.headerForm.value;
    header.Client = this.autoCompleteService.clientsControl.value;
    header.Worker = this.autoCompleteService.workersControl.value;
    header.Supervisor = this.autoCompleteService.supervisorsControl.value;

    let data = {
      header: header,
      erpPlanning: this.erpPlanningForm.value,
      jobsite: this.jobsiteForm.value,
      fireExtinguisher: this.fireExtinguisherForm.value,
      ground: this.groundForm.value,
      confinedSpace: this.confinedSpaceForm.value,
      hotWork: this.hotWorkForm.value,
      equipment: this.equipmentForm.value,
      keyPositiveFindings: this.keyPositiveFindingsForm.value,
      comments: this.store.selectSnapshot(CommentState.comments),
      correctiveActions: this.store.selectSnapshot(
        CorrectiveActionState.correctiveActions
      ),
      hazard: this.hazardForm.value,
    };

    let obj = {
      data: JSON.stringify(data),
      user: userCreated,
      form: form,
      type: 'custom',
      date: now,
      name: form['name'],
      pics: this.store.selectSnapshot(DeviceState.pics),
      correctiveActions: this.store.selectSnapshot(
        CorrectiveActionState.correctiveActions
      ),
    };

    let message = 'No discrepancies.';
    if (data.comments.length > 0)
      message = `Number of Discrepancies: ${data.comments.length}`;
    if (!this.isOnline) {
      this.setNotificationObj(header, form, data, now)
      obj['notification'] = this.notificationObj;
      this.idbCrudService.put('data', obj);
    } else {
      this.apiService.save(obj).subscribe((idObj) => {
        this.formDataID = idObj;
        const workers: any = this.store.selectSnapshot(AuthState.workers);
        const supervisors: any = this.store.selectSnapshot(
          AuthState.supervisors
        );

        if (workers.length == 0 && supervisors.length == 0)
          this.snackBar.open(
            'Notifications not setup, please add workers and supervisors.',
            'Attention',
            {
              duration: 3000,
              verticalPosition: 'bottom',
            }
          );
        else {
          this.setNotificationObj(header, form, data, now)
          this.appService.createNotification(this.notificationObj);
          this.resetForm();
        }
      });
    }
  }

  checkValidHeader() {
    const header = this.headerForm.value;
    if (
      header.Date != null &&
      this.autoCompleteService.workersControl.value != null &&
      this.autoCompleteService.supervisorsControl.value != null &&
      this.autoCompleteService.clientsControl.value != null &&
      header.SupervisorPhone != null &&
      header.Division != null &&
      header.JobNumber != null &&
      header.ScopeOfWork != null
    )
      this.store.dispatch(new SetIsWorksiteSafetyHeaderValid(false));
  }

  setNotificationObj(header, form, data, now) {

    let message = 'No discrepancies.';
    if (data.comments.length > 0) message = `${data.comments.length} Discrepancies Exist!`;

    this.notificationObj = {
      name: form['name'],
      worker: this.appService.getWorker(header.Worker),
      supervisor: this.appService.getSupervisor(header.Supervisor),
      description: 'Worksite Safety Inspection, '+_moment().format('MMM D, h:mA'),
      message: 'Worksite Safety Inspection completed for '+header.Client+', '+header.Location+' '+message,
      subject: 'New Worksite Safety Inspection for '+this.headerForm.controls['Client'].value+', '+now,
      form_id: form['form_id'],
      data_id: null,
      pdf: 'worksite-safety-inspection' + this.formDataID,
    };
  }

  resetForm() {
    this.headerForm.reset();
    this.erpPlanningForm.reset();
    this.hazardForm.reset();
    this.jobsiteForm.reset();
    this.fireExtinguisherForm.reset();
    this.groundForm.reset();
    this.confinedSpaceForm.reset();
    this.hotWorkForm.reset();
    this.equipmentForm.reset();
    this.discrepancyForm.reset();
    this.keyPositiveFindingsForm.reset();
    this.store.dispatch(new SetPics([]));
    this.autoCompleteService.workersControl.reset();
    this.autoCompleteService.supervisorsControl.reset();
  }
}
