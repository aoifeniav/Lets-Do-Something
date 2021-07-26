import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/pages/services/pages.service';
import { ApiService } from 'src/app/pages/explore/services/api.service';
import { ICard, IHeader } from 'src/app/shared/models/ishared';
import { fadeInOnEnterAnimation, fadeOutOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-explore-view',
  templateUrl: './explore-view.component.html',
  styleUrls: ['./explore-view.component.scss'],
  animations: [
    fadeInOnEnterAnimation(),
    fadeOutOnLeaveAnimation()
  ]
})
export class ExploreViewComponent implements OnInit {
  public exploreHeader: IHeader;

  public apiDataList: ICard[] = [];

  constructor(public pagesService: PagesService, private readonly apiService: ApiService) {
    this.exploreHeader = {
      headerTags: ['busywork', 'charity', 'cooking', 'diy', 'education', 'music', 'recreational', 'relaxation', 'social']
    }
  }

  ngOnInit(): void {
    this.getActivityData();
  }

  public getActivityData() {
    for (let index = 0; index < 6; index++) {
      this.apiService.getApiData().subscribe((data: any) => {
        this.apiDataList.push(this.transformData(data));
      });
    }
  }

  public transformData(data: ICard) {
    return {
      activity: data.activity,
      type: data.type,
      participants: data.participants,
      accessibility: this.transformAccessibility(data.accessibility),
      price: this.transformPrice(data.price),
      key: data.key
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

  public onDiscardClick(event: any) {
    const activityIndexInList = this.apiDataList.findIndex((activity) => activity.key === event.target.id);
    this.pagesService.discardedInService.push(this.apiDataList[activityIndexInList]);

    this.apiDataList.splice(activityIndexInList, 1);

    this.apiService.getApiData().subscribe((data: any) => {
      this.apiDataList.push(this.transformData(data));
    });

    console.log('Discarded in service:', this.pagesService.discardedInService);
  }

  public onSaveClick(event: any) {
    const activityIndexInList = this.apiDataList.findIndex((activity) => activity.key === event.target.id);
    this.pagesService.savedInService.push(this.apiDataList[activityIndexInList]);

    this.apiDataList.splice(activityIndexInList, 1);

    this.apiService.getApiData().subscribe((data: any) => {
      this.apiDataList.push(this.transformData(data));
    });

    console.log('Saved in service:', this.pagesService.savedInService);
  }

}
