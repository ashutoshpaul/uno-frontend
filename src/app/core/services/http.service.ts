import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUpdateSocketIdPayload } from '../interfaces/http.interface';
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
    return this._http.post(`${this.BASE_URL}/identity`, payload, { 
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "PUT, GET, POST, DELETE, OPTIONS",
      }
    });
  }

  getRooms(): Observable<IRoom[]> {
    return this._http.get<IRoom[]>(`${this.BASE_URL}/rooms`);
  }
}
