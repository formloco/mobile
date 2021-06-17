// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://bluerockmicro.com/api/',
  authUrl: 'https://bluerockmicro.com/auth/',
  formUrl: 'https://bluerockmicro.com/form/',

  // apiUrl: 'http://localhost:9003/api/',
  // formUrl: 'http://localhost:9002/form/',

  tenant: { email: 'HSE@Summitearth.com', tenant_id: '1a3a6232-ab04-43d6-9d18-6828f257f55f' },

  
  idbName: 'summitEarthDB',
  pin: '111111'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
