import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabLayoutComponent } from './tab-layout/tab-layout.component';
import {MatTabsModule} from "@angular/material/tabs";
import { LiveUpdatesComponent } from './live-updates/live-updates.component';
import { LiveGamesComponent } from './live-games/live-games.component';
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {SocketioService} from "./socketio.service";

@NgModule({
  declarations: [
    AppComponent,
    TabLayoutComponent,
    LiveUpdatesComponent,
    LiveGamesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatListModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [
    HttpClient,
    SocketioService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
