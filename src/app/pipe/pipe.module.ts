import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { TruncatePipe } from './truncate.pipe'
import { TruncateStraightPipe } from './truncate-straight.pipe'
import { ReplaceUnderscorePipe } from './replace-underscore.pipe'
import { SplitCamelCasePipe } from './split-camel-case.pipe'

@NgModule({
  declarations: [
    TruncatePipe,
    TruncateStraightPipe,
    ReplaceUnderscorePipe,
    SplitCamelCasePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TruncatePipe,
    TruncateStraightPipe,
    ReplaceUnderscorePipe,
    SplitCamelCasePipe
  ]
})
export class PipeModule { }
