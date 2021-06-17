import { Component, OnInit, Input } from '@angular/core'

import { AppState } from "../../model/state"

import { AppService } from "../../service/app.service"
import { AuthService } from "../../service/auth.service"
import { DataService } from "../../service/data.service"
import { IdbCrudService } from "../../service-idb/idb-crud.service"

import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from "@angular/forms"
import { MatSnackBar } from '@angular/material/snack-bar'

import { VEHICLE_INSPECTION } from '../../model/forms'

@Component({
  selector: 'app-vehicle-inspection',
  templateUrl: './vehicle-inspection.component.html',
  styleUrls: ['./vehicle-inspection.component.scss']
})
export class VehicleInspectionComponent implements OnInit {

  @Input() state: AppState

  step = 0

  history = []

  headerForm: FormGroup
  detailForm: FormGroup
  discrepancyForm: FormGroup

  myInnerWidth = window.innerWidth

  VEHICLE_INSPECTION = VEHICLE_INSPECTION

  isPanelOpen = false

  constructor(
    public appService: AppService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dataService: DataService,
    private _snackBar: MatSnackBar,
    private idbCrudService: IdbCrudService) { 
      this.headerForm = this.formBuilder.group({
        Date: [''],
        Worker: [''],
        Supervisor: [''],
        Stakeholder: [''],
        Division: [''],
        Mileage: [''],
        RegistrationDate: ['']
      })
      this.detailForm = this.formBuilder.group({
        IgnitionKey: [false],
        IgnitionKeyComments: [''],
        OilLevel: [false],
        OilLevelComments: [''],
        WasherFluidLevel: [false],
        WasherFluidLevelComments: [''],
        CoolantLevel: [false],
        CoolantLevelComments: [''],
        PowerSteeringFluidLevel: [false],
        PowerSteeringFluidLevelComments: [''],
        AirGauge: [false],
        AirGaugeComments: [''],
        Horn: [false],
        HornComments: [''],
        HeaterDefroster: [false],
        HeaterDefrosterComments: [''],
        WindshieldWipersWashers: [false],
        WindshieldWipersWashersComments: [],
        AllSignalLights: [false],
        AllSignalLightsComments: [],
        InteriorLights: [false],
        InteriorLightsComments: [],
        MirrorsDamageAdjustments: [false],
        MirrorsDamageAdjustmentsComments: [],
        WindshieldVisibility: [false],
        WindshieldVisibilityComments: [],
        VisualInspectionExterior: [false],
        VisualInspectionExteriorComments: [],
        InsideEngineCompartment: [false],
        InsideEngineCompartmentComments: [],
        TransmissionFluidLevel: [false],
        TransmissionFluidLevelComments: [],
        HighlightSignal4wayTailBackup: [false],
        HighlightSignal4wayTailBackupComments: [''],
        FuelLevel: [false],
        FuelLevelComments: [''],
        FirstAidKit: [false],
        FirstAidKitComments: [''],
        FireExtinguisher: [false],
        FireExtinguisherComments: [''],
        SurvivalKit: [false],
        SurvivalKitComments: [''],
        FuelKey: [false],
        FuelKeyComments: [''],
        TwoWayRadio: [false],
        TwoWayRadioComments: [''],
        Tires: [false],
        TiresComments: ['']
      })
      this.discrepancyForm = this.formBuilder.group({
        Discrepancy: ['']
      })
    }

  ngOnInit(): void {
    console.log(this.myInnerWidth)
  }

  setStep(index: number) {
    this.step = index;
  }

  detailStep() {
    this.appService.currentDetailForm = this.detailForm.value
    this.step++
  }

  nextStep() {
    this.step++
  }

  prevStep() {
    this.step--
  }

  submitForm() {
    let dataObj = []

    let userCreated = { name: this.appService.user.name, fingerprint: this.appService.user.userID, date_created: new Date() }

    let data = {
      header: this.headerForm.value,
      detail: this.detailForm.value,
      discrepancy: this.discrepancyForm.value
    }

    dataObj.push(null)
    dataObj.push(JSON.stringify(userCreated))
    dataObj.push(new Date())
    dataObj.push(new Date())
    dataObj.push(JSON.stringify(data))

    this.VEHICLE_INSPECTION["form_id"] = this.state.selectedForm["form_id"]
    this.VEHICLE_INSPECTION["is_published"] = true
    this.VEHICLE_INSPECTION["is_data"] = true

    let obj = {
      data: dataObj,
      columns: this.VEHICLE_INSPECTION["columns"],
      user: this.state.tenant,
      formObj: this.VEHICLE_INSPECTION
    }

    this.dataService.save(obj).subscribe(data => {
      this.headerForm.reset()
      this.detailForm.reset()
      this.discrepancyForm.reset()
      this.state.page = 'home'
      this.state.childPageLabel = 'Mobile Forms'
      this._snackBar.open("Form Submitted!", 'Success', {
        duration: 3000,
        verticalPosition: 'bottom'
      })
    })
  }
}
