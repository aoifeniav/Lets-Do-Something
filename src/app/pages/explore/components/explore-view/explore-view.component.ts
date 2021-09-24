import { Component, OnInit } from '@angular/core';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

import { PagesService } from 'src/app/services/pages.service';
import { ApiService } from 'src/app/services/api.service';
import { ICard } from 'src/app/shared/models/ishared';

@Component({
  selector: 'app-explore-view',
  templateUrl: './explore-view.component.html',
  styleUrls: ['./explore-view.component.scss'],
  animations: [
    fadeInOnEnterAnimation({ anchor: 'enter', duration: 500 }),
    fadeOutOnLeaveAnimation({ anchor: 'leave', duration: 500 })
  ]
})
export class ExploreViewComponent implements OnInit {
  public apiDataList: ICard[] = [];

  constructor(public pagesService: PagesService, private readonly apiService: ApiService) {
  }

  ngOnInit(): void {
    this.getFullGallery();
  }

  private getFullGallery() {
    for (let index = 0; index < 9; index++) {
      this.getActivityFromApi();
    }
  }

  private getActivityFromApi() {
    this.apiService.getActivityFromApi().subscribe((data: any) => {
      if (this.apiDataList.find((activity) => data.key === activity.key)
      || this.pagesService.classified.find((activity) => data.key === activity.key)) {
        this.getActivityFromApi();
      } else {
        setTimeout(() => {
          this.apiDataList.push(this.transformData(data));
        }, 500);
      }
    });
  }

  private transformData(data: ICard) {
    return {
      activity: data.activity,
      type: data.type,
      participants: data.participants,
      accessibility: this.transformAccessibility(data.accessibility),
      price: this.transformPrice(data.price),
      key: data.key,
      list: '',
    }
  }

  private transformAccessibility(accessibility: number | string) {
    if (accessibility >= 0 && accessibility <= 0.3) {
      return 'at hand';
    } else if (accessibility > 0.3 && accessibility <= 0.7) {
      return 'available';
    } else if (accessibility > 0.7 && accessibility <= 1) {
      return 'challenging';
    } else {
      return 'unkown';
    }
  }

  private transformPrice(price: number | string) {
    if (price === 0) {
      return 'free';
    } else if (price > 0 && price <= 0.3) {
      return 'inexpensive';
    } else if (price > 0.3 && price <= 0.7) {
      return 'affordable';
    } else if (price > 0.7 && price <= 1) {
      return 'pricey';
    } else {
      return 'unkown';
    }
  }

  private addList(keyFromButton: number, list: string) {
    const activityIndexInList = this.apiDataList.findIndex((activity) => activity.key === keyFromButton);
    this.apiDataList[activityIndexInList].list = list;

    this.pagesService.classified.push(this.apiDataList[activityIndexInList]);
    localStorage.setItem('LetsDoSomething', JSON.stringify(this.pagesService.classified));

    this.apiDataList.splice(activityIndexInList, 1);
    this.getActivityFromApi();
  }

  public onDiscardClick(event: any) {
    this.addList(event.target.id, 'discarded');
  }

  public onSaveClick(event: any) {
    this.addList(event.target.id, 'saved');
  }

}
