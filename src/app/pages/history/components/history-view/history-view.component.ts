import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/pages/services/pages.service';
import { IHeader } from 'src/app/shared/models/ishared';

@Component({
  selector: 'app-history-view',
  templateUrl: './history-view.component.html',
  styleUrls: ['./history-view.component.scss']
})
export class HistoryViewComponent implements OnInit {
  public historyHeader: IHeader;

  constructor(public pagesService: PagesService) {
    this.historyHeader = {
      headerTags: ['saved', 'discarded']
    }
  }

  ngOnInit(): void {
  }

}
