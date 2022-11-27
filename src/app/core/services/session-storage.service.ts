import { Injectable } from '@angular/core';

export enum SESSION_KEY {
  isChatOpen = 'isChatOpen',
  isExit = 'isExit',
  playerName = 'playerName',

  identity = 'identity', // IMinifiedIdentity
  socketId = 'socketId',
  hasAllPlayersJoined = 'hasAllPlayersJoined',
}

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, body: any): void {
    sessionStorage.setItem(key, body);
  }

  getItem(key: string): any {
    return sessionStorage.getItem(key);
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
