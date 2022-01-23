// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { Branding, Tenant } from '../app/state/apps/apps-state.model'

export const environment = {
  production: false,

  apiUrl: 'https://api.formloco.com/api/',
  authUrl: 'https://api.formloco.com/auth/',
  formUrl: 'https://api.formloco.com/form/',
  emailUrl: 'https://api.formloco.com/email/',
  assetUrl: 'https://api.formloco.com/asset/',
  notificationUrl: 'https://api.formloco.com/notification/',
  
  messageUrl: 'https://localhost:4200/message/',
  signinUrl: 'http://localhost:4200/e93f63d8e62d44da93009229f8a7f890/',
  redirectForgotPasswordUrl: 'http://localhost:4200/O451fd2702f54a00b1007f6e80b32e45/',

  tenant: { email: 'polly@formloco.com', 
            tenant_id: Tenant.formloco,
            assetTenantId: 'a0642972-e528-4071-b756-e103e85cd9f4' // fixed-asset app
  },
  logo: Branding.formloco,
  version: 'Development',
  idbName: 'formlocoMobileDB',
  pin: '999999'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
