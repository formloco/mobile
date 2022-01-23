import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as SpotCheckSafetyActions from './spot-check-safety.actions'
import { SpotCheckSafeyModel } from './spot-check-safety.model'

@Injectable()
@State<SpotCheckSafeyModel>({
  name: 'spotchecksafety',
  defaults: {
    isWorksiteSafetyHeaderValid: true
  }
})

export class SpotCheckSafetyState {

  @Selector()
  static isAppropriateTraining(state: SpotCheckSafeyModel): boolean {
    return state.isAppropriateTraining
  }

  @Action(SpotCheckSafetyActions.SetIsAppropriateTraining)
  onSetIsAppropriateTraining(ctx: StateContext<SpotCheckSafeyModel>, { isAppropriateTraining }: SpotCheckSafetyActions.SetIsAppropriateTraining) {
    ctx.patchState({
      isAppropriateTraining: isAppropriateTraining
    });
  }
  
}

