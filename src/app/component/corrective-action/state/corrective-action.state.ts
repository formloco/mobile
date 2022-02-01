import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as CorrectiveActionActions from './corrective-action.actions'
import { CorrectiveActionStateModel, CorrectiveAction } from './corrective-action.model'

@Injectable()
@State<CorrectiveActionStateModel>({
  name: 'correctiveAction',
  defaults: {
    correctiveActions: []
  }
})

export class CorrectiveActionState {

  @Selector()
  static correctiveActions(state: CorrectiveActionStateModel): CorrectiveAction[] {
    return state.correctiveActions
  }

  @Action(CorrectiveActionActions.SetCorrectiveActions)
  onSetCorrectiveAction(ctx: StateContext<CorrectiveActionStateModel>, { correctiveActions }: CorrectiveActionActions.SetCorrectiveActions) {
    ctx.patchState({
      correctiveActions: correctiveActions
    });
  }

}

