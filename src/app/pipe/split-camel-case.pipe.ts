import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'splitCamelCase'
})
export class SplitCamelCasePipe implements PipeTransform {

  transform(value: string): string {
    console.log(value)
    if (value !== null)
      return value.split(/(?=[A-Z])/).join(' ')
  }

}
