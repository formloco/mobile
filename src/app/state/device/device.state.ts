import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as DeviceActions from './device-state.actions'
import { DeviceStateModel } from './device-state.model'

@Injectable()
@State<DeviceStateModel>({
  name: 'device',
  defaults: {
    background: '#3b3b3b',
    pics: [],
    voice: [],
    transcription: ''
  }
})

export class DeviceState {

  @Selector()
  static lat(state: DeviceStateModel): number {
    return state.lat
  }

  @Selector()
  static long(state: DeviceStateModel): number {
    return state.long
  }

  @Selector()
  static background(state: DeviceStateModel): string {
    return state.background
  }

  @Selector()
  static screenSize(state: DeviceStateModel): string {
    return state.screenSize
  }

  @Selector()
  static screenWidth(state: DeviceStateModel): string {
    return state.screenWidth
  }

  @Selector()
  static isIOS(state: DeviceStateModel): boolean {
    return state.isIOS
  }

  @Selector()
  static isSafari(state: DeviceStateModel): boolean {
    return state.isSafari
  }

  @Selector()
  static isDarkMode(state: DeviceStateModel): boolean {
    return state.isDarkMode
  }

  @Selector()
  static pics(state: DeviceStateModel): [] {
    return state.pics
  }

  @Selector()
  static voice?(state: DeviceStateModel): any[] {
    return state.voice
  }

  @Selector()
  static transcription?(state: DeviceStateModel): string {
    return state.transcription
  }

  @Action(DeviceActions.SetLat)
  onSetLat(ctx: StateContext<DeviceStateModel>, { lat }: DeviceActions.SetLat) {
    ctx.patchState({
      lat: lat
    })
  }

  @Action(DeviceActions.SetLong)
  onSetLong(ctx: StateContext<DeviceStateModel>, { long }: DeviceActions.SetLong) {
    ctx.patchState({
      long: long
    });
  }

  @Action(DeviceActions.SetBackground)
  onSetBackGround(ctx: StateContext<DeviceStateModel>, { background }: DeviceActions.SetBackground) {
    ctx.patchState({
      background: background
    });
  }

  @Action(DeviceActions.SetScreenSize)
  onSetScreenSize(ctx: StateContext<DeviceStateModel>, { screenSize }: DeviceActions.SetScreenSize) {
    ctx.patchState({
      screenSize: screenSize
    });
  }

  @Action(DeviceActions.SetScreenWidth)
  onSetScreenWidth(ctx: StateContext<DeviceStateModel>, { screenWidth }: DeviceActions.SetScreenWidth) {
    ctx.patchState({
      screenWidth: screenWidth
    });
  }

  @Action(DeviceActions.SetIsIOS)
  onSetIsIOS(ctx: StateContext<DeviceStateModel>, { isIOS }: DeviceActions.SetIsIOS) {
    ctx.patchState({
      isIOS: isIOS
    });
  }

  @Action(DeviceActions.SetIsSafari)
  onSetIsSafari(ctx: StateContext<DeviceStateModel>, { isSafari }: DeviceActions.SetIsSafari) {
    ctx.patchState({
      isSafari: isSafari
    });
  }

  @Action(DeviceActions.SetPics)
  onSetPics(ctx: StateContext<DeviceStateModel>, { pics }: DeviceActions.SetPics) {
    ctx.patchState({
      pics: pics
    });
  }

  @Action(DeviceActions.SetIsDarkMode)
  onSetIsDarkMode(ctx: StateContext<DeviceStateModel>, { isDarkMode }: DeviceActions.SetIsDarkMode) {
    ctx.patchState({
      isDarkMode: isDarkMode
    });
  }

  @Action(DeviceActions.SetVoice)
  onSetVoice(ctx: StateContext<DeviceStateModel>, { voice }: DeviceActions.SetVoice) {
    ctx.patchState({
      voice: voice
    });
  }

  @Action(DeviceActions.SetTranscription)
  onSetTanscription(ctx: StateContext<DeviceStateModel>, { transcription }: DeviceActions.SetTranscription) {
    ctx.patchState({
      transcription: transcription
    });
  }
  
}

