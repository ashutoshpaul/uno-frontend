import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss']
})
export class PlayersListComponent implements OnChanges, OnInit {

  readonly MAX_PLAYERS: number = 4;

  @Input() players: string[];
  players$: Observable<string[]>;

  constructor() { }

  ngOnChanges(): void {
    this.players$ = of(this.players);
  }

  ngOnInit(): void {
  }

  get message(): string {
    if (this.players.length == 0) return 'Waiting for players to join room...';
    if (this.players.length < this.MAX_PLAYERS) return 'Waiting for more players to join';
    if (this.players.length > this.MAX_PLAYERS) return 'Maximum four players can play at a time';
    return ""; 
  }

}
