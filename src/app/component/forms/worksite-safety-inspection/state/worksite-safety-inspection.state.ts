import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'
import { CommentState } from 'src/app/component/comment/state/comment.state'

import * as WorksiteSafetyInspectionActions from './worksite-safety-inspection-state.actions'
import { WorksiteSafetyInspectionStateModel } from './worksite-safety-inspection-state.model'

@Injectable()
@State<WorksiteSafetyInspectionStateModel>({
  name: 'worksitesafetyinspection',
  defaults: {
    isWorksiteSafetyHeaderValid: true,
    isFireExtinguisher: true,
    isErpPlanning: true,
    isGroundwork: true,
    isConfinedSpace: true,
    isHotwork: true
  }
})

export class WorksiteSafetyInspectionState {

  @Selector()
  static isWorksiteSafetyHeaderValid(state: WorksiteSafetyInspectionStateModel): boolean {
    return state.isWorksiteSafetyHeaderValid
  }

  // @Selector()
  // static isSiteHazardAssessmentCompleted?(state: WorksiteSafetyInspectionStateModel): boolean {
  //   return state.isSiteHazardAssessmentCompleted
  // }

  @Selector()
  static isFireExtinguisher?(state: WorksiteSafetyInspectionStateModel): boolean {
    return state.isFireExtinguisher
  }

  @Selector()
  static isErpPlanning?(state: WorksiteSafetyInspectionStateModel): boolean {
    return state.isErpPlanning
  }

  @Selector()
  static isGroundwork?(state: WorksiteSafetyInspectionStateModel): boolean {
    return state.isGroundwork
  }

  @Selector()
  static isHotwork?(state: WorksiteSafetyInspectionStateModel): boolean {
    return state.isHotwork
  }

  @Selector()
  static isConfinedSpace?(state: WorksiteSafetyInspectionStateModel): boolean {
    return state.isConfinedSpace
  }

  @Action(WorksiteSafetyInspectionActions.SetIsWorksiteSafetyHeaderValid)
  onSetIsWorksiteSafetyHeaderValid(ctx: StateContext<WorksiteSafetyInspectionStateModel>, { isWorksiteSafetyHeaderValid }: WorksiteSafetyInspectionActions.SetIsWorksiteSafetyHeaderValid) {
    ctx.patchState({
      isWorksiteSafetyHeaderValid: isWorksiteSafetyHeaderValid
    });
  }

  @Action(WorksiteSafetyInspectionActions.SetIsFireExtinguisher)
  onSetIsFireExtinguisher(ctx: StateContext<WorksiteSafetyInspectionStateModel>, { isFireExtinguisher }: WorksiteSafetyInspectionActions.SetIsFireExtinguisher) {
    ctx.patchState({
      isFireExtinguisher: isFireExtinguisher
    });
  }

  @Action(WorksiteSafetyInspectionActions.SetIsErpPlanning)
  onSetIsErpPlanning(ctx: StateContext<WorksiteSafetyInspectionStateModel>, { isErpPlanning }: WorksiteSafetyInspectionActions.SetIsErpPlanning) {
    ctx.patchState({
      isErpPlanning: isErpPlanning
    });
  }

  @Action(WorksiteSafetyInspectionActions.SetIsGroundwork)
  onSetIsGroundwork(ctx: StateContext<WorksiteSafetyInspectionStateModel>, { isGroundwork }: WorksiteSafetyInspectionActions.SetIsGroundwork) {
    ctx.patchState({
      isGroundwork: isGroundwork
    });
  }

  @Action(WorksiteSafetyInspectionActions.SetIsConfinedSpace)
  onSetIsConfinedSpace(ctx: StateContext<WorksiteSafetyInspectionStateModel>, { isConfinedSpace }: WorksiteSafetyInspectionActions.SetIsConfinedSpace) {
    ctx.patchState({
      isConfinedSpace: isConfinedSpace
    });
  }

  @Action(WorksiteSafetyInspectionActions.SetIsHotwork)
  onSetIsHotwork(ctx: StateContext<WorksiteSafetyInspectionStateModel>, { isHotwork }: WorksiteSafetyInspectionActions.SetIsHotwork) {
    ctx.patchState({
      isHotwork: isHotwork
    });
  }
  
}

