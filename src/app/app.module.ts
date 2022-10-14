import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, APP_INITIALIZER } from '@angular/core'

import { IonicModule } from '@ionic/angular'
import { NgxEchartsModule } from 'ngx-echarts'

import { environment } from '../environments/environment'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpConfig } from './interceptor/httpconfig.interceptor'

import { MaterialModule } from "./material/material.module"

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'

import { PipeModule } from './pipe/pipe.module'

import { Device } from '@ionic-native/device/ngx'

// pwa
import { ServiceWorkerModule } from '@angular/service-worker'

// state management
import { NgxsModule } from '@ngxs/store'
import { States } from './state/app.state'

// third party libraries
import { QuillModule } from "ngx-quill"
import { NgxBarcode6Module } from 'ngx-barcode6'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode'
import { WebcamModule } from 'ngx-webcam'

// pics
import { PicsComponent } from './component/pics/pics.component'
import { CameraComponent } from './component/camera/camera.component'
import { PicDeleteComponent } from './component/pic-delete/pic-delete.component'

// voice
import { VoiceComponent } from './component/voice/voice.component'
import { CommentComponent } from './component/comment/comment.component'

// admin
import { PinComponent } from './component/admin/pin/pin.component'
import { AdminComponent } from './component/admin/admin.component'
import { SdkComponent } from './component/admin/sdk/sdk.component'
import { DataComponent } from './component/admin/data/data.component'
import { MenuComponent } from './component/admin/menu/menu.component'
import { FormsComponent } from './component/admin/forms/forms.component'
import { KioskeComponent } from './component/admin/kioske/kioske.component'
import { SignupComponent } from './component/admin/signup/signup.component'
import { ProfileComponent } from './component/admin/profile/profile.component'
import { ListRunComponent } from './component/admin/list-run/list-run.component'
import { SettingsComponent } from './component/admin/settings/settings.component'
import { ListEditComponent } from './component/admin/list-edit/list-edit.component'
import { EmailEditComponent } from './component/admin/email-edit/email-edit.component'
import { EmailListComponent } from './component/admin/email-list/email-list.component'
import { FormListsComponent } from './component/admin/form-lists/form-lists.component'
import { DataFormsComponent } from './component/admin/data-forms/data-forms.component'
import { IdentificationComponent } from './component/admin/identification/identification.component'

// form, home, shared
import { FormComponent } from './component/form/form.component'
import { HomeComponent } from './component/home/home.component'
import { SignOffComponent } from './component/sign-off/sign-off.component'
import { DiscrepancyComponent } from './component/discrepancy/discrepancy.component'
import { BottomSheetCommentComponent } from './component/comment/bottom-sheet-comment/bottom-sheet-comment.component'
import { CorrectiveActionComponent } from './component/corrective-action/corrective-action.component'

// vehicle-inspection
import { DetailComponent } from './component/forms/vehicle-inspection/detail/detail.component'
import { HeaderComponent } from './component/forms/vehicle-inspection/header/header.component'
import { VehicleInspectionComponent } from './component/forms/vehicle-inspection/vehicle-inspection.component'
import { DetailCommentsComponent } from './component/forms/vehicle-inspection/detail-comments/detail-comments.component'

// worksite-safety-inspection
import { WorksiteSafetyInspectionComponent } from './component/forms/worksite-safety-inspection/worksite-safety-inspection.component'
import { WorksiteSafetyHeaderComponent } from './component/forms/worksite-safety-inspection/worksite-safety-header/worksite-safety-header.component'
import { WorksiteSafetyHazardComponent } from './component/forms/worksite-safety-inspection/worksite-safety-hazard/worksite-safety-hazard.component'
import { WorksiteSafetyGroundComponent } from './component/forms/worksite-safety-inspection/worksite-safety-ground/worksite-safety-ground.component'
import { WorksiteSafetyJobsiteComponent } from './component/forms/worksite-safety-inspection/worksite-safety-jobsite/worksite-safety-jobsite.component'
import { WorksiteSafetyEquipmentComponent } from './component/forms/worksite-safety-inspection/worksite-safety-equipment/worksite-safety-equipment.component'
import { WorksiteSafetyErpPlanningComponent } from './component/forms/worksite-safety-inspection/worksite-safety-erp-planning/worksite-safety-erp-planning.component'
import { WorksiteFireExtinguisherComponent } from './component/forms/worksite-safety-inspection/worksite-fire-extinguisher/worksite-fire-extinguisher.component'
import { WorksiteSafetyConfinedSpaceComponent } from './component/forms/worksite-safety-inspection/worksite-safety-confined-space/worksite-safety-confined-space.component'
import { WorksiteSafetyHotWorkComponent } from './component/forms/worksite-safety-inspection/worksite-safety-hot-work/worksite-safety-hot-work.component'
import { BottomSheetWorksiteSafetyInspectionComponent } from './component/forms/worksite-safety-inspection/bottom-sheet-worksite-safety-inspection/bottom-sheet-worksite-safety-inspection.component'
import { WorksiteKeyPositiveFindingComponent } from './component/forms/worksite-safety-inspection/worksite-key-positive-finding/worksite-key-positive-finding.component'

