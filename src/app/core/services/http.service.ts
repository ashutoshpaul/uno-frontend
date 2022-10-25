import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateRoomPayload, IJoinRoomPayload, ILobbyRoomResponse, IUpdateSocketIdPayload } from '../interfaces/http.interface';
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

}
