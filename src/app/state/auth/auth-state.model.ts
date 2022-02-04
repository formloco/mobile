import { User, UserIdb, Tenant } from '../../model/auth'

export interface AuthStateModel {
  isIdentified?: boolean
  isSignIn?: boolean
  isAdmin?: boolean
  isListMenu?: boolean
  tenant?: Tenant
  user?: User
  userIdb?: UserIdb
  selectedForm?: object
  emailList?: []
  workers?: any[]
  supervisors?: any[]
  lookupListData?: []
  lookupListName?: string
  lookupListNames?: []
  datasource?: any
  page?: string
  dataPage?: string;
  childPage?: string
  childPageLabel?: string
  selectedVoiceFieldLabel?: string
  formLabels?: any[]
  formData?: {}
  forms?: any[]
  currentFormId?: string
}
          