//spot check safety
import { SpotCheckSafetyComponent } from './component/forms/spot-check-safety/spot-check-safety.component'
import { HazardIdentificationControlComponent } from './component/forms/spot-check-safety/hazard-identification-control/hazard-identification-control.component'
import { RulesWorkProceduresComponent } from './component/forms/spot-check-safety/rules-work-procedures/rules-work-procedures.component'
import { IncidentReportingComponent } from './component/forms/spot-check-safety/incident-reporting/incident-reporting.component'
import { CommunicationTrainingComponent } from './component/forms/spot-check-safety/communication-training/communication-training.component'
import { PersonalProtectiveEquipmentComponent } from './component/forms/spot-check-safety/personal-protective-equipment/personal-protective-equipment.component'
import { SafetyEquipmentComponent } from './component/forms/spot-check-safety/safety-equipment/safety-equipment.component'
import { CorrectiveActionsComponent } from './component/forms/spot-check-safety/corrective-actions/corrective-actions.component'
import { SpotCheckSafetyHeaderComponent } from './component/forms/spot-check-safety/spot-check-safety-header/spot-check-safety-header.component'

// json rendering components
import { RunComponent } from './component/run/run.component'
import { GpsRunComponent } from './component/run-controls/gps-run/gps-run.component'
import { LabelRunComponent } from './component/run-controls/label-run/label-run.component'
import { RadioRunComponent } from './component/run-controls/radio-run/radio-run.component'
import { SliderRunComponent } from './component/run-controls/slider-run/slider-run.component'
import { ToggleRunComponent } from './component/run-controls/toggle-run/toggle-run.component'
import { TextboxRunComponent } from './component/run-controls/textbox-run/textbox-run.component'
import { QuillRunComponent } from './component/run-controls/quill-run/quill-run.component'
import { CheckboxRunComponent } from './component/run-controls/checkbox-run/checkbox-run.component'
import { SelectRunComponent } from './component/run-controls/select-run/select-run.component'
import { TextareaRunComponent } from './component/run-controls/textarea-run/textarea-run.component'
import { FileuploadRunComponent } from './component/run-controls/fileupload-run/fileupload-run.component'
import { QrcodeRunComponent } from './component/run-controls/qrcode-run/qrcode-run.component'
import { BarcodeRunComponent } from './component/run-controls/barcode-run/barcode-run.component'
import { ScannerBarcodeRunComponent } from './component/run-controls/scanner-barcode-run/scanner-barcode-run.component'
import { ScannerQrcodeRunComponent } from './component/run-controls/scanner-qrcode-run/scanner-qrcode-run.component'

//indexedDB
import { IdbPersistenceService } from './service-idb/idb-persistence.service'

// notifications
import { NotificationComponent } from './component/notification/notification.component'
import { NotificationOpenComponent } from './component/notification/notification-open/notification-open.component'
import { NotificationSignedComponent } from './component/notification/notification-signed/notification-signed.component'
import { NotificationActionComponent } from './component/notification/notification-action/notification-action.component'
import { ResetPasswordComponent } from './component/admin/reset-password/reset-password.component'
import { LayoutComponent } from './component/layout/layout.component'
import { SendPasswordComponent } from './component/admin/send-password/send-password.component'
import { LayoutAdminComponent } from './component/layout-admin/layout-admin.component'
import { ListFormsComponent } from './component/admin/list-forms/list-forms.component'
import { LabelsComponent } from './component/admin/labels/labels.component'
import { LabelComponent } from './component/admin/label/label.component'

// meaningful site tour
import { MeaningfulSiteTourComponent } from './component/forms/meaningful-site-tour/meaningful-site-tour.component'
import { MeaningfulSiteTourHeaderComponent } from './component/forms/meaningful-site-tour/meaningful-site-tour-header/meaningful-site-tour-header.component'
import { MeaningfulSiteTourNotesComponent } from './component/forms/meaningful-site-tour/meaningful-site-tour-notes/meaningful-site-tour-notes.component'
import { MeaningfulSiteTourSuggestionsComponent } from './component/forms/meaningful-site-tour/meaningful-site-tour-suggestions/meaningful-site-tour-suggestions.component'
import { MeaningfulSiteTourTodoComponent } from './component/forms/meaningful-site-tour/meaningful-site-tour-todo/meaningful-site-tour-todo.component'

