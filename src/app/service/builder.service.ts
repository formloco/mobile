import { Injectable } from '@angular/core'

import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog'

import { IdbCrudService } from "../service-idb/idb-crud.service"
import { AppService } from "../service/app.service"
import { AuthService } from "../service/auth.service"

@Injectable({
  providedIn: 'root'
})
export class BuilderService {

  idbData

  public formId //current form id saving, opening
  public formObj // form controls and details
  public isDetails = false
  public isListOpen = false
  public isRightMenu = false
  public isLookuplist = false
  /** 
   * showControls - designer control menu is hidden when is_data = true
   * delete buttons on form controls are removed
  */
  public showControls = true // 
  public isPreview = false
  public isDrag = false

  // drag'n drop
  public controls
  public event //captures drag'n drop event
  public currentIndex: number //current index for details and drag n drop
  public previousIndex: number
  public canvasFormControls //current form controls
  public isExpandDetails: boolean
  public currentQilllIndex

  public isFileUploadDisabled = false
  public isFileUploadRunning = false

  // run form
  public detailArray = []
  public controlArray = []
  public fileArray = [] //used to hold file content for attach files

  // integration
  public apiControlArray

  constructor(
    private dialog: MatDialog,
    public appService: AppService,
    private authService: AuthService,
    private idbCrudService: IdbCrudService) { }

  selectDetails(index) {
    this.currentIndex = index
    this.isRightMenu = true
    this.isDetails = true
    this.isLookuplist = false
    this.isExpandDetails = false
  }

  selectControlDetails(index) {
    this.currentIndex = index
    this.isRightMenu = true
    this.isDetails = true
    this.isLookuplist = false
    this.isExpandDetails = false
    if (this.canvasFormControls.details[index].list !== 'none') this.getList(index)
  }

  getList(index) {
    this.idbCrudService.readAll('list_data').subscribe(data => {
      this.idbData = data
      if (this.idbData.length > 0) {
        let list = this.idbData.filter(
          data => data.form_id === this.canvasFormControls.details[index].list.form_id
        )
        this.canvasFormControls.details[index].selectArray = list[0].data
      }
    })
  }

  selectDetailsExpanded(index) {
    this.currentIndex = index
    this.isRightMenu = true
    this.isDetails = true
    this.isLookuplist = false
    this.isExpandDetails = true
  }

  toggleDetails(index) {
    this.currentIndex = index
    this.isDetails = !this.isDetails
  }

}
