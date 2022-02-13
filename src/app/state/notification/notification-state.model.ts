export interface NotificationStateModel {
  notification?: NotificationModel
  notificationOpen?: NotificationModel
  notificationSigned?: NotificationModel
  notificationAllOpen?: NotificationModel
  notificationAllSigned?: NotificationModel
  notificationMyCount?: number
  notificationAdminCount?: number
  notificationTab?: number
  notificationIdx?: number
}
export interface NotificationModel {
  id?: number
  date?: Date
  date_signed?: Date
  form_name?: string
  email_to?: string
  email_from?: string
  email_signed?: string
  form_id?: string
  data_id?:  Number
  read?: boolean
  description?: string
  pdf?: string
  open?: boolean
  picurl?: string
  comment?: Comment[]
  correctiveAction?: boolean
}

export interface Comment {
  date?: string
  from?: string
  to?: string
  message?: string
}
          