import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { HttpConfig } from './interceptor/httpconfig.interceptor'

import { MaterialModule } from "./material.module"

import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'

import { PipeModule } from './pipe/pipe.module'

// third party libraries
import { QuillModule } from "ngx-quill"
import { NgxBarcode6Module } from 'ngx-barcode6'
import { NgxDropzoneModule } from 'ngx-dropzone'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { ZXingScannerModule } from '@zxing/ngx-scanner'
import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode'

// security & anonomous route
import { NavComponent } from './component/nav/nav.component'
import { HomeComponent } from './component/home/home.component'
import { DesktopComponent } from './component/desktop/desktop.component'

// admin
import { PinComponent } from './component/admin/pin/pin.component'
import { AdminComponent } from './component/admin/admin.component'
import { DataComponent } from './component/admin/data/data.component'
import { MenuComponent } from './component/admin/menu/menu.component'
import { SettingsComponent } from './component/admin/settings/settings.component'
import { FormListsComponent } from './component/admin/form-lists/form-lists.component'
import { DataFormsComponent } from './component/admin/data-forms/data-forms.component'
import { IdentificationComponent } from './component/admin/identification/identification.component'
import { ListRunComponent } from './component/admin/list-run/list-run.component'

// form
import { FormComponent } from './component/form/form.component'
import { FooterComponent } from './component/footer/footer.component'
import { SignOffComponent } from './component/sign-off/sign-off.component'

// vehicle-inspection
import { DetailComponent } from './component/vehicle-inspection/detail/detail.component'
import { HeaderComponent } from './component/vehicle-inspection/header/header.component'
import { DiscrepancyComponent } from './component/vehicle-inspection/discrepancy/discrepancy.component'
import { VehicleInspectionComponent } from './component/vehicle-inspection/vehicle-inspection.component'
import { DiscrepancyDetailComponent } from './component/vehicle-inspection/discrepancy-detail/discrepancy-detail.component'

// auth
import { AuthService } from './service/auth.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

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

//indexDB
import { IdbPersistenceService } from './service-idb/idb-persistence.service'

@NgModule({
  declarations: [
    AppComponent,
    PinComponent,
    NavComponent,
    FormComponent,
    HomeComponent,
    DataComponent,
    MenuComponent,
    AdminComponent,
    FooterComponent,
    DesktopComponent,
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
    DiscrepancyDetailComponent
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
    PipeModule
  ],
  exports: [
    PinComponent,
    NavComponent,
    FormComponent,
    HomeComponent,
    DataComponent,
    MenuComponent,
    AdminComponent,
    FooterComponent,
    DesktopComponent,
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
    DiscrepancyComponent,
    VehicleInspectionComponent,
    DiscrepancyDetailComponent
  ],
  entryComponents: [
    DiscrepancyDetailComponent
  ],
  providers: [AuthService,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
