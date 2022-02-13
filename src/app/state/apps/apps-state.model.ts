export interface AppsModel {
  app?: App
  apps?: any[]
  appPage: string
}

export interface App {
  id: number,
  name: string,
  icon: string,
  description: string
}

export const APPS = [
  {
    id: "asset-tracker",
    name: "Asset Tracker",
    icon: "location_on",
    description: "Realtime Asset Tracking"
  }
]

export enum Branding {
  summit = 'assets/logo-summit.svg',
  formloco = 'assets/logo-light.png',
  rumzer = 'assets/logo-rumzer.svg'
}
// https://www.linkedin.com/company/fromloco
export enum Formloco {
  pin = '111111',
  tenant = 'formloco',
  linkedinUrl = 'https://www.linkedin.com/in/formloco',
  githubUrl = 'https://github.com/formloco/',
  kioskeEmail = 'brock@formloco.com',
  designerUrl = 'https://form369.formloco.com/',
  kioskePassword = 'simple',
  idbName = 'formlocoMobileDB',
  email = 'poly@formloco.com',
  logo = 'assets/logo-light.png',
  apiUrl = 'https://api.formloco.com/api/',
  authUrl = 'https://api.formloco.com/auth/',
  formUrl = 'https://api.formloco.com/form/',
  emailUrl = 'https://api.formloco.com/email/',
  assetUrl = 'https://api.formloco.com/asset/',
  messageUrl = 'https://mobile.formloco.com/message/',
  notificationUrl = 'https://api.formloco.com/notification/',
  signinUrl = 'https://mobile.formloco.com/e93f63d8e62d44da93009229f8a7f890/',
  redirectForgotPasswordUrl = 'https://mobile.formloco.com/O451fd2702f54a00b1007f6e80b32e45/'
}

export enum Summit {
  pin = '999999',
  tenant = 'summmit',
  idbName = 'summitEarthDB',
  kioskeEmail = 'brock@formloco.com',
  kioskePassword = 'simple',
  email = 'HSE@Summitearth.com',
  logo = 'assets/logo-summit.svg',
  apiUrl = 'https://forms.summitearth.com/api/',
  authUrl = 'https://forms.summitearth.com/auth/',
  formUrl = 'https://forms.summitearth.com/form/',
  emailUrl = 'https://forms.summitearth.com/email/',
  assetUrl = 'https://forms.summitearth.com/asset/',
  messageUrl = 'https://forms.summitearth.com/message/',
  notificationUrl = 'https://forms.summitearth.com/notification/',
  signinUrl = 'https://forms.summitearth.com/e93f63d8e62d44da93009229f8a7f890/',
  redirectForgotPasswordUrl = 'https://forms.summitearth.com/O451fd2702f54a00b1007f6e80b32e45/'
}

export enum Rumzer {
  pin = '333333',
  tenant = 'rumzer',
  idbName = 'rumzerMobileDB',
  kioskeEmail = 'brock@formloco.com',
  kioskePassword = 'simple',
  email = 'rumzerbot@rumzer.com',
  logo = 'assets/logo-rumzer.svg',
  apiUrl = 'https://api.formloco.com/api/',
  authUrl = 'https://api.formloco.com/auth/',
  formUrl = 'https://api.formloco.com/form/',
  emailUrl = 'https://api.formloco.com/email/',
  assetUrl = 'https://api.formloco.com/asset/',
  notificationUrl = 'https://api.formloco.com/notification/',
  messageUrl = 'https://mobile.formloco.com/message/',
  signinUrl = 'https://mobile.formloco.com/e93f63d8e62d44da93009229f8a7f890/',
  redirectForgotPasswordUrl = 'https://mobile.formloco.com/O451fd2702f54a00b1007f6e80b32e45/'
}

