import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as VehicleInspectionActions from './vehicle-inspection-state.actions'
import { VehicleInspectionStateModel } from './vehicle-inspection-state.model'

@Injectable()
@State<VehicleInspectionStateModel>({
  name: 'vehicleinspection',
  defaults: {
    isHeaderValid: false,
    selectedComments: []
  }
})

export class VehicleInspectionState {

  @Selector()
  static isHeaderValid(state: VehicleInspectionStateModel): boolean {
    return state.isHeaderValid
  }

  @Selector()
  static selectedComments(state: VehicleInspectionStateModel): [] {
    return state.selectedComments
  }

  @Action(VehicleInspectionActions.SetIsHeaderValid)
  onSetIsHeader(ctx: StateContext<VehicleInspectionStateModel>, { isHeaderValid }: VehicleInspectionActions.SetIsHeaderValid) {
    ctx.patchState({
      isHeaderValid: isHeaderValid
    });
  }

  @Action(VehicleInspectionActions.SetSelectedComments)
  onSetSelectedComments(ctx: StateContext<VehicleInspectionStateModel>, { selectedComments }: VehicleInspectionActions.SetSelectedComments) {
    ctx.patchState({
      selectedComments: selectedComments
    });
  }

}

