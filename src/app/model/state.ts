export interface AppState {
  identified: boolean;
  page: string;
  childPage: string;
  childPageLabel: string;
  lat: number;
  long: number;
  user: {};
  darkMode: boolean;
  tenant: {};
  signIn: boolean;
  selectedForm: Form
}

export interface Form {
  id: string
  name: string
  icon: string
  type: string
  description: string
  formObject: {}
  history: boolean
}

export const FORM_EMPTY = <Form> {
  id: '',
  name: '',
  icon: '',
  description: '',
  formObject: {},
  history: false
}