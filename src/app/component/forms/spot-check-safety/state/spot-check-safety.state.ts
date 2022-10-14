import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as SpotCheckSafetyActions from './spot-check-safety.actions'
import { SpotCheckSafetyModel } from './spot-check-safety.model'

@Injectable()
@State<SpotCheckSafetyModel>({
  name: 'spotchecksafety',
  defaults: {
    isWorksiteSafetyHeaderValid: true
  }
})

export class SpotCheckSafetyState {

  @Selector()
  static isAppropriateTraining(state: SpotCheckSafetyModel): boolean {
    return state.isAppropriateTraining
  }

  @Action(SpotCheckSafetyActions.SetIsAppropriateTraining)
  onSetIsAppropriateTraining(ctx: StateContext<SpotCheckSafetyModel>, { isAppropriateTraining }: SpotCheckSafetyActions.SetIsAppropriateTraining) {
    ctx.patchState({
      isAppropriateTraining: isAppropriateTraining
    });
  }
  
}

