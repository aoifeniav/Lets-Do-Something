import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryViewComponent } from './components/history-view/history-view.component';
import { HeaderModule } from 'src/app/shared/components/header/header.module';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { PagesService } from '../services/pages.service';


@NgModule({
  declarations: [
    HistoryViewComponent,
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    HeaderModule,
    CardModule,
  ],
  providers: [
    PagesService,
  ]
})
export class HistoryModule { }
