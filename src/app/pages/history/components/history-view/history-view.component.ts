import { Component, Input, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
import { ICard, IHeader } from 'src/app/shared/models/ishared';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class HistoryViewComponent implements OnInit {
  public historyHeader: IHeader;

  public visibleList: string[];

  constructor(public pagesService: PagesService) {
    this.historyHeader = {
      headerTags: ['saved', 'discarded']
    }

    this.visibleList = ['saved'];
  }

  ngOnInit(): void {
  }

  
}
