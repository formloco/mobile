import { Branding, Tenant, IdbName, Email } from '../app/state/apps/apps-state.model'

export const environment = {
  production: true,

  apiUrl: 'https://api.formloco.com/api/',
  authUrl: 'https://api.formloco.com/auth/',
  formUrl: 'https://api.formloco.com/form/',
  emailUrl: 'https://api.formloco.com/email/',
  assetUrl: 'https://api.formloco.com/asset/',
  notificationUrl: 'https://api.formloco.com/notification/',

  messageUrl: 'https://mobile.formloco.com/message/',
  signinUrl: 'https://mobile.formloco.com/e93f63d8e62d44da93009229f8a7f890/',
  redirectForgotPasswordUrl: 'https://mobile.formloco.com/O451fd2702f54a00b1007f6e80b32e45/',

  tenant: { email: Email.formloco, 
            tenant_id: Tenant.formloco,
            assetTenantId: 'a0642972-e528-4071-b756-e103e85cd9f4' // fixed-asset app
  },
  logo: Branding.formloco,
  idbName: IdbName.formloco,
  version: 'January 25, 2022',
  pin: '999999'
}