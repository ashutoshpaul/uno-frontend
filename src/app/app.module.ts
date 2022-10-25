import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChooseColorDialogComponent } from './dialogs/actions/choose-color-dialog/choose-color-dialog.component';
import { MaterialModule } from './material.module';
import { OptionsDialogComponent } from './dialogs/actions/options-dialog/options-dialog.component';
import { ChosenColorDialogComponent } from './dialogs/reactions/chosen-color-dialog/chosen-color-dialog.component';
import { ReverseDialogComponent } from './dialogs/reactions/reverse-dialog/reverse-dialog.component';
import { SkipDialogComponent } from './dialogs/reactions/skip-dialog/skip-dialog.component';
import { OfflineDialogComponent } from './dialogs/reactions/offline-dialog/offline-dialog.component';
import { JoinPlayersDialogComponent } from './dialogs/reactions/join-players-dialog/join-players-dialog.component';
import { OfflinePlayerDialogComponent } from './dialogs/actions/offline-player-dialog/offline-player-dialog.component';
import { CreateRoomDialogComponent } from './dialogs/actions/create-room-dialog/create-room-dialog.component';
import { JoinRoomDialogComponent } from './dialogs/actions/join-room-dialog/join-room-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PlayersLeftDialogComponent } from './dialogs/reactions/players-left-dialog/players-left-dialog.component';
import { NotificationSnackbarComponent } from './snackbars/notification-snackbar/notification-snackbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeadersInterceptor } from './core/interceptors/headers.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ChooseColorDialogComponent,
    OptionsDialogComponent,
    ReverseDialogComponent,
    OfflineDialogComponent,
    PlayersLeftDialogComponent,
    JoinPlayersDialogComponent,
    OfflinePlayerDialogComponent,
    CreateRoomDialogComponent,
    JoinRoomDialogComponent,
    SkipDialogComponent,
    ChosenColorDialogComponent,
    NotificationSnackbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HeadersInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
