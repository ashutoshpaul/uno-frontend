import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { playerRoomTrigger } from 'src/app/core/animations/room.animation';
import { STATUS } from 'src/app/core/enums/status.enum';
import { IMinifiedPlayer } from 'src/app/core/interfaces/minified.interface';
import { RoomService } from 'src/app/core/services/room.service';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.component.html',
  styleUrls: ['./players-list.component.scss'],
  animations: [ playerRoomTrigger ],
})
export class PlayersListComponent implements OnChanges, OnInit {

  readonly MAX_OPPONENTS: number = 3;
  readonly STATUSES: typeof STATUS = STATUS;

  @Input() isGameStarted: boolean;
  @Input() players: IMinifiedPlayer[];
  @Input() createdBy: IMinifiedPlayer;

  constructor(
    private readonly _roomService: RoomService,
  ) { }

  ngOnChanges(): void {
    if (!this.players) this.players = [];
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
    // }, 3000);
  }

  isHost(player: IMinifiedPlayer): boolean {
    return player.id == this.createdBy.id;
  }

  removePlayer(player: IMinifiedPlayer): void {
    this._roomService.removePlayer(player);
  }

  trackById = (index: number, item: IMinifiedPlayer) => item.id;

  get message(): string {
    if (this.isGameStarted) return 'Game has been started';
    if (!this.players || this.players?.length == 0) return 'Waiting for players to join room...';
    if (this.players?.length < this.MAX_OPPONENTS) return 'Waiting for more players to join';
    if (this.players?.length > this.MAX_OPPONENTS) return 'Maximum four players can play at a time';
    return ""; 
  }
}
