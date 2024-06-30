import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceText',
  standalone: true
})
export class SliceTextPipe implements PipeTransform {
  transform(value: string): string {

    if (value) {
      return value.slice(0, 20) + '...';
    }

    return value;
  }

}
