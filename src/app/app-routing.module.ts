import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { LayoutComponent } from './component/layout/layout.component'
import { LayoutComponent as message } from './component/layout/layout.component'
import { TermsComponent } from './component/terms/terms.component'
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
  path: 'O451fd2702f54a00b1007f6e80b32e45',
  component: ResetPasswordComponent
},
{
  path: 'terms',
  component: TermsComponent
},
{
  path: 'forms/:email/:tenant_id',
  component: LayoutComponent
},
{
  path: 'signup/:msg',
  component: LayoutComponent
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