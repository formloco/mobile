// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Formloco, Summit, Platform } from '../app/state/app.state'

export const environment = {
  production: false,

  // kioske: true,
  // designUrl: Formloco.designKioskeUrl,

  kioske: false,
  // designUrl: 'http://localhost:4201',
  // design is an external app
  designUrl: Formloco.designUrl,
  version: Platform.version,
  
  homeUrl: 'http://localhost:4200',
  // messageUrl is used by email service to embed link in notification email
  messageUrl: 'http://localhost:4200/message/',

  // local endpoints
  // apiUrl: 'http://localhost:9001/api/',
  // authUrl: 'http://localhost:9000/auth/',
  // formUrl: 'http://localhost:9002/form/',
  // emailUrl: 'http://localhost:9003/email/',
  // assetUrl: 'http://localhost:9005/asset/',
  // notificationUrl: 'http://localhost:9004/',

  // router re-directs, message comes from email link
  // signinUrl: 'http://localhost:4200/e93f63d8e62d44da93009229f8a7f890/',
  // redirectForgotPasswordUrl: 'http://localhost:4200/O451fd2702f54a00b1007f6e80b32e45/',


  apiUrl: Summit.apiUrl,
  authUrl: Summit.authUrl,
  formUrl: Summit.formUrl,
  emailUrl: Summit.emailUrl,
  assetUrl: Summit.assetUrl,
  notificationUrl: Summit.notificationUrl,

  signinUrl: Summit.signinUrl,
  redirectForgotPasswordUrl: Summit.redirectForgotPasswordUrl,

  tenant: { email: Summit.email, tenant_id: Summit.tenant },
  logo: Summit.logo,
  idbName: Summit.idbName,
  pin: Summit.pin,

  // kioske links
  linkedinUrl: Formloco.linkedinUrl,
  githubUrl: Formloco.githubUrl,
  
  // apiUrl: Formloco.apiUrl,
  // authUrl: Formloco.authUrl,
  // formUrl: Formloco.formUrl,
  // emailUrl: Formloco.emailUrl,
  // assetUrl: Formloco.assetUrl,
  // notificationUrl: Formloco.notificationUrl,
  
  // signinUrl: Formloco.signinUrl,
  // tenant: { email: Formloco.email, tenant_id: Formloco.tenant },  

  // logo: Formloco.logo,
  // lastUpdate: Platform.lastUpdate,
  // idbName: Formloco.idbName,
  // pin: Formloco.pin
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
