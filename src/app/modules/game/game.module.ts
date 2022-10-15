import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { UnoBoardComponent } from './uno-board/uno-board.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { CardDisplacementCoordinateDirective } from 'src/app/card-displacement-coordinate.directive';
import { CardGlowDirective } from 'src/app/card-glow.directive';
import { CardDirective } from 'src/app/card.directive';
import { CurrentColorDirective } from 'src/app/current-color.directive';
import { CurrentPlayerDirective } from 'src/app/current-player.directive';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';

@NgModule({
  declarations: [ 
    GameComponent,
    UnoBoardComponent,
    CardDirective,
    CardDisplacementCoordinateDirective,
    CardGlowDirective,
    CurrentPlayerDirective,
    CurrentColorDirective,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GameRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ]
})
export class GameModule { }
