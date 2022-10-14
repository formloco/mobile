import { Component, Inject, OnInit } from "@angular/core"

import * as _ from 'lodash'

import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material/dialog"

import { Store } from '@ngxs/store'

import { SetComments } from './state/comment.actions'
import { CommentState } from './state/comment.state'

import { AppService } from "../../service/app.service"
import { CorrectiveActionComponent } from "../corrective-action/corrective-action.component"
import { CorrectiveActionState } from "../corrective-action/state/corrective-action.state"

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  commentForm: FormGroup

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CommentComponent>,
    public appService: AppService) {
    this.commentForm = this.formBuilder.group({
      comment: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    const comments = this.store.selectSnapshot(CommentState.comments)
    const comment = comments.filter(c => c.field == this.data.field)
    if (comment.length > 0) this.commentForm.controls['comment'].setValue(comment[0].text)
  }

  save() {
    const comments = _.cloneDeep(this.store.selectSnapshot(CommentState.comments))
    const commentIdx = comments.findIndex(c => c.field == this.data.field)
    
    if (commentIdx == -1) 
      comments.push({
        label: this.data.label,
        text: this.commentForm.controls['comment'].value,
        field: this.data.field,
        type: this.data.type,
        discrepancy: this.data.discrepancy
      })
    else comments[commentIdx].text = this.commentForm.controls['comment'].value

    this.store.dispatch(new SetComments(comments))
    this.dialogRef.close(true)
  }

  delete() {
    const comments = _.cloneDeep(this.store.selectSnapshot(CommentState.comments))
    const commentIdx = comments.findIndex(c => c.field == this.data.field)
    const correctiveActions = _.cloneDeep(this.store.selectSnapshot(CorrectiveActionState.correctiveActions))
    const correctiveActionsIdx = correctiveActions.findIndex(c => c.field == this.data.field)
  
    if (commentIdx != -1) comments.splice(commentIdx, 1)
    if (correctiveActionsIdx != -1) comments.splice(correctiveActionsIdx, 1)
    this.store.dispatch(new SetComments(comments))
    this.dialogRef.close(false)
  }

  openVoice() {
    this.appService.popVoiceDialog(this.commentForm, 'comment', this.data.label)
  }

  openCorrectiveActionDialog() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.maxWidth = '100vw'
    dialogConfig.maxHeight = '100vh'
    dialogConfig.width = '100vw'
    dialogConfig.height = '100vh'
    dialogConfig.data = { 
      title: this.data.label, 
      label: this.data.label, 
      field: this.data.field, 
      type: this.data.type, 
      actionItem: this.commentForm.controls['comment'].value }
    this.dialog.open(CorrectiveActionComponent, dialogConfig)
  }
}
