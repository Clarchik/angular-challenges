import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'person',
  pure: true,
  standalone: true,
})
export class PersonPipe implements PipeTransform {
  transform(value: string, index: number): unknown {
    return `${value} - ${index}`;
  }
}
