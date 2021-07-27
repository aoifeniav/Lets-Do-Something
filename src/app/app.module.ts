import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './core/components/nav/nav.component';
import { FilterByListPipe } from './pipes/filter-by-list.pipe';
import { PipesModule } from './pipes/pipes.module';
import { PagesService } from './services/pages.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [PagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
