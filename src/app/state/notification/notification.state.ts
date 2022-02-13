import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as NotificationActions from './notification-state.actions'
import { NotificationModel, NotificationStateModel } from './notification-state.model'

@Injectable()
@State<NotificationStateModel>({
  name: 'notification'
})

export class NotificationState {

  @Selector()
  static notification(state: NotificationStateModel): NotificationModel {
    return state.notification
  }

  @Selector()
  static notificationOpen(state: NotificationStateModel): NotificationModel {
    return state.notificationOpen
  }

  @Selector()
  static notificationSigned(state: NotificationStateModel): NotificationModel {
    return state.notificationSigned
  }

  @Selector()
  static notificationAllOpen(state: NotificationStateModel): NotificationModel {
    return state.notificationAllOpen
  }

  @Selector()
  static notificationAllSigned(state: NotificationStateModel): NotificationModel {
    return state.notificationAllSigned
  }

  @Selector()
  static notificationMyCount(state: NotificationStateModel): number {
    return state.notificationMyCount
  }

  @Selector()
  static notificationAdminCount(state: NotificationStateModel): number {
    return state.notificationAdminCount
  }

  @Selector()
  static notificationTab(state: NotificationStateModel): number {
    return state.notificationTab
  }

  @Selector()
  static notificationIdx(state: NotificationStateModel): number {
    return state.notificationIdx
  }

  @Action(NotificationActions.SetNotification)
  onSetNotification(ctx: StateContext<NotificationStateModel>, { notification }: NotificationActions.SetNotification) {
    ctx.patchState({
      notification: notification
    })
  }
  // for user to see their notifications
  @Action(NotificationActions.SetNotificationOpen)
  onSetNotificationOpen(ctx: StateContext<NotificationStateModel>, { notificationOpen }: NotificationActions.SetNotificationOpen) {
    ctx.patchState({
      notificationOpen: notificationOpen
    })
  }
  // for user to see their notifications
  @Action(NotificationActions.SetNotificationSigned)
  onSetNotificationSigned(ctx: StateContext<NotificationStateModel>, { notificationSigned }: NotificationActions.SetNotificationSigned) {
    ctx.patchState({
      notificationSigned: notificationSigned
    })
  }
  // for admin to see all notifications
  @Action(NotificationActions.SetNotificationAllOpen)
  onSetNotificationAllOpen(ctx: StateContext<NotificationStateModel>, { notificationAllOpen }: NotificationActions.SetNotificationAllOpen) {
    ctx.patchState({
      notificationAllOpen: notificationAllOpen
    })
  }
  // for admin to see all notifications
  @Action(NotificationActions.SetNotificationAllSigned)
  onSetNotificationAllSigned(ctx: StateContext<NotificationStateModel>, { notificationAllSigned }: NotificationActions.SetNotificationAllSigned) {
    ctx.patchState({
      notificationAllSigned: notificationAllSigned
    })
  }

  @Action(NotificationActions.SetNotificationMyCount)
  onSetNotificationMyCount(ctx: StateContext<NotificationStateModel>, { notificationMyCount }: NotificationActions.SetNotificationMyCount) {
    ctx.patchState({
      notificationMyCount: notificationMyCount
    })
  }

  @Action(NotificationActions.SetNotificationAdminCount)
  onSetNotificationAdminCount(ctx: StateContext<NotificationStateModel>, { notificationAdminCount }: NotificationActions.SetNotificationAdminCount) {
    ctx.patchState({
      notificationAdminCount: notificationAdminCount
    })
  }

  @Action(NotificationActions.SetNotificationTab)
  onSetNotificationTab(ctx: StateContext<NotificationStateModel>, { notificationTab }: NotificationActions.SetNotificationTab) {
    ctx.patchState({
      notificationTab: notificationTab
    })
  }

  @Action(NotificationActions.SetNotificationIdx)
  onSetNotificationIdx(ctx: StateContext<NotificationStateModel>, { notificationIdx }: NotificationActions.SetNotificationIdx) {
    ctx.patchState({
      notificationIdx: notificationIdx
    })
  }
  

}

