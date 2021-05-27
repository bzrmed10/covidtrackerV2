import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HistoryComponent } from './components/history/history.component';
import { StoreModule } from '@ngrx/store';
import { DataEffects } from './store/data.effects';
import { dataReducer } from './store/data.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HighchartsChartModule } from 'highcharts-angular';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    MenuComponent,
    StatisticsComponent,
    HistoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    HighchartsChartModule,
    StoreModule.forRoot({ dataState :dataReducer }),
    EffectsModule.forRoot([DataEffects]),
    StoreDevtoolsModule.instrument(),

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
