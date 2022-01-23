import { NotificationModel } from './notification-state.model'

export class SetNotification {
  static type = '[Notification] SetNotification'
  constructor(public notification: NotificationModel) {}
}

export class SetNotificationMyCount {
  static type = '[Notification] SetNotificationMyCount'
  constructor(public notificationMyCount: number) {}
}

export class SetNotificationAdminCount {
  static type = '[Notification] SetNotificationAdminCount'
  constructor(public notificationAdminCount: number) {}
}

export class SetNotificationTab {
  static type = '[Notification] SetNotificationTab'
  constructor(public notificationTab: number) {}
}

export class SetNotificationOpen {
  static type = '[Notification] SetNotificationOpen'
  constructor(public notificationOpen: NotificationModel) {}
}

export class SetNotificationSigned {
  static type = '[Notification] SetNotificationSigned'
  constructor(public notificationSigned: NotificationModel) {}
}

export class SetNotificationAllOpen {
  static type = '[Notification] SetNotificationAllOpen'
  constructor(public notificationAllOpen: NotificationModel) {}
}

export class SetNotificationAllSigned {
  static type = '[Notification] SetNotificationAllSigned'
  constructor(public notificationAllSigned: NotificationModel) {}
}


