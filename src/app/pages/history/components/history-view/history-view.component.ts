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

  public visibleListFilter: string[];
  public filteredList: ICard[];

  constructor(public pagesService: PagesService) {
    this.historyHeader = {
      headerTags: ['saved', 'discarded']
    }

    this.visibleListFilter = ['saved', 'discarded'];
    this.filteredList = [...this.pagesService.clasified];
  }

  ngOnInit(): void {
  }

  public onHistoryTagClick(tag: string) {
    if (this.visibleListFilter.includes(tag)) {
      const tagIndex = this.visibleListFilter.indexOf(tag);
      this.visibleListFilter.splice(tagIndex, 1);
      this.filteredList = this.filteredList.filter( (activity: ICard) => activity.list !== tag);
    } else {
      this.visibleListFilter.push(tag);
      const addActivities = this.pagesService.clasified.filter( (activity: ICard) => activity.list === tag);
      this.filteredList = [...this.filteredList, ...addActivities];
    }
  }

  public refreshFilteredList() {
    this.filteredList = this.pagesService.clasified.filter( (activity: ICard) => this.visibleListFilter.includes(activity.list) );
  }

  public onDiscardClick(event: any) {
    const activity = this.filteredList.find((activity: ICard) => activity.key === event.target.id);
    activity!.list = 'discarded';
    this.refreshFilteredList();
  }

  public onSaveClick(event: any) {
    const activity = this.filteredList.find((activity: ICard) => activity.key === event.target.id);
    activity!.list = 'saved';  
    this.refreshFilteredList();
  }
}
