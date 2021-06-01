import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'website'
})
export class WebsitePipe implements PipeTransform {

  transform(value: any, ...args: any[]): unknown {
    return value ? new URL(value).hostname.replace('www.', '') : '';
  }


}
