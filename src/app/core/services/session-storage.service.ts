import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, body: any): void {
    sessionStorage.setItem(key, JSON.stringify(body));
  }

  getItem(key: string): any {
    return JSON.parse(sessionStorage.getItem(key));
  }

  remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  clear(): void {
    sessionStorage.clear();
  }
}
