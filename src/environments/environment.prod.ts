import { Formloco, Summit, Rumzer } from '../app/state/app.state'

export const environment = {
  production: true,
  
  kioske: true,
  designUrl: Formloco.designUrl,
  linkedinUrl: Formloco.linkedinUrl,
  githubUrl: Formloco.githubUrl,

  apiUrl: Formloco.apiUrl,
  authUrl: Formloco.authUrl,
  formUrl: Formloco.formUrl,
  homeUrl: Formloco.homeUrl,
  emailUrl: Formloco.emailUrl,
  assetUrl: Formloco.assetUrl,
  notificationUrl: Formloco.notificationUrl,

  messageUrl: Formloco.messageUrl,
  signinUrl: Formloco.signinUrl,
  redirectForgotPasswordUrl: Formloco.redirectForgotPasswordUrl,

  tenant: { 
    email: Formloco.email, 
    tenant_id: Formloco.tenant
  },
  logo: Formloco.logo,
  idbName: Formloco.idbName,
  version: 'April 19, 2022',
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