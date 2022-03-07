import { AuthState } from './auth/auth.state'
import { DeviceState } from './device/device.state'
import { NotificationState } from './notification/notification.state'
import { CommentState } from '../component/comment/state/comment.state'
import { CorrectiveActionState } from '../component/corrective-action/state/corrective-action.state'
import { SpotCheckSafetyState } from '../component/forms/spot-check-safety/state/spot-check-safety.state'
import { VehicleInspectionState } from '../component/forms/vehicle-inspection/state/vehicle-inspection.state'
import { WorksiteSafetyInspectionState } from '../component/forms/worksite-safety-inspection/state/worksite-safety-inspection.state'

export const States = [
  AuthState,
  DeviceState,
  CommentState,
  NotificationState,
  SpotCheckSafetyState,
  CorrectiveActionState,
  VehicleInspectionState,
  WorksiteSafetyInspectionState
]

export enum Formloco {
  pin = '111111',
  tenant = 'formloco',
  linkedinUrl = 'https://www.linkedin.com/in/formloco',
  githubUrl = 'https://github.com/formloco/',
  kioskeEmail = 'brock@formloco.com',
  designUrl = 'https://design.formloco.com/',
  kioskePassword = 'simple',
  kioskeTenant = 'formloco',
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
  kioskeTenant = 'formloco',
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
  kioskeTenant = 'formloco',
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


