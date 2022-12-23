import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IMappedGame } from '../interfaces/game.interface';
import { IMessage } from '../interfaces/message.interface';
import { IMinifiedIdentity } from '../interfaces/minified.interface';
import { ICreateRoomPayload, IDistributeCardsResponse, IJoinedPlayersResponse, IJoinRoomPayload, ILobbyRoomResponse, IPlayerRemovePayload, IUpdateSocketIdPayload } from '../interfaces/response.interface';
import { IRoom } from '../interfaces/room.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL: string = environment.websocket;

  constructor(
    private readonly _http: HttpClient,
  ) { }

  updatePlayerSocketId(payload: IUpdateSocketIdPayload) {
    return this._http.post(`${this.BASE_URL}/identity`, payload);
  }

  getRooms(): Observable<IRoom[]> {
    return this._http.get<IRoom[]>(`${this.BASE_URL}/rooms`);
  }

  getRoom(id: string): Observable<ILobbyRoomResponse> {
    return this._http.get<ILobbyRoomResponse>(`${this.BASE_URL}/rooms/${id}`);
  }

  createRoom(payload: ICreateRoomPayload) {
    return this._http.post(`${this.BASE_URL}/rooms`, payload);
  }

  joinRoom(payload: IJoinRoomPayload) {
    return this._http.post(`${this.BASE_URL}/join-room`, payload);
  }

  deleteRoom(roomId: string) {
    return this._http.delete(`${this.BASE_URL}/rooms/${roomId}`);
  }

  leaveRoom(roomId: string) {
    return this._http.get(`${this.BASE_URL}/room/leave/${roomId}`);
  }

  removePlayer(roomId: string, payload: IPlayerRemovePayload): Observable<ILobbyRoomResponse> {
    return this._http.post<ILobbyRoomResponse>(`${this.BASE_URL}/room/remove/${roomId}`, payload);
  }

  startGame(payload: IMinifiedIdentity): Observable<ILobbyRoomResponse> {
    return this._http.post<ILobbyRoomResponse>(`${this.BASE_URL}/game/start`, payload);
  }

  joinGame(payload: IMinifiedIdentity): Observable<ILobbyRoomResponse> {
    return this._http.post<ILobbyRoomResponse>(`${this.BASE_URL}/game/join`, payload);
  }

  joinedPlayersCount(roomId: string): Observable<IJoinedPlayersResponse> {
    return this._http.get<IJoinedPlayersResponse>(`${this.BASE_URL}/game/joined-players-count/${roomId}`);
  }

  getMessages(roomId: string): Observable<IMessage[]> {
    return this._http.get<IMessage[]>(`${this.BASE_URL}/messages/${roomId}`);
  }

  postMessage(roomId: string, message: IMessage): Observable<IMessage> {
    return this._http.post<IMessage>(`${this.BASE_URL}/messages/${roomId}`, message);
  }

  distributeCards(payload: IMinifiedIdentity): Observable<IDistributeCardsResponse> {
    return this._http.post<IDistributeCardsResponse>(`${this.BASE_URL}/game/distribute`, payload);
  }

  getGameState(roomId: string, playerId: string): Observable<IMappedGame> {
    return this._http.get<IMappedGame>(`${this.BASE_URL}/game/${roomId}/${playerId}/state`);
  }

}
