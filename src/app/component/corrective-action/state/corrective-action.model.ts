export interface CorrectiveActionStateModel {
  correctiveActions?: CorrectiveAction[]
  type?: string
}

export interface CorrectiveAction {
  label?: string
  dateToComplete?: Date
  correctiveActionRequired?: string
  personResponsible?: string
  dateCompleted?: Date
  signature?: string
  field?: string
  type?: string
}