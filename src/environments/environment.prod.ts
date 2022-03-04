import { Formloco, Summit, Rumzer } from '../app/state/apps/apps-state.model'

export const environment = {
  production: true,
  
  kioske: false,
  designUrl: Formloco.designUrl,
  linkedinUrl: Formloco.linkedinUrl,
  githubUrl: Formloco.githubUrl,
  kioskeEmail: Formloco.kioskeEmail,
  kioskePassword: Formloco.kioskePassword,
  kioskeTenant: Formloco.kioskeTenant,

  apiUrl: Formloco.apiUrl,
  authUrl: Formloco.authUrl,
  formUrl: Formloco.formUrl,
  emailUrl: Formloco.emailUrl,
  assetUrl: Formloco.assetUrl,
  notificationUrl: Formloco.notificationUrl,

  messageUrl: Formloco.messageUrl,
  signinUrl: Formloco.signinUrl,
  redirectForgotPasswordUrl: Formloco.redirectForgotPasswordUrl,

  tenant: { email: Formloco.email, 
            tenant_id: Formloco.tenant,
            assetTenantId: 'a0642972-e528-4071-b756-e103e85cd9f4' // fixed-asset app
  },
  logo: Formloco.logo,
  idbName: Formloco.idbName,
  version: 'January 26, 2022',
  pin: Formloco.pin

  // apiUrl: Summit.apiUrl,
  // authUrl: Summit.authUrl,
  // formUrl: Summit.formUrl,
  // emailUrl: Summit.emailUrl,
  // assetUrl: Summit.assetUrl,
  // notificationUrl: Summit.notificationUrl,

  // messageUrl: Summit.messageUrl,
  // signinUrl: Summit.signinUrl,
  // redirectForgotPasswordUrl: Summit.redirectForgotPasswordUrl,

  // tenant: { email: Summit.email, 
  //           tenant_id: Summit.tenant,
  //           assetTenantId: 'a0642972-e528-4071-b756-e103e85cd9f4' // fixed-asset app
  // },
  // logo: Summit.logo,
  // idbName: Summit.idbName,
  // version: 'February 18, 2022',
  // pin: Summit.pin
}