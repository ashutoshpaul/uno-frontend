import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, body: any): void {
    localStorage.setItem(key, JSON.stringify(body));
  }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key));
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
