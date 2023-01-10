import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fromEvent, Observable } from 'rxjs';
import { SubSink } from 'subsink';
import { sliderTrigger } from './core/animations/router.animations';
import { ConnectionService } from './core/services/connection.service';
import { WebsocketService } from './core/services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    sliderTrigger,
  ],
})
export class AppComponent implements OnInit, OnDestroy {

  private _online$: Observable<Event>;
  private _offline$: Observable<Event>;

  private readonly _subSink = new SubSink();

  constructor(
    private readonly _connectionService: ConnectionService,
    private readonly _websocketService: WebsocketService,
  ) { }

  ngOnInit(): void {
    this._registerConnectionEvents();
  }
  
  prepareRoute(outlet: RouterOutlet): any {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  private _registerConnectionEvents(): void {
    this._online$ = fromEvent(window, 'online');
    this._offline$ = fromEvent(window, 'offline');

    this._subSink.add(this._online$.subscribe(_ => this._connectionService.triggerNetworkChangedEvent()));
    this._subSink.add(this._offline$.subscribe(_ => this._connectionService.triggerNetworkChangedEvent(false)));
  }

  /** 
   * * Invoked on tab-close and tab-refresh.
   */
  @HostListener('window:beforeunload')
  private _pageUnloaded() {
    this._websocketService.triggerPlayerAbortedEvent();
  }

  ngOnDestroy(): void {
    this._subSink.unsubscribe();
  }
}
