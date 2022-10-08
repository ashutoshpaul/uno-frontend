import { Directive, HostBinding, Input, OnChanges } from '@angular/core';
import { PLAYER_POSITION } from './multi-player/multi-player.component';

@Directive({
  selector: '[appCurrentPlayer]'
})
export class CurrentPlayerDirective implements OnChanges {

  @Input() playerPosition: PLAYER_POSITION = PLAYER_POSITION.bottom;

  @HostBinding('class.current-player-left') isCurrentPlayerPositionLeft: boolean = false;
  @HostBinding('class.current-player-top') isCurrentPlayerPositionTop: boolean = false;
  @HostBinding('class.current-player-right') isCurrentPlayerPositionRight: boolean = false;
  @HostBinding('class.current-player-bottom') isCurrentPlayerPositionBottom: boolean = false;

  constructor() { }

  ngOnChanges(): void {
    this.reset();
    switch(this.playerPosition) {
      case PLAYER_POSITION.left:
        this.isCurrentPlayerPositionLeft = true;
        break;
      case PLAYER_POSITION.top:
        this.isCurrentPlayerPositionTop = true;
        break;
      case PLAYER_POSITION.right:
        this.isCurrentPlayerPositionRight = true;
        break;
      case PLAYER_POSITION.bottom:
        this.isCurrentPlayerPositionBottom = true;
        break;
    }
  }

  reset(): void {
    this.isCurrentPlayerPositionLeft = false;
    this.isCurrentPlayerPositionTop = false;
    this.isCurrentPlayerPositionRight = false;
    this.isCurrentPlayerPositionBottom = false;
  }

}