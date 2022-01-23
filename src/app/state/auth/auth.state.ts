import { Injectable } from '@angular/core'
import { State, Selector, StateContext, Action } from '@ngxs/store'

import * as AuthActions from './auth-state.actions'
import { AuthStateModel } from './auth-state.model'
import { User, UserIdb, Tenant } from '../../model/auth'

@Injectable()
@State<AuthStateModel>({
  name: 'auth'
})

export class AuthState {

  @Selector()
  static isIdentified(state: AuthStateModel): boolean {
    return state.isIdentified
  }

  @Selector()
  static isSignIn(state: AuthStateModel): boolean {
    return state.isSignIn
  }

  @Selector()
  static isAdmin(state: AuthStateModel): boolean {
    return state.isAdmin
  }

  @Selector()
  static isListMenu(state: AuthStateModel): boolean {
    return state.isListMenu
  }

  @Selector()
  static tenant(state: AuthStateModel): Tenant {
    return state.tenant
  }

  @Selector()
  static user(state: AuthStateModel): User {
    return state.user
  }

  @Selector()
  static userIdb(state: AuthStateModel): UserIdb {
    return state.userIdb
  }

  @Selector()
  static page(state: AuthStateModel): string {
    return state.page
  }

  @Selector()
  static workers(state: AuthStateModel): any[] {
    return state.workers
  }

  @Selector()
  static supervisors(state: AuthStateModel): any[] {
    return state.supervisors
  }

  @Selector()
  static lookupListData(state: AuthStateModel): [] {
    return state.lookupListData
  }

  @Selector()
  static lookupListName(state: AuthStateModel): string {
    return state.lookupListName
  }

  @Selector()
  static emailList(state: AuthStateModel): [] {
    return state.emailList
  }

  @Selector()
  static lookupListNames(state: AuthStateModel): [] {
    return state.lookupListNames
  }
  @Selector()
  static childPage(state: AuthStateModel): string {
    return state.childPage
  }

  @Selector()
  static childPageLabel(state: AuthStateModel): string {
    return state.childPageLabel
  }

  @Selector()
  static selectedForm(state: AuthStateModel): {} {
    return state.selectedForm
  }

  @Selector()
  static forms(state: AuthStateModel): {} {
    return state.forms
  }

  @Selector()
  static formLabels(state: AuthStateModel): {} {
    return state.formLabels
  }

  
  @Selector()
  static selectedVoiceFieldLabel(state: AuthStateModel): {} {
    return state.selectedVoiceFieldLabel
  }

  @Action(AuthActions.SetIsIdentified)
  onSetIsIdentified(ctx: StateContext<AuthStateModel>, { isIdentified }: AuthActions.SetIsIdentified) {
    ctx.patchState({
      isIdentified: isIdentified
    })
  }

  @Action(AuthActions.SetIsSignIn)
  onSetIsSignIn(ctx: StateContext<AuthStateModel>, { isSignIn }: AuthActions.SetIsSignIn) {
    ctx.patchState({
      isSignIn: isSignIn
    })
  }

  @Action(AuthActions.SetIsAdmin)
  onSetIsAdmin(ctx: StateContext<AuthStateModel>, { isAdmin }: AuthActions.SetIsAdmin) {
    ctx.patchState({
      isAdmin: isAdmin
    })
  }

  @Action(AuthActions.SetIsListMenu)
  onSetIsListMenu(ctx: StateContext<AuthStateModel>, { isListMenu }: AuthActions.SetIsListMenu) {
    ctx.patchState({
      isListMenu: isListMenu
    })
  }

  @Action(AuthActions.SetPage)
  onSetPage(ctx: StateContext<AuthStateModel>, { page }: AuthActions.SetPage) {
    ctx.patchState({
      page: page
    })
  }

  @Action(AuthActions.SetWorkers)
  onSetWorkers(ctx: StateContext<AuthStateModel>, { workers }: AuthActions.SetWorkers) {
    ctx.patchState({
      workers: workers
    })
  }

