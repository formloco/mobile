import { CorrectiveAction } from './corrective-action.model'

export class SetCorrectiveActions {
  static type = '[CorrectiveActionStateModel] SetCorrectiveActions'
  constructor(public correctiveActions: CorrectiveAction[]) {}
}

export class SetCorrectiveAction {
  static type = '[CorrectiveActionStateModel] SetCorrectiveAction'
  constructor(public correctiveAction: CorrectiveAction) {}
}
