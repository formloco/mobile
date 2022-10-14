import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ApiService } from '../../../service/api.service';
import { AppService } from '../../../service/app.service';
import { FormService } from '../../../service/form.service';
import { IdbCrudService } from '../../../service-idb/idb-crud.service';
import { NotificationService } from '../../../service/notification.service';
import { AutoCompleteService } from '../../../service/auto-complete.service';

import { SPOT_CHECK_SAFETY } from './state/spot-check-safety.model';

import { environment } from '../../../../environments/environment';

import { Store } from '@ngxs/store';
import { AuthState } from '../../../state/auth/auth.state';
import { DeviceState } from '../../../state/device/device.state';
import { CommentState } from '../../comment/state/comment.state';

import { SetPics } from '../../../state/device/device-state.actions';
import {
  SetPage,
  SetChildPageLabel,
} from '../../../state/auth/auth-state.actions';

import { SetComments } from '../../comment/state/comment.actions';
import { SetCorrectiveActions } from '../../corrective-action/state/corrective-action.actions';
import { CorrectiveActionState } from '../../corrective-action/state/corrective-action.state';

@Component({
  selector: 'app-spot-check-safety',
  templateUrl: './spot-check-safety.component.html',
  styleUrls: ['./spot-check-safety.component.scss'],
})
export class SpotCheckSafetyComponent implements OnInit {

  pics;
  formData;
  formDataID;
  step = 0;
  isEdit = false;
  isOnline;

  kioske;

  headerForm: FormGroup;
  hazardForm: FormGroup;
  rulesForm: FormGroup;
  incidentForm: FormGroup;
  communicationForm: FormGroup;
  personalEquipmentForm: FormGroup;
  safetyEquipmentForm: FormGroup;
  correctiveActionForm: FormGroup;
  discrepancyForm: FormGroup;

  // messageUrl = environment.messageUrl

  SPOT_CHECK_SAFETY = SPOT_CHECK_SAFETY;