  @Action(AuthActions.SetSupervisors)
  onSetSupervisors(ctx: StateContext<AuthStateModel>, { supervisors }: AuthActions.SetSupervisors) {
    ctx.patchState({
      supervisors: supervisors
    })
  }

  @Action(AuthActions.SetLookupListData)
  onSetLookupListData(ctx: StateContext<AuthStateModel>, { lookupListData }: AuthActions.SetLookupListData) {
    ctx.patchState({
      lookupListData: lookupListData
    })
  }

  @Action(AuthActions.SetLookupListName)
  onSetLookupListName(ctx: StateContext<AuthStateModel>, { lookupListName }: AuthActions.SetLookupListName) {
    ctx.patchState({
      lookupListName: lookupListName
    })
  }

  @Action(AuthActions.SetLookupListNames)
  onSetLookupListNames(ctx: StateContext<AuthStateModel>, { lookupListNames }: AuthActions.SetLookupListNames) {
    ctx.patchState({
      lookupListNames: lookupListNames
    })
  }

  @Action(AuthActions.SetEmailList)
  onSetEmailList(ctx: StateContext<AuthStateModel>, { emailList }: AuthActions.SetEmailList) {
    ctx.patchState({
      emailList: emailList
    })
  }

  @Action(AuthActions.SetChildPage)
  onSetChildPage(ctx: StateContext<AuthStateModel>, { childPage }: AuthActions.SetChildPage) {
    ctx.patchState({
      childPage: childPage
    })
  }

  @Action(AuthActions.SetChildPageLabel)
  onSetChildPageLabel(ctx: StateContext<AuthStateModel>, { childPageLabel }: AuthActions.SetChildPageLabel) {
    ctx.patchState({
      childPageLabel: childPageLabel
    })
  }

  @Action(AuthActions.SetTenant)
  onSetTenant(ctx: StateContext<AuthStateModel>, { tenant }: AuthActions.SetTenant) {
    ctx.patchState({
      tenant: tenant
    })
  }

  @Action(AuthActions.SetUserIdb)
  onSetUserIdb(ctx: StateContext<AuthStateModel>, { userIdb }: AuthActions.SetUserIdb) {
    ctx.patchState({
      userIdb: userIdb
    })
  }

  @Action(AuthActions.SetUser)
  onSetUser(ctx: StateContext<AuthStateModel>, { user }: AuthActions.SetUser) {
    ctx.patchState({
      user: user
    })
  }

  @Action(AuthActions.SetSelectedForm)
  onSetSelectedForm(ctx: StateContext<AuthStateModel>, { selectedForm }: AuthActions.SetSelectedForm) {
    ctx.patchState({
      selectedForm: selectedForm
    });
  }

  @Action(AuthActions.ResetAuth)
  onResetAuth(ctx: StateContext<AuthStateModel>, { }: AuthActions.ResetAuth) {
    ctx.patchState({
      page: 'home',
      childPageLabel: 'Forms'
    })
  }

  @Action(AuthActions.SetForms)
  onSetForms(ctx: StateContext<AuthStateModel>, { forms }: AuthActions.SetForms) {
    ctx.patchState({
      forms: forms
    })
  }

  @Action(AuthActions.SetSelectedVoiceFieldLabel)
  onSelectedVoiceFieldLabel(ctx: StateContext<AuthStateModel>, { selectedVoiceFieldLabel }: AuthActions.SetSelectedVoiceFieldLabel) {
    ctx.patchState({
      selectedVoiceFieldLabel: selectedVoiceFieldLabel
    });
  }

  
  @Action(AuthActions.SetFormLabels)
  onSetFormLabels(ctx: StateContext<AuthStateModel>, { formLabels }: AuthActions.SetFormLabels) {
    ctx.patchState({
      formLabels: formLabels
    });
  }
  
}

