import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgDialogAnimationService } from 'ng-dialog-animation';
import { roomDialogIncomingOptionsConstant, roomDialogOutgoingOptionsConstant } from 'src/app/core/constants/animations.constants';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';
import { CreateRoomDialogComponent } from 'src/app/dialogs/actions/create-room-dialog/create-room-dialog.component';
import { JoinRoomDialogComponent } from 'src/app/dialogs/actions/join-room-dialog/join-room-dialog.component';
import { IRoom, ROOM_STATUS } from './room/room.component';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {

  room: IRoom = { 
    status: ROOM_STATUS.roomCreated, 
    name: "ABCDE",
  };

  playerName: string;
  isGameStarted: boolean = false;

  constructor(
    private readonly _router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _dialog: NgDialogAnimationService,
    private readonly _sessionStorage: SessionStorageService,
  ) { }

  ngOnInit(): void {
    this.playerName = this._sessionStorage.getItem('playerName');

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

    // dialogRef.afterClosed().subscribe((options: IOptions) => {
    //   if(options) {}
    // });
  }

  joinRoom(): void {
    const dialogRef = this._dialog.open(JoinRoomDialogComponent, {
      animation: {
        incomingOptions: roomDialogIncomingOptionsConstant,
        outgoingOptions: roomDialogOutgoingOptionsConstant,
      },
      panelClass: 'choose-color-dialog',
      data: { rooms: ['ABC', 'DEF', 'GHI', 'JKL'] },
    });

    // dialogRef.afterClosed().subscribe((options: IOptions) => {
    //   if(options) {}
    // });
  }

}
