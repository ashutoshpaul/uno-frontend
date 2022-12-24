import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { UnoBoardComponent } from './uno-board/uno-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';
import { GameComponent } from './game.component';
import { CardDisplacementCoordinateDirective } from 'src/app/core/directives/card-displacement-coordinate.directive';
import { CardGlowDirective } from 'src/app/core/directives/card-glow.directive';
import { CardDirective } from 'src/app/core/directives/card.directive';
import { CurrentColorDirective } from 'src/app/core/directives/current-color.directive';
import { CurrentPlayerDirective } from 'src/app/core/directives/current-player.directive';
import { ChatComponent } from './chat/chat.component';
import { NotificationComponent } from './uno-board/notification/notification.component';
import { ToggleClickabilityDirective } from 'src/app/core/directives/toggle-clickability.directive';

@NgModule({
  declarations: [ 
    GameComponent,
    UnoBoardComponent,
    CardDirective,
    CardDisplacementCoordinateDirective,
    CardGlowDirective,
    CurrentPlayerDirective,
    CurrentColorDirective,
    ToggleClickabilityDirective,
    ChatComponent,
    NotificationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GameRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class GameModule { }