  constructor(
    private store: Store,
    private snackBar: MatSnackBar,
    public appService: AppService,
    private apiService: ApiService,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private idbCrudService: IdbCrudService,
    private autoCompleteService: AutoCompleteService,
    private notificationService: NotificationService
  ) {
    this.headerForm = this.formBuilder.group({
      Date: [null, Validators.required],
      CompanyName: [null, Validators.required],
      EmployeeName: [null, Validators.required],
      Location: [null, Validators.required],
      JobDescription: [null, Validators.required],
    });
    this.hazardForm = this.formBuilder.group({
      InspectionFrequency: [],
      HazardAssessmentSystem: [],
      HazardComments: [],
    });
    this.rulesForm = this.formBuilder.group({
      Procedures: [],
      EmergencyPlan: [],
      RulesComments: [],
    });
    this.incidentForm = this.formBuilder.group({
      IncidentReporting: [],
      NearMissReporting: [],
      ProblemFixed: [],
      SolvingIssues: [],
      IncidentComments: [],
    });
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
      CommunicationComments: [],
    });
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
      PersonalEquipmentComments: [],
    });
    this.safetyEquipmentForm = this.formBuilder.group({
      SafetyEquipmentAvailable: [],
      FireFightingEquipment: [],
      RotatingEquimentGuards: [],
      FirstAidKit: [],
      FallArrestEquipment: [],
      EmergencySystems: [],
      Other: [],
      SafetyEquipmentComments: [],
    });
    this.discrepancyForm = this.formBuilder.group({
      Discrepancy: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.kioske = this.store.selectSnapshot(AuthState.kioske);
    this.isOnline = this.store.selectSnapshot(DeviceState.isOnline);

    this.store.select(AuthState.formData).subscribe((formData) => {
      this.formData = formData;
      if (this.formData && formData['data']) {
        this.isEdit = true;
        this.setFormData(formData['data']);
      }
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  setFormData(data) {
    if (data.header) {
      this.headerForm.controls['Date'].setValue(data.header.Date);
      this.headerForm.controls['CompanyName'].setValue(data.header.CompanyName);
      this.headerForm.controls['EmployeeName'].setValue(
        data.header.EmployeeName
      );
      this.headerForm.controls['Location'].setValue(data.header.Location);
      this.headerForm.controls['JobDescription'].setValue(
        data.header.JobDescription
      );
      this.autoCompleteService.workersControl.setValue(data.header.Worker);
      this.autoCompleteService.supervisorsControl.setValue(
        data.header.Supervisor
      );
    }
    if (data.hazard) {
      this.hazardForm.controls['InspectionFrequency'].setValue(
        data.hazard.InspectionFrequency
      );
      this.hazardForm.controls['HazardAssessmentSystem'].setValue(
        data.hazard.HazardAssessmentSystem
      );
      this.hazardForm.controls['HazardComments'].setValue(
        data.hazard.HazardComments
      );
    }

    if (data.rules) {
      this.rulesForm.controls['Procedures'].setValue(data.rules.Procedures);
      this.rulesForm.controls['EmergencyPlan'].setValue(
        data.rules.EmergencyPlan
      );
      this.rulesForm.controls['RulesComments'].setValue(
        data.rules.RulesComments
      );
    }

    if (data.incident) {
      this.incidentForm.controls['IncidentReporting'].setValue(
        data.incident.IncidentReporting
      );
      this.incidentForm.controls['NearMissReporting'].setValue(
        data.incident.NearMissReporting
      );
      this.incidentForm.controls['ProblemFixed'].setValue(
        data.incident.ProblemFixed
      );
      this.incidentForm.controls['SolvingIssues'].setValue(
        data.incident.SolvingIssues
      );
      this.incidentForm.controls['IncidentComments'].setValue(
        data.incident.IncidentComments
      );
    }

    if (data.communication) {
      this.communicationForm.controls['SafetyOrientation'].setValue(
        data.communication.SafetyOrientation
      );
      this.communicationForm.controls['SafetyMeetingFrequency'].setValue(
        data.communication.SafetyMeetingFrequency
      );
      this.communicationForm.controls['AppropriateTraining'].setValue(
        data.communication.AppropriateTraining
      );
      this.communicationForm.controls['FirstAidTraining'].setValue(
        data.communication.FirstAidTraining
      );
      this.communicationForm.controls['H2STraining'].setValue(
        data.communication.H2STraining
      );
      this.communicationForm.controls['WHMISTraining'].setValue(
        data.communication.WHMISTraining
      );
      this.communicationForm.controls['TDGTraining'].setValue(
        data.communication.TDGTraining
      );
      this.communicationForm.controls['GroundDisturbanceTraining'].setValue(
        data.communication.GroundDisturbanceTraining
      );
      this.communicationForm.controls['EGSOCSOTraining'].setValue(
        data.communication.EGSOCSOTraining
      );
      this.communicationForm.controls['JobSpecificTraining'].setValue(
        data.communication.JobSpecificTraining
      );
      this.communicationForm.controls['CommunicationComments'].setValue(
        data.communication.CommunicationComments
      );
    }

    if (data.personalEquipment) {
      this.personalEquipmentForm.controls['PPEAvailable'].setValue(
        data.personalEquipment.PPEAvailable
      );
      this.personalEquipmentForm.controls['HardHat'].setValue(
        data.personalEquipment.HardHat
      );
      this.personalEquipmentForm.controls['SafetyGlasses'].setValue(
        data.personalEquipment.SafetyGlasses
      );
      this.personalEquipmentForm.controls['Footwear'].setValue(
        data.personalEquipment.Footwear
      );
      this.personalEquipmentForm.controls['ProtectiveClothing'].setValue(
        data.personalEquipment.ProtectiveClothing
      );
      this.personalEquipmentForm.controls['HearingProtection'].setValue(
        data.personalEquipment.HearingProtection
      );
      this.personalEquipmentForm.controls['RespiratoryProtection'].setValue(
        data.personalEquipment.RespiratoryProtection
      );
      this.personalEquipmentForm.controls['PersonalGasMonitor'].setValue(
        data.personalEquipment.PersonalGasMonitor
      );
      this.personalEquipmentForm.controls['CommunicationEquipment'].setValue(
        data.personalEquipment.CommunicationEquipment
      );
      this.personalEquipmentForm.controls['OtherEquipment'].setValue(
        data.personalEquipment.OtherEquipment
      );
      this.personalEquipmentForm.controls['PersonalEquipmentComments'].setValue(
        data.personalEquipment.PersonalEquipmentComments
      );
    }

    if (data.safetyEquipment) {
      this.safetyEquipmentForm.controls['SafetyEquipmentAvailable'].setValue(
        data.safetyEquipment.SafetyEquipmentAvailable
      );
      this.safetyEquipmentForm.controls['FireFightingEquipment'].setValue(
        data.safetyEquipment.FireFightingEquipment
      );
      this.safetyEquipmentForm.controls['RotatingEquimentGuards'].setValue(
        data.safetyEquipment.RotatingEquimentGuards
      );
      this.safetyEquipmentForm.controls['FirstAidKit'].setValue(
        data.safetyEquipment.FirstAidKit
      );
      this.safetyEquipmentForm.controls['FallArrestEquipment'].setValue(
        data.safetyEquipment.FallArrestEquipment
      );
      this.safetyEquipmentForm.controls['EmergencySystems'].setValue(
        data.safetyEquipment.EmergencySystems
      );
      this.safetyEquipmentForm.controls['Other'].setValue(
        data.safetyEquipment.Other
      );
      this.safetyEquipmentForm.controls['SafetyEquipmentComments'].setValue(
        data.safetyEquipment.SafetyEquipmentComments
      );
    }

    if (data.comments) {
      this.store.dispatch(new SetComments(data.comments));
    }

    if (data.correctiveActions) {
      this.store.dispatch(new SetCorrectiveActions(data.correctiveActions));
    }
  }

  updateForm() {
    const form = this.store.selectSnapshot(AuthState.selectedForm);

    let header = this.headerForm.value;
    header.Worker = this.autoCompleteService.workersControl.value;
    header.Supervisor = this.autoCompleteService.supervisorsControl.value;

    let data = {
      header: header,
      hazard: this.hazardForm.value,
      rules: this.rulesForm.value,
      incident: this.incidentForm.value,
      communication: this.communicationForm.value,
      personalEquipment: this.personalEquipmentForm.value,
      safetyEquipment: this.safetyEquipmentForm.value,
      discrepancyComments: this.discrepancyForm.value,
      comments: this.store.selectSnapshot(CommentState.comments),
      correctiveActions: this.store.selectSnapshot(
        CorrectiveActionState.correctiveActions
      ),
    };

    this.formService.updateForm(form, this.formData, data).subscribe((_) => {
      this.resetForm();
    });

  }

  submitForm() {
    const user = this.store.selectSnapshot(AuthState.user);
    const form = this.store.selectSnapshot(AuthState.selectedForm);

    let userCreated = {
      email: user.email,
      date_created: this.appService.now,
    };

    let header = this.headerForm.value;
    header.Worker = this.autoCompleteService.workersControl.value;
    header.Supervisor = this.autoCompleteService.supervisorsControl.value;

    let data = {
      header: header,
      hazard: this.hazardForm.value,
      rules: this.rulesForm.value,
      incident: this.incidentForm.value,
      communication: this.communicationForm.value,
      personalEquipment: this.personalEquipmentForm.value,
      safetyEquipment: this.safetyEquipmentForm.value,
      discrepancyComments: this.discrepancyForm.value,
      comments: this.store.selectSnapshot(CommentState.comments),
      correctiveActions: this.store.selectSnapshot(
        CorrectiveActionState.correctiveActions
      ),
    };

    let obj = {
      data: JSON.stringify(data),
      user: userCreated,
      form: form,
      type: 'custom',
      name: form['name'],
      date: this.appService.now,
      pics: this.store.selectSnapshot(DeviceState.pics),
      location: data.header.Location,
      correctiveActions: this.store.selectSnapshot(
        CorrectiveActionState.correctiveActions
      ),
    };

    let message = 'No discrepancies.';
    if (data.comments.length > 0)
      message = `Number of Discrepancies: ${data.comments.length}`;

    if (!this.isOnline) {
      let notificationObj = {
        name: form['name'],
        worker: this.appService.getWorker(header.Worker),
        supervisor: this.appService.getSupervisor(header.Supervisor),
        description: 'Spot Check Safety, ' + _moment().format('MMM D, h:mA'),
        message:
          'Spot Check Safety completed for ' +
          this.headerForm.controls['CompanyName'].value +
          ', ' +
          this.headerForm.controls['Location'].value +
          ' ' +
          message,
        subject:
          'New Spot Check Safety from ' +
          header.Worker +
          ', ' +
          this.appService.now,
        form_id: form['form_id'],
        data_id: this.formDataID,
        pdf: 'spot-check-safety' + this.formDataID,
      };

      obj['notification'] = notificationObj;
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
          const worker: any = this.appService.getWorker(header.Worker);
          const supervisor: any = this.appService.getSupervisor(
            header.Supervisor
          );

          let notificationObj = {
            name: form['name'],
            worker: worker,
            supervisor: supervisor,
            description:
              'Spot Check Safety, ' + _moment().format('MMM D, h:mA'),
            message:
              'Spot Check Safety completed for ' +
              this.headerForm.controls['CompanyName'].value +
              ', ' +
              this.headerForm.controls['Location'].value + 
              ' ' +
              message,
            subject:
              'New Spot Check Safety from ' +
              header.Worker +
              ', ' +
              this.appService.now,
            form_id: form['form_id'],
            data_id: this.formDataID,
            pdf: 'spot-check-safety' + this.formDataID,
          };
          this.appService.sendNotification(notificationObj);
          this.resetForm();
        }
      });
    }
  }

  setNotificationObj(header, form) {
    this.notificationObj = {
      name: form["name"],
      worker: this.appService.getWorker(header.Worker),
      supervisor: this.appService.getSupervisor(header.Supervisor),
      description: 'Spot Check Safety, ' + _moment().format('MMM D, h:mA'),
      message: 'Spot Check Safety completed for ' + this.headerForm.controls['CompanyName'].value + ', ' + this.headerForm.controls['Location'].value,
      subject: 'New Spot Check Safety from ' + header.Worker + ', ' + this.appService.now,
      form_id: form["form_id"],
      data_id: this.formDataID,
      pdf: 'spot-check-safety' + this.formDataID
    }
  }

  resetForm() {
    this.headerForm.reset();
    this.hazardForm.reset();
    this.rulesForm.reset();
    this.incidentForm.reset();
    this.communicationForm.reset();
    this.personalEquipmentForm.reset();
    this.safetyEquipmentForm.reset();
    this.store.dispatch(new SetPics([]));
    this.autoCompleteService.workersControl.reset();
    this.autoCompleteService.supervisorsControl.reset();
  }
}
