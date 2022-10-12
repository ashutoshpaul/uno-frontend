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
import { ChooseColorDialogComponent } from './dialogs/actions/choose-color-dialog/choose-color-dialog.component';
import { MaterialModule } from './material.module';
import { OptionsDialogComponent } from './dialogs/actions/options-dialog/options-dialog.component';
import { CurrentPlayerDirective } from './current-player.directive';
import { CurrentColorDirective } from './current-color.directive';
import { ChosenColorDialogComponent } from './dialogs/reactions/chosen-color-dialog/chosen-color-dialog.component';
import { ReverseDialogComponent } from './dialogs/reactions/reverse-dialog/reverse-dialog.component';
import { SkipDialogComponent } from './dialogs/reactions/skip-dialog/skip-dialog.component';
import { OfflineDialogComponent } from './dialogs/reactions/offline-dialog/offline-dialog.component';
import { JoinPlayersDialogComponent } from './dialogs/reactions/join-players-dialog/join-players-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    CardDirective,
    TwoPlayerComponent,
    MultiPlayerComponent,
    CardDisplacementCoordinateDirective,
    CardGlowDirective,
    CurrentPlayerDirective,
    CurrentColorDirective,
    ChooseColorDialogComponent,
    OptionsDialogComponent,
    ReverseDialogComponent,
    OfflineDialogComponent,
    JoinPlayersDialogComponent,
    SkipDialogComponent,
    ChosenColorDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
