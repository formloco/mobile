// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  apiUrl: 'http://localhost:9001/api/',
  authUrl: 'http://localhost:9000/auth/',
  formUrl: 'http://localhost:9002/form/',
  emailUrl: 'http://localhost:9003/email/',
  assetUrl: 'http://localhost:9005/asset/',
  notificationUrl: 'http://localhost:9004/notification/',
  signinUrl: 'http://localhost:4200/e93f63d8e62d44da93009229f8a7f890/',
  redirectForgotPasswordUrl: 'http://localhost:4200/O451fd2702f54a00b1007f6e80b32e45/',
  messageUrl: 'http://localhost:4200/message/',

  tenant: { email: 'HSE@Summitearth.com', 
            tenant_id: '1a3a6232-ab04-43d6-9d18-6828f257f55f',
            assetTenantId: 'a0642972-e528-4071-b756-e103e85cd9f4' // fixed-asset app
  },
  version: 'Development',
  idbName: 'summitEarthDB',
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
