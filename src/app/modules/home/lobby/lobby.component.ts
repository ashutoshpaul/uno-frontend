import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { Observable } from 'rxjs';
import { roomDialogIncomingOptionsConstant, roomDialogOutgoingOptionsConstant } from 'src/app/core/constants/animations.constants';
import { IMinifiedRoom } from 'src/app/core/interfaces/minified.interface';
import { ILobbyRoom } from 'src/app/core/interfaces/room.interface';
import { RoomService } from 'src/app/core/services/room.service';
import { SessionStorageService, SESSION_KEY } from 'src/app/core/services/session-storage.service';
import { WebsocketService } from 'src/app/core/services/websocket.service';
import { CreateRoomDialogComponent, CreateRoomDialogData } from 'src/app/dialogs/actions/create-room-dialog/create-room-dialog.component';
import { JoinRoomDialogComponent, JoinRoomDialogData } from 'src/app/dialogs/actions/join-room-dialog/join-room-dialog.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  room$: Observable<ILobbyRoom>;

  playerName: string;
  isGameStarted: boolean = false;
  rooms: IMinifiedRoom[];

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: NgDialogAnimationService,
    private readonly _sessionStorage: SessionStorageService,
    private readonly _websocketService: WebsocketService,
    private readonly _roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.playerName = this._sessionStorage.getItem(SESSION_KEY.playerName);
    this.room$ = this._roomService.room$;

    this._roomService.getRooms().subscribe((rooms: IMinifiedRoom[]) => {
      this.rooms = rooms;
    });
  }

  editPlayerName(): void {
    this._router.navigate(['./../'], { relativeTo: this._activatedRoute });
  }

  createRoom(): void {
    const dialogRef = this._dialog.open(CreateRoomDialogComponent, {
      animation: {
        incomingOptions: roomDialogIncomingOptionsConstant,
        outgoingOptions: roomDialogOutgoingOptionsConstant,
      },
      panelClass: 'choose-color-dialog',
    });

    dialogRef.afterClosed().subscribe((data: CreateRoomDialogData) => {
      if (data?.isCreateRoom) {
        this._roomService.createRoom(this.playerName, data.roomName);
      }
    });
  }

  joinRoom(): void {
    this._roomService.getRooms().subscribe((rooms: IMinifiedRoom[]) => {
      this.rooms = rooms;
      const dialogRef = this._dialog.open(JoinRoomDialogComponent, {
        animation: {
          incomingOptions: roomDialogIncomingOptionsConstant,
          outgoingOptions: roomDialogOutgoingOptionsConstant,
        },
        panelClass: 'choose-color-dialog',
        data: { rooms: this.rooms },
        autoFocus: false,
      });

      dialogRef.afterClosed().subscribe((data: JoinRoomDialogData) => {
        if(data?.selectedRoom) {
          this._roomService.joinRoom(this.playerName, data.selectedRoom);
        }
      });
    });
  }

}
