export interface AuthStateModel {
  isIdentified?: boolean
  isSignIn?: boolean
  isAdmin?: boolean
  isListMenu?: boolean
  tenant?: Tenant
  user?: User //user obj for form consumption and api identification
  userIdb?: UserIdb //user obj for tenant tranactions
  selectedForm?: Form
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
  childPageIcon?: string
  selectedVoiceFieldLabel?: string
  formLabels?: any[]
  formData?: {}
  forms?: Form[]
  formsPublished: Form[]
  currentFormId?: string
  notificationId?: number
  kioske?: boolean
}       
export interface Form {
  id: string,
  icon: string,
  description: string,
  name: string,
  type: string,
  is_published: boolean,
  is_data: boolean,
  is_deployed: boolean,
  is_manager: boolean,
  is_list: boolean,
  lists: []
}

export interface User {
  id: number
  email: string
  name: string
  admin: boolean
  worker: boolean
  supervisor: boolean
  isDarkMode: boolean
  tenant_id: string
}

export interface UserIdb {
  email: string
  isDarkMode: boolean
}

export interface Tenant {
  tenant_id: string
  email: string
}