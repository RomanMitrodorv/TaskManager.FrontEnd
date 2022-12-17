import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray',
})
@Injectable()
export class FilterArrayPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (!items) return [];
    if (!value || value.length == 0) return items;
    return items.filter((it) => {
      return (
        it[field]
          .toString()
          .toLowerCase()
          .indexOf(value.toString().toLowerCase()) != -1
      );
    });
  }
}
