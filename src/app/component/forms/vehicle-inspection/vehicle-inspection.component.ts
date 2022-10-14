import { Component, OnInit } from '@angular/core';
import * as _moment from 'moment';

import { Observable } from 'rxjs';
import { AppService } from '../../../service/app.service';
import { ApiService } from '../../../service/api.service';
import { FormService } from '../../../service/form.service';
import { IdbCrudService } from '../../../service-idb/idb-crud.service';

import { AutoCompleteService } from '../../../service/auto-complete.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { environment } from '../../../../environments/environment';

import { Store, Select } from '@ngxs/store';
import { AuthState } from '../../../state/auth/auth.state';
import { DeviceState } from '../../../state/device/device.state';

import { VehicleInspectionState } from './state/vehicle-inspection.state';
import { SetIsHeaderValid } from './state/vehicle-inspection-state.actions';
import {
  VEHICLE_INSPECTION,
  LABEL,
} from './state/vehicle-inspection-state.model';

import { SetPics } from '../../../state/device/device-state.actions';
import {
  SetPage,
  SetChildPageLabel,
} from '../../../state/auth/auth-state.actions';

import { CommentState } from '../../comment/state/comment.state';
import { SetLabel, SetComments } from '../../comment/state/comment.actions';

import { CorrectiveActionState } from '../../corrective-action/state/corrective-action.state';
import { SetCorrectiveActions } from '../../corrective-action/state/corrective-action.actions';
@Component({
  selector: 'app-vehicle-inspection',
  templateUrl: './vehicle-inspection.component.html',
  styleUrls: ['./vehicle-inspection.component.scss'],
})
export class VehicleInspectionComponent implements OnInit {
  @Select(VehicleInspectionState.isHeaderValid)
  isHeaderValid$: Observable<boolean>;

  pics;
  isEdit = false;
  isOnline;
  formData;
  formDataID;
  step = 0;
  history = [];
  lookupLists;
  kioske;
  notificationObj
  
  headerForm: FormGroup;
  detailForm: FormGroup;
  correctiveActionForm: FormGroup
  discrepancyForm: FormGroup

