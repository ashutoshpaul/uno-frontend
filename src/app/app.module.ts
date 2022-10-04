import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardDirective } from './card.directive';
import { TwoPlayerComponent } from './two-player/two-player.component';
import { MultiPlayerComponent } from './multi-player/multi-player.component';
import { CardDisplacementCoordinateDirective } from './card-displacement-coordinate.directive';
import { CardGlowDirective } from './card-glow.directive';

@NgModule({
  declarations: [
    AppComponent,
    CardDirective,
    TwoPlayerComponent,
    MultiPlayerComponent,
    CardDisplacementCoordinateDirective,
    CardGlowDirective,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
