import { Pipe, PipeTransform } from '@angular/core';
import { ICard } from '../shared/models/ishared';

@Pipe({
  name: 'filterByList'
})
export class FilterByListPipe implements PipeTransform {

  transform(list: ICard[], visibleList: string[]): ICard[] {
    return list.filter( (activity) => visibleList.includes(activity.list) );
  }
}