  VEHICLE_INSPECTION = VEHICLE_INSPECTION;

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
    public autoCompleteService: AutoCompleteService
  ) {
    this.headerForm = this.formBuilder.group({
      Date: [],
      Worker: [],
      Supervisor: [],
      Stakeholder: [],
      Division: [],
      Mileage: [],
      LicensePlate: [],
      UnitNumber: [],
      Make: [],
      Model: [],
      Year: [],
      RegistrationDate: [],
      CurrentRegistrationInVehicle: [],
      CurrentInsuranceInVehicle: [],
    });
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
      SpillKitComments: [],
    });
    this.discrepancyForm = this.formBuilder.group({
      Discrepancy: [null, Validators.required]
    })
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
      else this.store.dispatch(new SetIsHeaderValid(true))
    });
  }

  setStep(index: number) {
    this.step = index;
  }

  detailStep() {
    this.appService.currentDetailForm = this.detailForm.value;
    this.step++;
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
      this.headerForm.controls['Worker'].setValue(data.header.Worker);
      this.headerForm.controls['Supervisor'].setValue(data.header.Supervisor);
      this.headerForm.controls['Stakeholder'].setValue(data.header.Stakeholder);
      this.headerForm.controls['Division'].setValue(data.header.Division);
      this.headerForm.controls['Mileage'].setValue(data.header.Mileage);
      this.headerForm.controls['LicensePlate'].setValue(
        data.header.LicensePlate
      );
      this.headerForm.controls['UnitNumber'].setValue(data.header.UnitNumber);
      this.autoCompleteService.makesControl.setValue(data.header.Make);
      this.autoCompleteService.modelsControl.setValue(data.header.Model);
      this.headerForm.controls['Year'].setValue(data.header.Year);
      this.headerForm.controls['CurrentRegistrationInVehicle'].setValue(
        data.header.CurrentRegistrationInVehicle
      );
      this.headerForm.controls['CurrentInsuranceInVehicle'].setValue(
        data.header.CurrentInsuranceInVehicle
      );
      this.headerForm.controls['RegistrationDate'].setValue(
        data.header.RegistrationDate
      );
      this.autoCompleteService.workersControl.setValue(data.header.Worker);
      this.autoCompleteService.supervisorsControl.setValue(
        data.header.Supervisor
      );
    }

    if (data.detail) {
      this.detailForm.controls['IgnitionKey'].setValue(data.detail.IgnitionKey);
      this.detailForm.controls['IgnitionKeyComments'].setValue(
        data.detail.IgnitionKeyComments
      );
      this.detailForm.controls['OilLevel'].setValue(data.detail.OilLevel);
      this.detailForm.controls['OilLevelComments'].setValue(
        data.detail.OilLevelComments
      );
      this.detailForm.controls['WasherFluidLevel'].setValue(
        data.detail.WasherFluidLevel
      );
      this.detailForm.controls['WasherFluidLevelComments'].setValue(
        data.detail.WasherFluidLevelComments
      );
      this.detailForm.controls['CoolantLevel'].setValue(
        data.detail.CoolantLevel
      );
      this.detailForm.controls['CoolantLevelComments'].setValue(
        data.detail.CoolantLevelComments
      );
      this.detailForm.controls['PowerSteeringFluidLevel'].setValue(
        data.detail.PowerSteeringFluidLevel
      );
      this.detailForm.controls['PowerSteeringFluidLevelComments'].setValue(
        data.detail.PowerSteeringFluidLevelComments
      );
      this.detailForm.controls['AirGauge'].setValue(data.detail.AirGauge);
      this.detailForm.controls['AirGaugeComments'].setValue(
        data.detail.AirGaugeComments
      );
      this.detailForm.controls['Horn'].setValue(data.detail.Horn);
      this.detailForm.controls['HornComments'].setValue(
        data.detail.HornComments
      );
      this.detailForm.controls['HeaterDefroster'].setValue(
        data.detail.HeaterDefroster
      );
      this.detailForm.controls['HeaterDefrosterComments'].setValue(
        data.detail.HeaterDefrosterComments
      );
      this.detailForm.controls['WindshieldWipersWashers'].setValue(
        data.detail.WindshieldWipersWashers
      );
      this.detailForm.controls['WindshieldWipersWashersComments'].setValue(
        data.detail.WindshieldWipersWashersComments
      );
      this.detailForm.controls['AllSignalLights'].setValue(
        data.detail.AllSignalLights
      );
      this.detailForm.controls['AllSignalLightsComments'].setValue(
        data.detail.AllSignalLightsComments
      );
      this.detailForm.controls['InteriorLights'].setValue(
        data.detail.InteriorLights
      );
      this.detailForm.controls['InteriorLightsComments'].setValue(
        data.detail.InteriorLightsComments
      );
      this.detailForm.controls['MirrorsDamageAdjustments'].setValue(
        data.detail.MirrorsDamageAdjustments
      );
      this.detailForm.controls['MirrorsDamageAdjustmentsComments'].setValue(
        data.detail.MirrorsDamageAdjustmentsComments
      );
      this.detailForm.controls['WindshieldVisibility'].setValue(
        data.detail.WindshieldVisibility
      );
      this.detailForm.controls['WindshieldVisibilityComments'].setValue(
        data.detail.WindshieldVisibilityComments
      );
      this.detailForm.controls['VisualInspectionExterior'].setValue(
        data.detail.VisualInspectionExterior
      );
      this.detailForm.controls['VisualInspectionExteriorComments'].setValue(
        data.detail.VisualInspectionExteriorComments
      );
      this.detailForm.controls['InsideEngineCompartment'].setValue(
        data.detail.InsideEngineCompartment
      );
      this.detailForm.controls['InsideEngineCompartmentComments'].setValue(
        data.detail.InsideEngineCompartmentComments
      );
      this.detailForm.controls['TransmissionFluidLevel'].setValue(
        data.detail.TransmissionFluidLevel
      );
      this.detailForm.controls['TransmissionFluidLevelComments'].setValue(
        data.detail.TransmissionFluidLevelComments
      );
      this.detailForm.controls['HighlightSignal4wayTailBackup'].setValue(
        data.detail.HighlightSignal4wayTailBackup
      );
      this.detailForm.controls['FuelLevel'].setValue(data.detail.FuelLevel);
      this.detailForm.controls['FuelLevelComments'].setValue(
        data.detail.FuelLevelComments
      );
      this.detailForm.controls['FirstAidKit'].setValue(data.detail.FirstAidKit);
      this.detailForm.controls['FirstAidKitComments'].setValue(
        data.detail.FirstAidKitComments
      );
      this.detailForm.controls['FireExtinguisher'].setValue(
        data.detail.FireExtinguisher
      );
      this.detailForm.controls['FireExtinguisherComments'].setValue(
        data.detail.FireExtinguisherComments
      );
      this.detailForm.controls['SurvivalKit'].setValue(data.detail.SurvivalKit);
      this.detailForm.controls['SurvivalKitComments'].setValue(
        data.detail.SurvivalKitComments
      );
      this.detailForm.controls['FuelKey'].setValue(data.detail.FuelKey);
      this.detailForm.controls['FuelKeyComments'].setValue(
        data.detail.FuelKeyComments
      );
      this.detailForm.controls['TwoWayRadio'].setValue(data.detail.TwoWayRadio);
      this.detailForm.controls['TwoWayRadioComments'].setValue(
        data.detail.TwoWayRadioComments
      );
      this.detailForm.controls['Tires'].setValue(data.detail.Tires);
      this.detailForm.controls['TiresComments'].setValue(
        data.detail.TiresComments
      );
      this.detailForm.controls['SpillKit'].setValue(data.detail.SpillKit);
      this.detailForm.controls['SpillKitComments'].setValue(
        data.detail.SpillKitComments
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
    header.Make = this.autoCompleteService.makesControl.value;
    header.Model = this.autoCompleteService.modelsControl.value;
    header.Worker = this.autoCompleteService.workersControl.value;
    header.Supervisor = this.autoCompleteService.supervisorsControl.value;

    let data = {
      header: header,
      detail: this.detailForm.value,
      comments: this.store.selectSnapshot(CommentState.comments),
      correctiveActions: this.store.selectSnapshot(CorrectiveActionState.correctiveActions),
    };

    this.formService.updateForm(form, this.formData, data).subscribe((_) => {
      this.appService.sendEmail()
      this.resetForm();
    });
  }

  submitForm() {
    const user = this.store.selectSnapshot(AuthState.user);
    const form = this.store.selectSnapshot(AuthState.selectedForm);
    const comments = this.store.selectSnapshot(CommentState.comments);

    let userCreated = {
      email: user.email,
      date_created: this.appService.now,
    };

    let header = this.headerForm.value;
    header.Make = this.autoCompleteService.makesControl.value;
    header.Model = this.autoCompleteService.modelsControl.value;
    header.Worker = this.autoCompleteService.workersControl.value;
    header.Supervisor = this.autoCompleteService.supervisorsControl.value;

    let data = {
      header: header,
      detail: this.detailForm.value,
      comments: this.store.selectSnapshot(CommentState.comments),
      correctiveActions: this.store.selectSnapshot(
        CorrectiveActionState.correctiveActions)
    };

    let obj = {
      data: JSON.stringify(data),
      user: userCreated,
      form: form,
      type: 'custom',
      name: form['name'],
      date: this.appService.now,
      pics: this.store.selectSnapshot(DeviceState.pics),
      correctiveActions: this.store.selectSnapshot(CorrectiveActionState.correctiveActions)
    };
    if (!this.isOnline) {
      this.setNotificationObj(header, form)
      obj['notification'] = this.notificationObj
      this.idbCrudService.put('data', obj)
    }
    else {
      this.apiService.save(obj).subscribe((idObj) => {
        this.formDataID = idObj;

        const workers: any = this.store.selectSnapshot(AuthState.workers);
        const supervisors: any = this.store.selectSnapshot(AuthState.supervisors);

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

          let message = 'No discrepancies.';
          if (comments.length > 0) message = `${comments.length} Discrepancies Exist.`;

          this.setNotificationObj(header, form)
          this.appService.createNotification(this.notificationObj);
          this.resetForm();
        }
      })
    }
  }
  
  obj['notification'] = notificationObj
  this.idbCrudService.put('data', obj)
}
else
{    this.apiService.save(obj).subscribe((idObj) => {
      this.formDataID = idObj;

      const workers: any = this.store.selectSnapshot(AuthState.workers);
      const supervisors: any = this.store.selectSnapshot(AuthState.supervisors);

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

        let message = 'No discrepancies.';
        if (comments.length > 0) message = `Number of Discrepancies: ${comments.length}`;

        let notificationObj = {
          name: form['name'],
          worker: worker,
          supervisor: supervisor,
          description: 'Vehicle Inspection, ' + _moment().format('MMM D, h:mA'),
          subject:
            'New Vehicle Inspection from ' +
            header.Worker +
            ', ' +
            this.appService.now,
          message: 'Worksite Safety Inspection completed for Unit #: ' + header.UnitNumber + '. ' + message,
          form_id: form['form_id'],
          data_id: this.formDataID,
          pdf: 'vehicle-inspection' + this.formDataID,
        };
        this.appService.sendNotification(notificationObj);
        this.resetForm();
      }
    })}

  }

  checkValidHeader() {
    const header = this.headerForm.value;
    if (
      header.Date != null &&
      this.autoCompleteService.workersControl.value != null &&
      this.autoCompleteService.supervisorsControl.value != null &&
      this.autoCompleteService.makesControl.value != null &&
      this.autoCompleteService.modelsControl.value != null &&
      header.Stakeholder != null &&
      header.Division != null &&
      header.Mileage != null &&
      header.Year != null &&
      header.RegistrationDate != null
    ) {
      this.store.dispatch(new SetLabel(LABEL));
      this.store.dispatch(new SetIsHeaderValid(true));
    }
  }

  resetForm() {
    this.headerForm.reset();
    this.detailForm.reset();
    this.store.dispatch(new SetPics([]));
    this.autoCompleteService.workersControl.reset();
    this.autoCompleteService.supervisorsControl.reset();
    this.autoCompleteService.makesControl.reset();
    this.autoCompleteService.modelsControl.reset();
    this.autoCompleteService.workersControl.reset();
    this.autoCompleteService.supervisorsControl.reset();
  }
}
