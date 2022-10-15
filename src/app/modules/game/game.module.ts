import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { UnoBoardComponent } from './uno-board/uno-board.component';


@NgModule({
  declarations: [ UnoBoardComponent ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
