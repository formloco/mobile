import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LayoutComponent } from './component/layout/layout.component'
import { LayoutComponent as message } from './component/layout/layout.component'
import { LayoutAdminComponent } from './component/layout-admin/layout-admin.component'
import { SendPasswordComponent } from './component/admin/send-password/send-password.component'
import { ResetPasswordComponent } from './component/admin/reset-password/reset-password.component'

const routes: Routes = [{
  path: '',
  redirectTo: '/', 
  pathMatch: 'full'
}, {
  path: '',
  component: LayoutComponent
},
{
  path: 'email',
  component: SendPasswordComponent
},
{
  path: 'e93f63d8e62d44da93009229f8a7f890',
  component: LayoutAdminComponent
},
{
  path: 'O451fd2702f54a00b1007f6e80b32e45',
  component: ResetPasswordComponent
},
{
  path: 'message',
  component: message
}]

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }