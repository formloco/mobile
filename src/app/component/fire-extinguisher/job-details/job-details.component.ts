import { Component, Input, ViewChild, ChangeDetectionStrategy, OnChanges } from '@angular/core'

import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay'
import { TemplatePortalDirective, ComponentPortal } from '@angular/cdk/portal'

import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms"

import { AppService } from "../../../service/app.service"
import { StateService } from "../../../service/state.service"

import { AppState } from "../../../model/state"

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsComponent implements OnChanges{

  @Input() jobDetailForm
  @Input() history
  @Input() state: AppState

  @ViewChild('overlayTemplate') overlayTemplate: TemplatePortalDirective

  overlayRef: OverlayRef

  panelOpenState: boolean = false
  selectedIndex = 0

  myInnerWidth = window.innerWidth

  constructor(
    private overlay: Overlay,
    public appService: AppService,
    private formBuilder: FormBuilder,
    public stateService: StateService) {

  }

  ngOnChanges(): void {
    if (this.history !== undefined)
      this.appService.details = [...this.appService.details, this.history]
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value
  }

  openTemplateOverlay() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .width(this.myInnerWidth.toString())
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      positionStrategy,
    });

    overlayConfig.hasBackdrop = true;

    this.overlayRef = this.overlay.create(overlayConfig);

    this.overlayRef.backdropClick().subscribe(() => {
      this.overlayRef.dispose();
    });

    this.overlayRef.attach(this.overlayTemplate);
  }

  save() {
    this.appService.details = [...this.appService.details, this.jobDetailForm.value]
    this.overlayRef.dispose()
    this.jobDetailForm.reset()
  }

  close() {
    this.overlayRef.dispose();
  }

  edit(idx, job) {
    this.jobDetailForm.patchValue({
      floor: job.floor,
      location: job.location,
      make: job.make,
      nextHST: job.nextHST,
      remarks: job.remarks,
      serialNumber: job.serialNumber,
      sixYear: job.sixYear,
      size: job.size,
      workPerformed: job.workPerformed
    })
    this.openTemplateOverlay()
  }

  panelOpened() {
    this.panelOpenState = true
  }

}
