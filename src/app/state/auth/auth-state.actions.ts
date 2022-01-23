import { User, UserIdb, Tenant } from '../../model/auth'

export class SetIsIdentified {
  static type = '[Auth] SetIsIdentified'
  constructor(public isIdentified: boolean) {}
}

export class SetIsSignIn {
  static type = '[Auth] SetIsSignIn'
  constructor(public isSignIn: boolean) {}
}

export class SetIsAdmin {
  static type = '[Auth] SetIsAdmin'
  constructor(public isAdmin: boolean) {}
}

export class SetIsListMenu {
  static type = '[Auth] SetIsMenuList'
  constructor(public isListMenu: boolean) {}
}

export class SetPage {
  static type = '[Auth] SetPage'
  constructor(public page: string) {}
}

export class SetEmailList {
  static type = '[Auth] SetEmailList'
  constructor(public emailList: []) {}
}

export class SetWorkers {
  static type = '[Auth] SetWorkers'
  constructor(public workers: any[]) {}
}

export class SetSupervisors {
  static type = '[Auth] SetSupervisors'
  constructor(public supervisors: any[]) {}
}

export class SetLookupListData {
  static type = '[Auth] SetLookupListData'
  constructor(public lookupListData: []) {}
}

export class SetLookupListName {
  static type = '[Auth] SetLookupListName'
  constructor(public lookupListName: string) {}
}

export class SetLookupListNames {
  static type = '[Auth] SetLookupListNames'
  constructor(public lookupListNames: []) {}
}

export class SetChildPage {
  static type = '[Auth] SetChildPage'
  constructor(public childPage: string) {}
}

export class SetChildPageLabel {
  static type = '[Auth] SetChildPageLabel'
  constructor(public childPageLabel: string) {}
}

export class SetTenant {
  static type = '[Auth] SetTenant'
  constructor(public tenant: Tenant) {}
}

export class SetUser {
  static type = '[Auth] SetUser'
  constructor(public user: User) {}
}

export class SetUserIdb {
  static type = '[Auth] SetUserIdb'
  constructor(public userIdb: UserIdb) {}
}

export class SetSelectedForm {
  static type = '[Auth] SetSelectedForm'
  constructor(public selectedForm: {}) {}
}

export class ResetAuth {
  static type = '[Auth] ResetAuth'
  constructor() {}
}

export class SetForms {
  static type = '[Auth] SetForms'
  constructor(public forms: any[]) {}
}

export class SetSelectedVoiceFieldLabel {
  static type = '[Auth] SetSelectedVoiceFieldLabel'
  constructor(public selectedVoiceFieldLabel: string) {}
}

export class SetFormLabels {
  static type = '[Auth] SetFormLabels'
  constructor(public formLabels: any[]) {}
}

export class SetCurrentFormId {
  static type = '[Auth] SetCurrentFormId'
  constructor(public currentFormId: string) {}
}


