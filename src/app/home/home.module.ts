import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LobbyComponent } from './lobby/lobby.component';
import { RoomComponent } from './lobby/room/room.component';
import { PlayersListComponent } from './lobby/room/players-list/players-list.component';


@NgModule({
  declarations: [
    HomeComponent, 
    LobbyComponent,
    RoomComponent,
    PlayersListComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class HomeModule { }
