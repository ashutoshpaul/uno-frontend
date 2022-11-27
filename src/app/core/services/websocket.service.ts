import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { GAME_EVENTS } from '../enums/websocket-enums/game-events.enum';
import { PLAYER_EVENTS } from '../enums/websocket-enums/player-events.enum';
import { RESPONSE_EVENTS } from '../enums/websocket-enums/response-events.enum';
import { RoomService } from './room.service';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';
import { IJoinedPlayersResponse, ILobbyRoomResponse, IPlayerLeftRoomResponse, IPlayerRemovedResponse } from '../interfaces/response.interface';
import { PlayerService } from './player.service';
import { IRoomNotification } from '../interfaces/notification.interface';
import { NOTIFICATION_EVENT } from '../enums/notification.enum';
import { SnackbarService } from './snackbar.service';
import { IdentityService } from './identity.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  socket: Socket;

  constructor(
    private readonly _sessionStorage: SessionStorageService,
    private readonly _snackbarService: SnackbarService,
    private readonly _playerService: PlayerService,
    private readonly _roomService: RoomService,
    private readonly _identityService: IdentityService,
    private readonly _gameService: GameService,
  ) { 
    this._instantiateSocketConnection();
  }

  private _instantiateSocketConnection() {
    this.socket = io(environment.websocket);

    this.socket.on(RESPONSE_EVENTS.connectionEstablished, (socketId: string) => {
      console.log('CONNECTED', this.socket.id, socketId);
      this._sessionStorage.setItem(SESSION_KEY.socketId, socketId);
      this._registerListeners();
      this._playerService.connection();
    });
  }

  private _registerListeners(): void {
    if (this.socket) {
      // Player Events
      this.socket.on(PLAYER_EVENTS.allJoinedGame, () => {
        console.log(PLAYER_EVENTS.allJoinedGame);
      });
  
      this.socket.on(PLAYER_EVENTS.deleteRoom, () => {
        console.log(PLAYER_EVENTS.deleteRoom);
      });
  
      this.socket.on(PLAYER_EVENTS.discard, () => {
        console.log(PLAYER_EVENTS.discard);
      });
  
      this.socket.on(PLAYER_EVENTS.drawCard, () => {
        console.log(PLAYER_EVENTS.drawCard);
      });
  
      this.socket.on(PLAYER_EVENTS.joinGame, () => {
        console.log(PLAYER_EVENTS.joinGame);
      });
  
      this.socket.on(PLAYER_EVENTS.joinRoom, () => {
        console.log(PLAYER_EVENTS.joinRoom);
      });
  
      this.socket.on(PLAYER_EVENTS.leaveGame, () => {
        console.log(PLAYER_EVENTS.leaveGame);
      });
  
      this.socket.on(PLAYER_EVENTS.leaveRoom, () => {
        console.log(PLAYER_EVENTS.leaveRoom);
      });

      this.socket.on(PLAYER_EVENTS.message, () => {
        console.log(PLAYER_EVENTS.message);
      });
  
      this.socket.on(PLAYER_EVENTS.play, () => {
        console.log(PLAYER_EVENTS.play);
      });
  
      this.socket.on(PLAYER_EVENTS.playerCameBackOnline, () => {
        console.log(PLAYER_EVENTS.playerCameBackOnline);
      });
  
      this.socket.on(PLAYER_EVENTS.playerWentOffline, () => {
        console.log(PLAYER_EVENTS.playerWentOffline);
      });
  
  
      this.socket.on(PLAYER_EVENTS.removePlayer, () => {
        console.log(PLAYER_EVENTS.removePlayer);
      });
  
      this.socket.on(PLAYER_EVENTS.skipChance, () => {
        console.log(PLAYER_EVENTS.skipChance);
      });
  
      this.socket.on(PLAYER_EVENTS.startGame, () => {
        console.log(PLAYER_EVENTS.startGame);
      });
  
      this.socket.on(PLAYER_EVENTS.uno, () => {
        console.log(PLAYER_EVENTS.uno);
      });
  
      this.socket.on(PLAYER_EVENTS.wait, () => {
        console.log(PLAYER_EVENTS.wait);
      });
  
      this.socket.on(PLAYER_EVENTS.waitingForPlayersToJoinGame, () => {
        console.log(PLAYER_EVENTS.waitingForPlayersToJoinGame);
      });

      // Game Events
      this.socket.on(GAME_EVENTS.changeColor, () => {
        console.log(GAME_EVENTS.changeColor);
      });

      this.socket.on(GAME_EVENTS.changeDirection, () => {
        console.log(GAME_EVENTS.changeDirection);
      });

      this.socket.on(GAME_EVENTS.colorChanged, () => {
        console.log(GAME_EVENTS.colorChanged);
      });

      this.socket.on(GAME_EVENTS.discardFirstCard, () => {
        console.log(GAME_EVENTS.discardFirstCard);
      });

      this.socket.on(GAME_EVENTS.distributeCards, () => {
        console.log(GAME_EVENTS.distributeCards);
      });

      this.socket.on(GAME_EVENTS.drawFourCards, () => {
        console.log(GAME_EVENTS.drawFourCards);
      });

      this.socket.on(GAME_EVENTS.drawTwoCards, () => {
        console.log(GAME_EVENTS.drawTwoCards);
      });

      this.socket.on(GAME_EVENTS.noCardsLeft, () => {
        console.log(GAME_EVENTS.noCardsLeft);
      });

      this.socket.on(GAME_EVENTS.shuffle, () => {
        console.log(GAME_EVENTS.shuffle);
      });

      this.socket.on(GAME_EVENTS.skipped, () => {
        console.log(GAME_EVENTS.skipped);
      });

      // Response Events
      this.socket.on(RESPONSE_EVENTS.failed, () => {
        console.log(RESPONSE_EVENTS.failed);
      });

      this.socket.on(RESPONSE_EVENTS.roomDeleted, () => {
        console.log(RESPONSE_EVENTS.roomDeleted);
        this._snackbarService.openSnackbar(<IRoomNotification>{ event: NOTIFICATION_EVENT.roomDoesNotExists });
        this._roomService.triggerRoomDeletedEvent();
      });

      this.socket.on(RESPONSE_EVENTS.roomLeft, (data: IPlayerLeftRoomResponse) => {
        console.log(RESPONSE_EVENTS.roomLeft);
        this._roomService.triggerRoomEvent(data.room);
      });

      this.socket.on(RESPONSE_EVENTS.roomJoined, (room: ILobbyRoomResponse) => {
        console.log('*', PLAYER_EVENTS.joinRoom, room);
        this._roomService.triggerRoomEvent(room);
      });

      this.socket.on(RESPONSE_EVENTS.playerRemoved, (data: IPlayerRemovedResponse) => {
        console.log(RESPONSE_EVENTS.playerRemoved);
        // am I removed
        if(data.playerRemoved.id == this._identityService.identity.player.id) {
          this._sessionStorage.remove(SESSION_KEY.identity);
          this._snackbarService.openSnackbar(<IRoomNotification>{
            event: NOTIFICATION_EVENT.playerRemovedMe,
            additional: {
              playerRemoved: data.playerRemoved.name,
              playerWhoRemoved: data.actionPlayer,
            },
          });
          this._roomService.triggerRoomDeletedEvent();
        } else {
          // a player was removed
          this._snackbarService.openSnackbar(<IRoomNotification>{
            event: NOTIFICATION_EVENT.playerRemoved,
            additional: {
              playerRemoved: data.playerRemoved.name,
              playerWhoRemoved: data.actionPlayer,
            },
          });
          this._roomService.triggerRoomEvent(data.room);
        }
      });

      this.socket.on(RESPONSE_EVENTS.gameStarted, (room: ILobbyRoomResponse) => {
        console.log(RESPONSE_EVENTS.gameStarted);
        this._roomService.triggerRoomEvent(room);
      });

      this.socket.on(RESPONSE_EVENTS.gameJoined, (data: IJoinedPlayersResponse) => {
        console.log(RESPONSE_EVENTS.gameJoined);
        this._gameService.triggerPlayerJoinedEvent(data);
      });

    } else {
      console.error('socket not created!');
    } 
  }
}
