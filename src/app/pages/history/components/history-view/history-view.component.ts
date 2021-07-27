import { Component, Input, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { ICard, IHeader } from 'src/app/shared/models/ishared';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss']
})
export class HistoryViewComponent implements OnInit {
  public historyHeader: IHeader;

  public visibleList: string[];
  public filteredList: ICard[];

  constructor(public pagesService: PagesService) {
    this.historyHeader = {
      headerTags: ['saved', 'discarded']
    }

    this.visibleList = ['saved', 'discarded'];
    this.filteredList = [...this.pagesService.clasified];
  }

  ngOnInit(): void {
  }

  public onHistoryTagClick(tag: string) {
    if (this.visibleList.includes(tag)) {
      const tagIndex = this.visibleList.indexOf(tag);
      this.visibleList.splice(tagIndex, 1);
      this.filteredList = this.filteredList.filter( (activity: ICard) => activity.list !== tag);
    } else {
      this.visibleList.push(tag);
      const addActivities = this.pagesService.clasified.filter( (activity: ICard) => activity.list === tag);
      this.filteredList = [...this.filteredList, ...addActivities];
    }
  }

}
