import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { playerRoomTrigger } from 'src/app/dashboard-animations.animation';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  animations: [ playerRoomTrigger ],
})
export class PlayersListComponent implements OnChanges, OnInit {

  readonly MAX_PLAYERS: number = 4;

  @Input() players: string[];
  @Input() isGameStarted: boolean;

  players$: Observable<string[]>;

  constructor() { }

  ngOnChanges(): void {
    this.players$ = of(this.players);
  }

  ngOnInit(): void {
    // this.players = [];
    // setTimeout(() => {
    //   this.players.push('Ronny');
    //   this.players$ = of(this.players);
    // }, 1000);
    // setTimeout(() => {
    //   this.players.push('Ash');
    //   this.players$ = of(this.players);
    // }, 2000);
    // setTimeout(() => {
    //   this.players.push('Michael');
    //   this.players$ = of(this.players);
    // }, 3000);
    // setInterval(() => {
    //   this.players.splice(0, 1);
    // }, 5000);
  }

  get message(): string {
    if(this.isGameStarted) return 'Game has been started';
    if (this.players.length == 0) return 'Waiting for players to join room...';
    if (this.players.length < this.MAX_PLAYERS) return 'Waiting for more players to join';
    if (this.players.length > this.MAX_PLAYERS) return 'Maximum four players can play at a time';
    return ""; 
  }

}
