import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarginLeftDirective } from './margin-left.directive';
import { CardDirective } from './card.directive';

@NgModule({
  declarations: [
    AppComponent,
    MarginLeftDirective,
    CardDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
