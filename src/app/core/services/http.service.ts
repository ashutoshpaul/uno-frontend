import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICreateRoomPayload, IJoinRoomPayload, ILobbyRoomResponse, IUpdateSocketIdPayload } from '../interfaces/http.interface';
import { IRoom } from '../interfaces/room.interface';
import { SessionStorageService, SESSION_KEY } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  BASE_URL: string = environment.websocket;

  constructor(
    private readonly _http: HttpClient,
    private readonly _sessionStorageService: SessionStorageService,
  ) { }

  updatePlayerSocketId(payload: IUpdateSocketIdPayload) {
    return this._http.post(`${this.BASE_URL}/identity`, payload, { 
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        "socket-id": this._socketId,
      }
    });
  }

  getRooms(): Observable<IRoom[]> {
    return this._http.get<IRoom[]>(`${this.BASE_URL}/rooms`);
  }

  getRoom(id: string): Observable<ILobbyRoomResponse> {
    return this._http.get<ILobbyRoomResponse>(`${this.BASE_URL}/rooms/${id}`);
  }

  createRoom(payload: ICreateRoomPayload) {
    return this._http.post(`${this.BASE_URL}/rooms`, payload, { 
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        "socket-id": this._socketId,
      }
    });
  }

  joinRoom(payload: IJoinRoomPayload) {
    return this._http.post(`${this.BASE_URL}/join-room`, payload, { 
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
        "socket-id": this._socketId,
      }
    });
  }

  private get _socketId(): string {
    return this._sessionStorageService.getItem(SESSION_KEY.socketId);
  }
}