// kioske pages
import { PricingComponent } from './component/pricing/pricing.component'
import { WhyusComponent } from './component/whyus/whyus.component'
import { ContactComponent } from './component/contact/contact.component'
import { TermsComponent } from './component/terms/terms.component'
import { SigninComponent } from './component/admin/signin/signin.component'
import { SignupBottomComponent } from './component/admin/signup-bottom/signup-bottom.component';
import { DashboardComponent } from './component/admin/dashboard/dashboard.component'
@NgModule({
  declarations: [
    AppComponent,
    PinComponent,
    FormComponent,
    HomeComponent,
    DataComponent,
    MenuComponent,
    AdminComponent,
    SignOffComponent,
    SettingsComponent,
    FormListsComponent,
    DataFormsComponent,
    IdentificationComponent,
    RunComponent,
    GpsRunComponent,
    ListRunComponent,
    LabelRunComponent,
    RadioRunComponent,
    SliderRunComponent,
    ToggleRunComponent,
    TextboxRunComponent,
    QuillRunComponent,
    CheckboxRunComponent,
    SelectRunComponent,
    TextareaRunComponent,
    FileuploadRunComponent,
    QrcodeRunComponent,
    BarcodeRunComponent,
    ScannerBarcodeRunComponent,
    ScannerQrcodeRunComponent,
    DetailComponent,
    HeaderComponent,
    DiscrepancyComponent ,
    VehicleInspectionComponent,
    PicsComponent,
    DetailCommentsComponent,
    CameraComponent,
    PicDeleteComponent,
    FormsComponent,
    EmailListComponent,
    ListEditComponent,
    EmailEditComponent,
    NotificationComponent,
    NotificationOpenComponent,
    NotificationSignedComponent,
    NotificationActionComponent,
    ResetPasswordComponent,
    LayoutComponent,
    SendPasswordComponent,
    LayoutAdminComponent,
    ProfileComponent,
    WorksiteSafetyInspectionComponent,
    WorksiteSafetyHeaderComponent,
    WorksiteSafetyHazardComponent,
    WorksiteSafetyGroundComponent,
    WorksiteSafetyJobsiteComponent,
    WorksiteSafetyEquipmentComponent,
    WorksiteSafetyErpPlanningComponent,
    WorksiteFireExtinguisherComponent,
    WorksiteSafetyConfinedSpaceComponent,
    WorksiteSafetyHotWorkComponent,
    ListFormsComponent,
    VoiceComponent,
    LabelsComponent,
    LabelComponent,
    CommentComponent,
    MeaningfulSiteTourComponent,
    MeaningfulSiteTourNotesComponent,
    MeaningfulSiteTourHeaderComponent,
    SpotCheckSafetyComponent,
    HazardIdentificationControlComponent,
    RulesWorkProceduresComponent,
    IncidentReportingComponent,
    CommunicationTrainingComponent,
    PersonalProtectiveEquipmentComponent,
    SafetyEquipmentComponent,
    CorrectiveActionsComponent,
    SpotCheckSafetyHeaderComponent,
    BottomSheetWorksiteSafetyInspectionComponent,
    BottomSheetCommentComponent,
    CorrectiveActionComponent,
    WorksiteKeyPositiveFindingComponent,
    KioskeComponent,
    SignupComponent,
    PricingComponent,
    WhyusComponent,
    ContactComponent,
    TermsComponent,
    SigninComponent,
    SignupBottomComponent,
    SdkComponent,
    MeaningfulSiteTourSuggestionsComponent,
    MeaningfulSiteTourTodoComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    QuillModule,
    NgxBarcode6Module,
    NgxDropzoneModule,
    DragDropModule,
    ZXingScannerModule,
    NgxQRCodeModule,
    PipeModule,
    WebcamModule,
    IonicModule.forRoot(),
    NgxsModule.forRoot(States, { developmentMode: !environment.production }),
    NgxEchartsModule.forRoot({ echarts: () => import('echarts') }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  entryComponents: [
    VoiceComponent,
    ListEditComponent,
    EmailEditComponent,
    DetailCommentsComponent
  ],
  providers: [
    
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpConfig,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (idbPersistenceService: IdbPersistenceService) => () => idbPersistenceService.connect(),
      deps: [IdbPersistenceService],
      multi: true
    },
    Device
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
