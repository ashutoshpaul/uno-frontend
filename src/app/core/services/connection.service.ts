import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  private readonly _connectivitySubject$ = new Subject<boolean>();
  readonly connectivity$: Observable<boolean> = this._connectivitySubject$.asObservable();

  constructor() { }

  triggerNetworkChangedEvent(isOnline: boolean = true): void {
    this._connectivitySubject$.next(isOnline);
  }
}
